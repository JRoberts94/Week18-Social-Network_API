const { Schema, model, Types } = require('mongoose');
const User = require('./User');
const moment = require('moment')

const reactionSchema = new Schema({
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
  ISO: {
    type: Date,
    default: Date.now()
}
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
    ISO: {
      type: Date,
      default: Date.now()
  },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    }
  },
  {
    timestamps: true,
    strict: false,
    id: false,
  }
);

const reactCount = thoughtSchema.virtual("reactCount").get(function(){
  return this.reactions.length;
})
const Created = thoughtSchema.virtual("Created").get(function() {
  let time = this.ISO
  return moment(time).format('DD/MM/YYYY')

})
const Reacted = thoughtSchema.virtual("Reacted").get(function() {
  let time = this.ISO
  return moment(time).format('DD/MM/YYYY')

})

const React = model("react", reactionSchema)
const Thought = model('thought', thoughtSchema);

module.exports = Thought, React;
