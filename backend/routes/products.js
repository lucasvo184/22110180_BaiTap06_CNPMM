const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  getProducts,
  getProductsByCategory,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const { authenticate } = require('../middleware/auth');
const { authorize } = require('../middleware/auth');
const { apiLimiter, productLimiter } = require('../middleware/rateLimiter');
const { validate } = require('../middleware/validation');

// Public routes - no authentication required
router.get('/',
  apiLimiter,
  getProducts
);

router.get('/category/:categoryId',
  apiLimiter,
  getProductsByCategory
);

router.get('/:id',
  apiLimiter,
  getProduct
);

// Admin only routes - require authentication and admin role
router.post('/',
  productLimiter,
  authenticate,
  authorize('admin'),
  [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Product name is required')
      .isLength({ min: 3, max: 200 })
      .withMessage('Product name must be between 3 and 200 characters'),
    body('description')
      .optional()
      .trim(),
    body('price')
      .isFloat({ min: 0 })
      .withMessage('Price must be a positive number'),
    body('category')
      .notEmpty()
      .withMessage('Category is required')
      .isMongoId()
      .withMessage('Invalid category ID'),
    body('stock')
      .optional()
      .isInt({ min: 0 })
      .withMessage('Stock must be a non-negative integer'),
    body('promotion')
      .optional()
      .isFloat({ min: 0, max: 100 })
      .withMessage('Promotion must be between 0 and 100'),
    body('image')
      .optional()
      .isURL()
      .withMessage('Image must be a valid URL')
  ],
  validate,
  createProduct
);

router.put('/:id',
  productLimiter,
  authenticate,
  authorize('admin'),
  [
    body('name')
      .optional()
      .trim()
      .isLength({ min: 3, max: 200 })
      .withMessage('Product name must be between 3 and 200 characters'),
    body('price')
      .optional()
      .isFloat({ min: 0 })
      .withMessage('Price must be a positive number'),
    body('promotion')
      .optional()
      .isFloat({ min: 0, max: 100 })
      .withMessage('Promotion must be between 0 and 100'),
    body('stock')
      .optional()
      .isInt({ min: 0 })
      .withMessage('Stock must be a non-negative integer')
  ],
  validate,
  updateProduct
);

router.delete('/:id',
  productLimiter,
  authenticate,
  authorize('admin'),
  deleteProduct
);

module.exports = router;

