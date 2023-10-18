const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // Limit each IP to 3 login attempts
    skipFailedRequests: true, // Skip rate limiting on failed login attempts
  });

module.exports = loginLimiter;