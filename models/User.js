const { Schema, model } = require('mongoose');

//creates a schema for the user with thoughts and friends nested inside
const UserSchema = new Schema ({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email : {
        type: String,
        unique: true,
        required: true,
        match: /.+\@.+\..+/,
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thoughts'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

//creates a way to get the amount of friends a user has
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

//creates the user model
const User = model('User', UserSchema);

//exports the user model
module.exports = User;