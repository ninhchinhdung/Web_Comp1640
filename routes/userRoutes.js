const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// RESTful routes for users
router.get('/', userController.index);           // List all users
router.get('/create', userController.create);    // Show create form
router.post('/', userController.store);          // Create new user
router.get('/:id', userController.show);         // Show single user
router.get('/:id/edit', userController.edit);    // Show edit form
router.post('/:id', userController.update);      // Update user
router.post('/:id/delete', userController.destroy); // Delete user

module.exports = router;
