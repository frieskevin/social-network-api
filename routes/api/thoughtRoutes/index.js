const router = require('express').Router();
const { getAllThoughts, getThoughtById, createThought, deleteThoughtById, updateThoughtById, createReaction, deleteReaction } = require('../../../controllers/thoughts-controller');

router.get('/', getAllThoughts);
router.get('/:id', getThoughtById);
router.post('/', createThought);
router.delete('/:id', deleteThoughtById);
router.put('/:id', updateThoughtById);
router.post('/:id/reactions', createReaction);
router.delete('/:id/:reactionId', deleteReaction);

module.exports = router;