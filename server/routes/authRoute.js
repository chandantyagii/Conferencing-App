const router = require("express").Router();//Creates a mini router (like a mini app to handle routes)

const controller = require("../controllers/authController");//Imports the authController file which contains the logic functions


router.post("/register", controller.register);
router.post("/login", controller.login);

//This is the key line — it's saying:
// "When a POST request hits /register, run the register function from authController"



module.exports= router;
