const router = require('express').Router();
const usersRoutes = require('./Users');
const thoughtsRoutes = require('./Thoughts');

router.use('/users', usersRoutes);
router.use('/thoughts', thoughtsRoutes);

module.exports = router;