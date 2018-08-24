const router = require("express").Router();
const userController = require("../controllers/user.controller");

const fileUploadHelper = require("../helpers/fileUploadHelper");
const multer = require('multer');
const upload = multer(fileUploadHelper);

router.get("/users", userController.getAll);

router.get("/users/:username", userController.getByUserName);

//router.get("/users/:username/avatar", userController.getUserAvatar);

router.post("/users/:username/avatar",
    userController.checkUsernameExist,
    upload.single('avatar'),
    userController.saveAvatarUrl);

router.delete('/users/:id', userController.deleteById);

module.exports = router;
