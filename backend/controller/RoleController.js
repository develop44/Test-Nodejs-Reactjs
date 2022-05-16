const db = require("../model");

const Role = db.role;

exports.read = (req, res) => {
    Role.findAll()
    .then(data => {
        res.send({error: false, data: data});
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "erreur inconnu."
        });
    });

};