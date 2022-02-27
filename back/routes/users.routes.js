const express = require("express"); //Creates an Express application.
const router = express.Router(); //Create separate routers for each main route.

const usrCtrl = require("../controllers/users.controller");
const multer = require("../middleware/multer");
const auth = require("../middleware/auth");

router.post("/signup", usrCtrl.signup);
router.post("/login", usrCtrl.login);
router.get("/accounts/", auth, usrCtrl.getAllAccounts);
router.get("/accounts/:id", auth, usrCtrl.getOneAccount);
router.delete("/accounts/:id", auth, usrCtrl.deleteAccount);
router.put("/accounts/:id", auth, multer, usrCtrl.modifyAccount);

module.exports = router;
