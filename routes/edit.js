const express = require('express');
const edit = require('../controllers/edit');
const router = express.Router();
const passport = require('../middlewares/auth');

router.get('/:id', passport.authenticate('jwt', { session: false }), edit.GetPost);
router.put('/:id', passport.authenticate('jwt', { session: false }), edit.UpdatePost);
router.delete('/:id', passport.authenticate('jwt', { session: false }), edit.DeletePost);
router.post('', passport.authenticate('jwt', { session: false }), edit.CreatePost);

module.exports = router;