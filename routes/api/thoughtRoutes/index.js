const router = require('express').Router();
const { getAllThoughts, getThoughtById, createThought } = require('../../../controllers/thoughts-controller');

router.get('/', getAllThoughts);
router.get('/:id', getThoughtById);
router.post('/', createThought);


module.exports = router;