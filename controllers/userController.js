const User = require('../models/User');

// Display list of users
exports.index = (req, res) => {
    const users = User.getAll();
    res.render('users/index', {
        title: 'Danh Sách Người Dùng',
        users: users
    });
};

// Display single user
exports.show = (req, res) => {
    const user = User.getById(req.params.id);
    if (!user) {
        return res.status(404).render('404', { title: 'User Not Found' });
    }
    res.render('users/show', {
        title: `Chi Tiết - ${user.name}`,
        user: user
    });
};

// Display create user form
exports.create = (req, res) => {
    res.render('users/create', {
        title: 'Tạo Người Dùng Mới'
    });
};

// Handle create user POST
exports.store = (req, res) => {
    const newUser = User.create(req.body);
    res.redirect('/users');
};

// Display edit user form
exports.edit = (req, res) => {
    const user = User.getById(req.params.id);
    if (!user) {
        return res.status(404).render('404', { title: 'User Not Found' });
    }
    res.render('users/edit', {
        title: `Chỉnh Sửa - ${user.name}`,
        user: user
    });
};

// Handle update user POST
exports.update = (req, res) => {
    User.update(req.params.id, req.body);
    res.redirect(`/users/${req.params.id}`);
};

// Handle delete user
exports.destroy = (req, res) => {
    User.delete(req.params.id);
    res.redirect('/users');
};
