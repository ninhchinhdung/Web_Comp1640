const User = require('../models/User');

// Display home page
exports.index = (req, res) => {
    res.render('home', {
        title: 'Trang Chủ',
        message: 'Chào mừng đến với Express MVC Project!'
    });
};
