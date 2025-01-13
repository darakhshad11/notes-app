import express from 'express';
import { getAllUsers, addUser, updateUser, deleteUser } from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/adminMiddleware.js';

const router = express.Router();

// Protect all admin routes with authentication and admin middleware
router.use(protect);
router.use(isAdmin);

router.route('/users')
  .get(getAllUsers)
  .post(addUser);

router.route('/users/:id')
  .put(updateUser)
  .delete(deleteUser);

export default router;