const express = require('express')
const  post  = require('../controllers/post')
const router = express.Router()

router.get('/:title', post.GetPost)

module.exports = router