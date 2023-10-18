const express = require('express')
const posts = require('../controllers/posts')
const router = express.Router()

router.get('/', posts.GetAllPosts)

module.exports = router