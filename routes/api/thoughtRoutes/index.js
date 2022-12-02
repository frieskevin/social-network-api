const router = require('express').Router();
const { getAllThoughts, getThoughtById, createThought, deleteThoughtById, updateThoughtById, createReaction } = require('../../../controllers/thoughts-controller');

router.get('/', getAllThoughts);
router.get('/:id', getThoughtById);
router.post('/', createThought);
router.delete('/:id', deleteThoughtById);
router.put('/:id', updateThoughtById);
router.post('/:id/reactions', createReaction);

module.exports = router;