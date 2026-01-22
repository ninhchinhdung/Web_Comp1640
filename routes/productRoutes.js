const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET /products - List all products (with optional filtering)
router.get('/', productController.index);

// GET /products/new - Show create product form
router.get('/new', productController.new);

// POST /products - Create new product
router.post('/', productController.create);

// GET /products/:id - Show single product
router.get('/:id', productController.show);

// GET /products/:id/edit - Show edit product form
router.get('/:id/edit', productController.edit);

// POST /products/:id?_method=PUT - Update product (using method override)
router.post('/:id', productController.update);

// POST /products/:id/delete - Delete product
router.post('/:id/delete', productController.delete);

module.exports = router;
