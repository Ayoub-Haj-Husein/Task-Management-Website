const { Router } = require("express");
const usersController = require("../Controllers/usersController")
const router = Router();

router.post("/signup", usersController.signup)
router.post("/login", usersController.login);

module.exports = router;