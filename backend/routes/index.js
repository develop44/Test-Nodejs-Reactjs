const router = require("express").Router();
const router2 = require("express").Router();
const router3 = require("express").Router();
const auth = require("../auth");

module.exports = app => {
    const user = require("../controller/UserController");
    const place = require("../controller/ParkingPlaceController");
    const role = require("../controller/RoleController");
  
    //Routeur user
    // Creer un user
    router.post("/", user.create);
    // afficher tous les user
    router.get("/", auth, user.read);
    //connecter
    router.post("/login", user.logIn);
    // recuperer un user 
    router.get("/:id", auth, user.get);
    // modifier un user par id
    router.put("/:id", auth, user.update);
    // supprimer un user par id
    router.delete("/:id", auth, user.delete);
    router.put("/", auth, user.logOut);

    

    app.use('/api/user', router);

    // Routeur place parking
    router2.post("/", auth, place.create);
    router2.get("/", auth, place.read);
    router2.put("/:id", auth, place.update);
    router2.get("/:numero_etage", auth, place.filter);
    app.use('/api/place_parking', router2);

    // Routeur role
    router3.get("/", role.read);
    app.use('/api/role', router3);

  };