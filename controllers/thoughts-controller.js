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

const createThought = ({ body }, res) => {
    Thought.create(body)
        .then(({ _id }) => {
            User.findOneAndUpdate(
                { _id: body.userId },
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
        .then(dbComment => {
            res.json(dbComment);
        })
        .catch(err => res.json(err));
};

const deleteThought

module.exports = { getAllThoughts, getThoughtById, createThought };