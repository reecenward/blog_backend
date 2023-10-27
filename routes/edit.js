const express = require('express');
const edit = require('../controllers/edit');
const router = express.Router();
const passport = require('../middlewares/auth');

const { body } = require('express-validator');

// Validation rules for creating a post
const createPostValidation = [
  body('title').isString().trim().isLength({ min: 3 }).withMessage('Title must be at least 3 characters long'),
  body('content').isString().trim().isLength({ min: 3 }).withMessage('Content must be at least 3 characters long'),
];

// Validation rules for updating a post
const updatePostValidation = [
  body('title').isString().trim().isLength({ min: 3 }).withMessage('Title must be at least 3 characters long'),
  body('content').isString().trim().isLength({ min: 3 }).withMessage('Content must be at least 3 characters long'),
];

router.get('/:id', passport.authenticate('jwt', { session: false }), edit.GetPost);
router.put('/:id', passport.authenticate('jwt', { session: false }), edit.UpdatePost);
router.delete('/:id', passport.authenticate('jwt', { session: false }), edit.DeletePost);
router.post('', passport.authenticate('jwt', { session: false }), edit.CreatePost);

module.exports = router;