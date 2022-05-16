const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./routes')


		
//middleWare
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = require("./model");
db.sequelize.sync({ force: false }).then((db2) => { 
    //Creation des roles de base qui sont des donnée statique
    console.log("Drop and re-sync db.");
    (async() => {
        try{
            const Role = db.role
            const admin = await Role.findOne({ where: { code: 'admin' } })
            !admin && await Role.create({ nom: "Administrateur", code: "admin" });
        
            const invite = await Role.findOne({ where: { code: 'invite' } })
            !invite && await Role.create({ nom: "Invité", code: "invite" });
        }catch(e){
            console.log('>>+++++++++++erreur creation role par defaut', e)
        }
    })();
});

router(app)
app.get("/", (req, res) => {
    res.json({ message: "Welcome to my application." });
})

//Start server
app.listen(3001, () => console.log('listed on 3001'));