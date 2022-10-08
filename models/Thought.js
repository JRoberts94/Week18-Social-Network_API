const { Schema, model, Types } = require('mongoose');
const User = require('./User');

const reactionSchema = new Schema({
  // _id: {
  //   type: Types.ObjectId,
  //   default:
  // }
  body: {
    type: String,
      unique: true,
      minLength: 1,
      maxLength: 280,
  },
  username: {
    type: String,
    unique: true,
  },
},{
  timestamps: true,
})

// Schema to create a thought model
const thoughtSchema = new Schema(
  {
    text: {
      type: String,
      unique: true,
      minLength: 1,
      maxLength: 280,

    },
    username: {
      type: String,
      unique: true,
    },
    reactions: [reactionSchema],
  },
  {
    timestamps: true,
    id: false,
  }
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
