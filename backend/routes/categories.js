const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');
const { authenticate } = require('../middleware/auth');
const { authorize } = require('../middleware/auth');
const { apiLimiter, productLimiter } = require('../middleware/rateLimiter');
const { validate } = require('../middleware/validation');

// Public routes
router.get('/',
  apiLimiter,
  getCategories
);

router.get('/:id',
  apiLimiter,
  getCategory
);

// Admin only routes
router.post('/',
  productLimiter,
  authenticate,
  authorize('admin'),
  [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Category name is required')
      .isLength({ min: 2, max: 50 })
      .withMessage('Category name must be between 2 and 50 characters'),
    body('description')
      .optional()
      .trim()
  ],
  validate,
  createCategory
);

router.put('/:id',
  productLimiter,
  authenticate,
  authorize('admin'),
  [
    body('name')
      .optional()
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Category name must be between 2 and 50 characters'),
    body('description')
      .optional()
      .trim()
  ],
  validate,
  updateCategory
);

router.delete('/:id',
  productLimiter,
  authenticate,
  authorize('admin'),
  deleteCategory
);

module.exports = router;

