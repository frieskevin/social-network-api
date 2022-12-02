const router = require('express').Router();
// imports thought controllers for routes to use
const { getAllThoughts, getThoughtById, createThought, deleteThoughtById, updateThoughtById, createReaction, deleteReaction } = require('../../../controllers/thoughts-controller');

// creates routes for thought controllers to use
router.get('/', getAllThoughts);
router.get('/:id', getThoughtById);
router.post('/', createThought);
router.delete('/:id', deleteThoughtById);
router.put('/:id', updateThoughtById);
router.post('/:id/reactions', createReaction);
router.delete('/:id/:reactionId', deleteReaction);

module.exports = router;