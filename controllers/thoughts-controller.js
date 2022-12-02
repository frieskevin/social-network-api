const { Thought, User } = require('../models');

const getAllThoughts = async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts)
    } catch (error) {
        res.status(500).json({ error });
    }
};

const getThoughtById = ({ params }, res) => {
    Thought.findOne({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
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
        const addThoughtToUser = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: { thoughts: newThought._id } },
            { new: true}
        );
        res.json(newThought, addThoughtToUser);
    } catch (error) {
        
    }
};

///^^^ still need this one

const deleteThoughtById = ({ params }, res) => {
    Thought.findOneAndDelete({ _id: params.id })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
};

const updateThoughtById = ({ params, body }, res) => {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this Id!' });
                return;
            }
            res.json(dbToughtData);
        })
        .catch(err => res.status(400).json(err));
};

module.exports = { getAllThoughts, getThoughtById, createThought, deleteThoughtById, updateThoughtById };