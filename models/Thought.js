const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

//creates a schema for reactions to thoughts
const ReactionSchema = new Schema ({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        max: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
});

//creates a schema for thoughts with reactions nested inside
const ThoughtSchema = new Schema ({
    thoughtText: {
        type: String,
        required: true,
        min: 1,
        max: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [ReactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

// adds ability to get a count of reactions inside the thought
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

//creates the thought model
const Thought = model('Thought', ThoughtSchema);

//exports the thought model so it can be used anywhere in the app
module.exports = Thought;