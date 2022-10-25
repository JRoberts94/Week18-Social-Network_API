const router = require('express').Router();
const apiRoutes = require('./api');
const thoughtRoutes = require('../routes/api/Thoughts')

router.use('/api', apiRoutes);
router.use('/api', thoughtRoutes)

router.use((req, res) => res.send('Wrong route!'));



module.exports = router;