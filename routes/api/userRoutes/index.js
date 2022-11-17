const router = require('express').Router();
const { getAllUsers, getUserById, createUser, updateUserById, deleteUserById } = require('../../../controllers/user-controller');
router.get('/', getAllUsers);

router.get('/:id', getUserById);

router.post('/', createUser);

router.put('/:id', updateUserById);

router.delete('/:id', deleteUserById);

module.exports = router;