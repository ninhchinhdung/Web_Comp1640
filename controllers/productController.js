const Product = require('../models/Product');

// @desc    Get all products
// @route   GET /products
exports.index = async (req, res) => {
    try {
        const { category, search } = req.query;
        let query = {};

        // Filter by category if provided
        if (category && category !== 'all') {
            query.category = category;
        }

        // Search by name if provided
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        const products = await Product.find(query).sort({ createdAt: -1 });

        res.render('products/index', {
            title: 'Products List',
            products,
            currentCategory: category || 'all',
            searchQuery: search || ''
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).render('error', {
            title: 'Error',
            error: process.env.NODE_ENV === 'development' ? error : {}
        });
    }
};

// @desc    Show single product
// @route   GET /products/:id
exports.show = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).render('404', {
                title: 'Product Not Found'
            });
        }

        res.render('products/show', {
            title: product.name,
            product
        });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).render('error', {
            title: 'Error',
            error: process.env.NODE_ENV === 'development' ? error : {}
        });
    }
};

// @desc    Show create product form
// @route   GET /products/new
exports.new = (req, res) => {
    res.render('products/form', {
        title: 'Create New Product',
        product: {},
        action: '/products',
        method: 'POST'
    });
};

// @desc    Create new product
// @route   POST /products
exports.create = async (req, res) => {
    try {
        const { name, description, price, category, stock, imageUrl, isAvailable } = req.body;

        const product = new Product({
            name,
            description,
            price,
            category,
            stock,
            imageUrl: imageUrl || '/images/default-product.jpg',
            isAvailable: isAvailable === 'on' || isAvailable === true
        });

        await product.save();
        res.redirect('/products');
    } catch (error) {
        console.error('Error creating product:', error);
        res.render('products/form', {
            title: 'Create New Product',
            product: req.body,
            action: '/products',
            method: 'POST',
            error: error.message
        });
    }
};

// @desc    Show edit product form
// @route   GET /products/:id/edit
exports.edit = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).render('404', {
                title: 'Product Not Found'
            });
        }

        res.render('products/form', {
            title: `Edit Product: ${product.name}`,
            product,
            action: `/products/${product._id}?_method=PUT`,
            method: 'POST'
        });
    } catch (error) {
        console.error('Error fetching product for edit:', error);
        res.status(500).render('error', {
            title: 'Error',
            error: process.env.NODE_ENV === 'development' ? error : {}
        });
    }
};

// @desc    Update product
// @route   PUT /products/:id
exports.update = async (req, res) => {
    try {
        const { name, description, price, category, stock, imageUrl, isAvailable } = req.body;

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name,
                description,
                price,
                category,
                stock,
                imageUrl: imageUrl || '/images/default-product.jpg',
                isAvailable: isAvailable === 'on' || isAvailable === true
            },
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).render('404', {
                title: 'Product Not Found'
            });
        }

        res.redirect('/products');
    } catch (error) {
        console.error('Error updating product:', error);
        const product = await Product.findById(req.params.id);
        res.render('products/form', {
            title: `Edit Product: ${product.name}`,
            product: { ...product.toObject(), ...req.body },
            action: `/products/${req.params.id}?_method=PUT`,
            method: 'POST',
            error: error.message
        });
    }
};

// @desc    Delete product
// @route   DELETE /products/:id
exports.delete = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).render('404', {
                title: 'Product Not Found'
            });
        }

        res.redirect('/products');
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).render('error', {
            title: 'Error',
            error: process.env.NODE_ENV === 'development' ? error : {}
        });
    }
};
