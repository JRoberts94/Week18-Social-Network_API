const { Schema, model, Types } = require('mongoose');
const Thought = require('./Thought');
const emailRegex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;

// Schema to create a user model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v){
                return emailRegex.test(v);
            },
            message: "Email is Wrong!"
        }
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: Thought,
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual("friendCount").get(function(){
    return this.friends.length;
})

const User = model('user', userSchema);

// const testing = new User({
//     username: "  abc  ",
//     email: "asdc@hotmail.com",
//     thoughts: [],
//     friends: []
// });
// console.log(testing);
// testing.save().then((created) => created.json);

module.exports = User;
