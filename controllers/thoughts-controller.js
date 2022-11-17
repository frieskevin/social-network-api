const { Thought } = require('../models');

const getAllThoughts = async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts)
    } catch (error) {
        res.status(500).json({ error });
    }
};

const getThoughtById = async ({ params }, res) => {
    Thought.findOne({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
    .catch (error) 
};

const createThought = async (req, res) => {
    try {
        const newThought = await Thought.create({
            ...req.body,
        });
        res.json(newThought);
    } catch (error) {
        res.status(500).json({ error });
    }
};

module.exports = { getAllThoughts, getThoughtById, createThought };