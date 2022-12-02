const router = require('express').Router();
const { getAllThoughts, getThoughtById, createThought } = require('../../../controllers/thoughts-controller');

router.get('/', getAllThoughts);

module.exports = router;