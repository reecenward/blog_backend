const express = require('express')
const multer = require("multer");
const  image  = require('../controllers/image')

const router = express.Router()

const storage = multer.memoryStorage();
const upload = multer({storage:storage});

router.get('/', image.get)
router.post('/', upload.single("image"), image.upload)
router.delete('/:id', image.delete)

module.exports = router