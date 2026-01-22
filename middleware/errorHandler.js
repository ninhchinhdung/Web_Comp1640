// Error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err.stack);

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(e => e.message);
        return res.status(400).render('error', {
            title: 'Validation Error',
            error: {
                message: 'Validation failed',
                details: errors
            }
        });
    }

    // Mongoose duplicate key error
    if (err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];
        return res.status(400).render('error', {
            title: 'Duplicate Error',
            error: {
                message: `${field} already exists`
            }
        });
    }

    // Mongoose cast error (invalid ID)
    if (err.name === 'CastError') {
        return res.status(404).render('404', {
            title: 'Not Found'
        });
    }

    // Default error
    res.status(err.status || 500).render('error', {
        title: 'Error',
        error: process.env.NODE_ENV === 'development' ? err : {
            message: 'Something went wrong'
        }
    });
};

// 404 handler
const notFound = (req, res) => {
    res.status(404).render('404', {
        title: 'Page Not Found'
    });
};

module.exports = {
    errorHandler,
    notFound
};
