const router = require("express").Router();
const userController = require("../controllers/user.controller");

router.get("/users", userController.getAll);

router.get("/users/:username", userController.getByUserName);

router.delete('/users/:id', userController.deleteById);

module.exports = router;
