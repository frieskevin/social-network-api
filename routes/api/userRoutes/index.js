const router = require('express').Router();
//imports all user controllers for routes to use
const { getAllUsers, getUserById, createUser, updateUserById, deleteUserById, addFriend, deleteFriend } = require('../../../controllers/user-controller');

// creates routes for user controller functions to use
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUserById);
router.delete('/:id', deleteUserById);
router.post('/:id/friends/:friendId', addFriend)
router.delete('/:id/friends/:friendId', deleteFriend)

module.exports = router;