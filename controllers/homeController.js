const Product = require('../models/Product');
const User = require('../models/User');

// @desc    Display homepage
// @route   GET /
exports.index = async (req, res) => {
    try {
        // Get some featured products (latest 6 products)
        const featuredProducts = await Product.find({ isAvailable: true })
            .sort({ createdAt: -1 })
            .limit(6);

        // Get total counts for stats
        const totalProducts = await Product.countDocuments();
        const totalUsers = await User.countDocuments();

        res.render('home/index', {
            title: 'Home - Express MVC',
            featuredProducts,
            stats: {
                totalProducts,
                totalUsers
            }
        });
    } catch (error) {
        console.error('Error loading homepage:', error);
        res.status(500).render('error', {
            title: 'Error',
            error: process.env.NODE_ENV === 'development' ? error : {}
        });
    }
};

// @desc    Display about page
// @route   GET /about
exports.about = (req, res) => {
    res.render('home/about', {
        title: 'About Us - Express MVC'
    });
};
