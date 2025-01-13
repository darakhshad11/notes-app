import { body, validationResult } from 'express-validator';

// Middleware to check validation results
export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// User registration validation rules
export const validateUserRegistration = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  
  validateRequest
];

// User login validation rules
export const validateUserLogin = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required'),
  
  validateRequest
];

// Note creation validation rules
export const validateNoteCreation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be between 1 and 100 characters'),
  
  body('content')
    .optional()
    .trim()
    .isLength({ max: 5000 })
    .withMessage('Content must not exceed 5000 characters'),
  
  body('category')
    .optional()
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage('Category must be between 2 and 30 characters')
    .matches(/^[a-zA-Z0-9-_ ]+$/)
    .withMessage('Category can only contain letters, numbers, spaces, hyphens, and underscores'),
  
  validateRequest
];

// Note update validation rules
export const validateNoteUpdate = [
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty')
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be between 1 and 100 characters'),
  
  body('content')
    .optional()
    .trim()
    .isLength({ max: 5000 })
    .withMessage('Content must not exceed 5000 characters'),
  
  body('category')
    .optional()
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage('Category must be between 2 and 30 characters')
    .matches(/^[a-zA-Z0-9-_ ]+$/)
    .withMessage('Category can only contain letters, numbers, spaces, hyphens, and underscores'),
  
  validateRequest
];