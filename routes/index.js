const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const userRoutes = require('./userRoutes');
const productRoutes = require('./productRoutes');

// Home routes
router.get('/', homeController.index);
router.get('/about', homeController.about);

// Mount user routes
router.use('/users', userRoutes);

// Mount product routes
router.use('/products', productRoutes);

module.exports = router;
