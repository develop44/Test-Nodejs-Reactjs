const db = require("../model");
const auth = require("../auth");

const Place = db.place_parking;
const User = db.user;
const Op = db.Sequelize.Op;

//-----------------------------------------------------------------------------------------
// Creer un Place
exports.create = (req, res) => {
    // Validate request
    
    if (!req.body.numero_etage) {
        res.status(400).send({
            message: "l'numero_etage est requis !"
        });
        return;
    }
    if (!req.body.numero_place) {
        res.status(400).send({
            message: "le numero_place requis !"
        });
        return;
    }

    const place = {
        numero_etage: req.body.numero_etage,
        numero_place: parseInt(req.body.numero_place),
        disponible: true,
    };
    //

    // enregistrer l'offre dans la base de données
    Place.create(place)
        .then(data => {
            res.send({error: false, data: data});
        })
        .catch(err => {
            res.status(500).send({
                error: true,
                message: err.message || "erreur inconnu lors de la creation d'une place parking."
            });
        });
};

exports.read = (req, res) => {
    Place.findAll({ include: User})
        .then(data => {
            res.send({error: false, data: data});
        })
        .catch(err => {
            res.status(500).send({
                error: true,
                message:  err.message || "erreur inconnu."
            });
        });

};

exports.filter = (req, res) => {
    const numero_etage = req.params.numero_etage;

    const cdt1 = numero_etage ? { numero_etage: { [Op.like]: `%${numero_etage}%` } } : null;

    Place.findAll({
        where: cdt1,
        include: User
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

//-----------------------------------------------------------------------------------------
// mettre à jour un user
exports.update = (req, res) => {
    const idPlace = req.params.id;

    Place.update({...req.body, disponible: req.body?.userId ? false : true}, {
        where: { id: idPlace }
    })
        .then(num => {
            if (num == 1) {
                Place.findOne({
                   where: { id: idPlace },
                   include: User
                })
                .then(async data => {
                    res.send({
                        error: false,
                        data: data,
                        message: "La place est mise à jour avec succes."
                    });
                })
                .catch(err => {
                    res.status(500).send({
                        error: true,
                        message: err.message || "Erreur inconnu lors de la letcure en bd."
                    });
                });
            

            } else {
                res.send({
                    error: true,
                    message: `impossible de modifier la place avec id=${idPlace}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                error: true,
                message: err.message || "Erreur survenu avec l'id: " + idPlace
            });
        });

};
