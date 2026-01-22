const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET /users - List all users
router.get('/', userController.index);

// GET /users/new - Show create user form
router.get('/new', userController.new);

// POST /users - Create new user
router.post('/', userController.create);

// GET /users/:id - Show single user
router.get('/:id', userController.show);

// GET /users/:id/edit - Show edit user form
router.get('/:id/edit', userController.edit);

// POST /users/:id?_method=PUT - Update user (using method override)
router.post('/:id', userController.update);

// POST /users/:id/delete - Delete user
router.post('/:id/delete', userController.delete);

module.exports = router;
