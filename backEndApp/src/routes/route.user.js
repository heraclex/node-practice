const router = require("express").Router();
const userController = require("../controllers/user.controller");

const fileUploadHelper = require("../helpers/fileUploadHelper");
const multer = require('multer');
const upload = multer(fileUploadHelper);

router.get("/", userController.getAll);

router.get("/:username", userController.getByUserName);

//router.get("/users/:username/avatar", userController.getUserAvatar);

router.post("/:username/avatar",
    userController.checkUsernameExist,
    upload.single('avatar'),
    userController.saveAvatarUrl);

router.delete('/:id', userController.deleteById);

module.exports = router;
