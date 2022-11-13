const { User } = require('../models');


const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users)
    } catch (error) {
        res.status(500).json({ error });
    }
};

const getUserById = async ({ params }, res) => {
    try {
        const user = await User.findOne({ _id: params.id })
            .populate({
                path: 'thought friend',
                select: '-__v'
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
    } catch (error) {
        res.status(500).json({ error });
    }
};

const createUser = async (req, res) => {
    try {
        const newUser = await User.create({
            ...req.body,
        });
        res.json(newUser);
    } catch (error) {
        res.status(500).json({ error });
    }
};

const updateUserById = async ({ params, body }, res) => {
    try {
        const user = await User.findOneAndUpdate({ _id: params.id}, body, { new: true, runValidators: true})
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this Id!' });
                return;
            }
            res.json(dbUserData);
        })
    } catch (error) {
        res.status(500).json({ error });
    }
};

const deleteUserById = async ({ params }, res) => {
    try {
        const user = await User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
    } catch (error) {
        res.status(500).json({ error });
    }
}



module.exports = { getAllUsers, getUserById, createUser, updateUserById, deleteUserById };