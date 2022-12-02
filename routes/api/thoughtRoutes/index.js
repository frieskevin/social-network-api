const router = require('express').Router();
const { getAllThoughts, getThoughtById, createThought, deleteThoughtById } = require('../../../controllers/thoughts-controller');

router.get('/', getAllThoughts);
router.get('/:id', getThoughtById);
router.post('/', createThought);
router.delete('/:id', deleteThoughtById);


module.exports = router;