const express = require('express');
const {
    getAllUsers,
    getUserById,
    updateUserRole,
    deleteUser,
    createUser,
    getSystemStats
} = require('../controllers/adminController');
const { protect, requireAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);
router.use(requireAdmin);

router.route('/users')
    .get(getAllUsers)
    .post(createUser);

router.route('/users/:id')
    .get(getUserById)
    .delete(deleteUser);

router.put('/users/:id/role', updateUserRole);

router.get('/stats', getSystemStats);

module.exports = router;