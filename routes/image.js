const express = require('express')
const multer = require("multer");
const  image  = require('../controllers/image')
const passport = require('../middlewares/auth');

const router = express.Router()

const storage = multer.memoryStorage();
const upload = multer({storage:storage});

router.get('/', image.get)
router.get('/:id', image.getImageById);
router.post('/', passport.authenticate('jwt', { session: false }), upload.single("image"), image.upload)
router.delete('/:id', passport.authenticate('jwt', { session: false }), image.delete)

module.exports = router