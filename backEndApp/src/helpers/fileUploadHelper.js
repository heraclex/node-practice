const multer = require('multer');
const fs = require('fs');
const dir = 'public/avatars';

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, dir)
  },
  filename: function (req, file, cb) {
    console.log(`multer storage receive file with originalname: ${file.originalname}`);
    cb(null, file.originalname.replace(".", "_" + Date.now() + "."));
  }
});

module.exports = {
  storage: storage
};