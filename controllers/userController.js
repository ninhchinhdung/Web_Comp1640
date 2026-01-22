const User = require('../models/User');

// @desc    Get all users
// @route   GET /users
exports.index = async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.render('users/index', {
            title: 'Users List',
            users
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).render('error', {
            title: 'Error',
            error: process.env.NODE_ENV === 'development' ? error : {}
        });
    }
};

// @desc    Show single user
// @route   GET /users/:id
exports.show = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).render('404', {
                title: 'User Not Found'
            });
        }

        res.render('users/show', {
            title: `User: ${user.name}`,
            user
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).render('error', {
            title: 'Error',
            error: process.env.NODE_ENV === 'development' ? error : {}
        });
    }
};

// @desc    Show create user form
// @route   GET /users/new
exports.new = (req, res) => {
    res.render('users/form', {
        title: 'Create New User',
        user: {},
        action: '/users',
        method: 'POST'
    });
};

// @desc    Create new user
// @route   POST /users
exports.create = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const user = new User({
            name,
            email,
            password,
            role: role || 'user'
        });

        await user.save();
        res.redirect('/users');
    } catch (error) {
        console.error('Error creating user:', error);
        res.render('users/form', {
            title: 'Create New User',
            user: req.body,
            action: '/users',
            method: 'POST',
            error: error.message
        });
    }
};

// @desc    Show edit user form
// @route   GET /users/:id/edit
exports.edit = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).render('404', {
                title: 'User Not Found'
            });
        }

        res.render('users/form', {
            title: `Edit User: ${user.name}`,
            user,
            action: `/users/${user._id}?_method=PUT`,
            method: 'POST'
        });
    } catch (error) {
        console.error('Error fetching user for edit:', error);
        res.status(500).render('error', {
            title: 'Error',
            error: process.env.NODE_ENV === 'development' ? error : {}
        });
    }
};

// @desc    Update user
// @route   PUT /users/:id
exports.update = async (req, res) => {
    try {
        const { name, email, password, role, isActive } = req.body;

        const updateData = {
            name,
            email,
            role,
            isActive: isActive === 'on' || isActive === true
        };

        // Only update password if provided
        if (password && password.trim() !== '') {
            updateData.password = password;
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).render('404', {
                title: 'User Not Found'
            });
        }

        res.redirect('/users');
    } catch (error) {
        console.error('Error updating user:', error);
        const user = await User.findById(req.params.id);
        res.render('users/form', {
            title: `Edit User: ${user.name}`,
            user: { ...user.toObject(), ...req.body },
            action: `/users/${req.params.id}?_method=PUT`,
            method: 'POST',
            error: error.message
        });
    }
};

// @desc    Delete user
// @route   DELETE /users/:id
exports.delete = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).render('404', {
                title: 'User Not Found'
            });
        }

        res.redirect('/users');
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).render('error', {
            title: 'Error',
            error: process.env.NODE_ENV === 'development' ? error : {}
        });
    }
};
