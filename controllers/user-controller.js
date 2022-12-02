const { User } = require('../models');


const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users)
    } catch (error) {
        res.status(500).json({ error });
    }
};

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

const deleteFriend = ({ params }, res) => {
    
}

// //still need: /api/users/:userId/friends/:friendId

// POST to add a new friend to a user's friend list

// DELETE to remove a friend from a user's friend list



module.exports = { getAllUsers, getUserById, createUser, updateUserById, deleteUserById, addFriend };