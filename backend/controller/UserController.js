const db = require("../model");
const md5 = require('md5');
const config = require("../config");
const jwt = require("jsonwebtoken");


const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

//-----------------------------------------------------------------------------------------
// Créer un user
exports.create = (req, res) => {
    // Validate request
    if (!req.body.nom) {
        res.status(400).send({
            message: "le nom est requis !"
        });
        return;
    }
    if (!req.body.user_name) {
        res.status(400).send({
            message: "l'user_name est requis !"
        });
        return;
    }
    if (!req.body.roleId) {
        res.status(400).send({
            message: "le role requis !"
        });
        return;
    }

    const user = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        numero_telephone: req.body.numero_telephone,
        user_name: req.body.user_name,
        mot_de_passe: md5(req.body.mot_de_passe),
        roleId: req.body.roleId
    };
    //

    // enregistrer l'offre dans la base de données
    User.create(user)
        .then(data => {
            data.mot_de_passe = null
            res.send({ error: false, data: data, message: "utilisateur créé" });
        })
        .catch(err => {
            res.status(500).send({
                error: true,
                message: err.message || "erreur inconnu lors de la creation d'un utilisateur."
            });
        });
};

exports.read = (req, res) => {
    const user_name = req.query.user_name;

    const cdt1 = user_name ? { user_name: { [Op.like]: `%${user_name}%` } } : null;

    User.findAll({
        attributes: [
            "id",
            "nom",
            "prenom",
            "numero_telephone",
            "user_name",
            "createdAt",
            "updatedAt"
        ],
        where: cdt1,
        include: Role
    })
        .then(data => {
            res.send({ error: false, data: data });
        })
        .catch(err => {
            res.send({
                error: true,
                message: err.message || "erreur inconnu."
            });
        });

};




exports.get = (req, res) => {
    const idUser = req.params.id;

    User.findByPk(idUser)
        .then(data => {
            res.send({ error: false, data: data });
        })
        .catch(err => {
            res.status(500).send({
                error: true,
                message: "erreur lors de la recherchede l'user d'id = " + idUser
            });
        });

};




//-----------------------------------------------------------------------------------------
// mettre à jour un user
exports.update = (req, res) => {
    const idUser = req.params.id;
    //{...data, role: data?.role?.code}
    User.update(req.body, {
        where: { id: idUser }
    })
        .then(num => {
            if (num == 1) {
                User.findOne({
                    where: { id: idUser },
                    include: Role
                })
                    .then(async data => {
                        console.log('data data data', data)
                        res.send({
                            error: false,
                            data: { ...data.dataValues, role: data?.dataValues?.role?.code },
                            message: "L'user est mise à jour avec succes."
                        });
                    })
                    .catch(err => {
                        res.send({
                            error: true,
                            message: err.message || "Erreur inconnu lors de la letcure en bd."
                        });
                    });
            } else {
                res.send({
                    error: true,
                    message: `impossible de modifier l'user avec id=${idUser}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                error: true,
                message: err.message || "Erreur inconnue survenu avec l'id: " + idUser
            });
        });

};


//-----------------------------------------------------------------------------------------
// supprimer 
exports.delete = (req, res) => {
    const idUser = req.params.id;

    User.destroy({
        where: { id: idUser }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    error: false,
                    message: "User supprimer!"
                });
            } else {
                res.send({
                    error: true,
                    message: `impossible de supprimer l'user avec  id=${idUser}. l'user n'existe pas!`
                });
            }
        })
        .catch(err => {
            res.send({
                error: true,
                message: "Impossible de supprimer l'user numero" + idUser
            });
        });

};

//------------------------Authentification------------------------------------------------
exports.logIn = (req, res) => {
    const user_name = req.body.user_name;
    console.log('********', req.body.mot_de_passe)
    const mot_de_passe = md5(req.body.mot_de_passe);
    if (!user_name) {
        return res.status(401).send({ error: true, message: 'username manquant' })
    }
    if (!mot_de_passe) {
        return res.status(401).send({ error: true, message: 'password manquant' })
    }

    User.findOne({
        where: {
            [Op.and]: [
                { user_name: user_name },
                { mot_de_passe: mot_de_passe }
            ]
        },
        include: Role
    })
        .then(async data => {
            const token = jwt.sign(
                { id: data.id, user_name: data.user_name, nom: data.nom, prenom: data.prenom, numero_telephone: data.numero_telephone, role: data.role?.code },
                config.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            // save user token
            //user.token = token;
            res.send({ error: false, token: token });
        })
        .catch(err => {
            res.status(500).send({
                error: true,
                message: err.message || "Erreur inconnu lors de la connexion."
            });
        });

};


//------------------------Authentification------------------------------------------------
exports.logOut = (req, res) => {
    const token = req.headers["x-access-token"]
        jwt.sign(token, config.TOKEN_KEY, { expiresIn: 1 }, (logout, err) => {
            if (logout) {
                res.send({error: false,  message: 'Vous avez été déconnecté' });
            } else {
                res.send({ error: true, message: 'Error' });
            }
        }
    )

};
