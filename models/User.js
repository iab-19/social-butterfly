const { Schema, model } = require('mongoose');
const Thought = require('./Thought');

// Schema to create User model

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true, //remove white spaces in username
        },
        email: {
            type: String,
            required: true,
            unique: true,
            // TODO: email validation
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);


// A virtual 'friendCount' that retrieves the length of the user's friends array field on query
userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length;
    });


// Initialize the User model
const User = model('user', userSchema);

moodule.exports = User;
