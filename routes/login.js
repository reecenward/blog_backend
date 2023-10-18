const express = require('express')
const  login  = require('../controllers/login')
const router = express.Router()
const loginLimiter = require('../helpers/loginRateLimiting');

router.post('/', loginLimiter, login.Login)

module.exports = router