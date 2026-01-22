const express = require('express');
const router = express.Router();

const homeRoutes = require('./homeRoutes');
const userRoutes = require('./userRoutes');

// Mount routes
router.use('/', homeRoutes);
router.use('/users', userRoutes);

module.exports = router;
