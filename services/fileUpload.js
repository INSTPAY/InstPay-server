const multer = require('multer');

const stroge = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + file.originalname;
    cb(null, filename);
  },
});

exports.storage = multer({ storage: stroge });
