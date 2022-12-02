// imports the user schema
const { User } = require('../models');

// get all the users in the database
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users)
    } catch (error) {
        res.status(500).json({ error });
    }
};

// gets a user by its id
const getUserById = ({ params }, res) => {
    User.findOne({ _id: params.id })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
};

//creates new user
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

// update a user by its id
const updateUserById = ({ params, body }, res) => {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this Id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
};

// delete a user by its id
const deleteUserById = ({ params }, res) => {
    User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
};

// add a friend nested in the user 
const addFriend = ({ params }, res) => {
    User.findOneAndUpdate(
        { _id: params.id },
        { $push: {friends: params.friendId } },
        { new: true, runValidators: true }
    )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: "No user found with this id!" });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
};

// delete friend from user
const deleteFriend = ({ params }, res) => {
    User.findOneAndUpdate(
        { _id: params.id },
        { $pull: { friends: params.friendId } },
        { new: true }
    )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
};

//exports all these functions so routes can use them
module.exports = { getAllUsers, getUserById, createUser, updateUserById, deleteUserById, addFriend, deleteFriend };