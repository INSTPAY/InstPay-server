const router = require('express').Router();
const fileUpload = require('../services/fileUpload');
// upload file
router.post('/', fileUpload.storage.single('file'), (req, res) => {
  res.status(200).json(req.file);
});

module.exports = router;
