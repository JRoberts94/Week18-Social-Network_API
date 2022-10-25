const User = require('../models/User');
const Thought = require('../models/Thought')
// const { ObjectId } = require('mongoose').Types
const { ObjectId } = require('mongoose').Types

//get all users 
const userController = {

getUser(req, res) {
    User.find()
      .select('-__v')
      .then((dbUserData) => {
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },


//Get single user by id 
getSingleUser(req,res) { 
  console.log(req.params)
    User.findOne({ _id: req.params.userId }) 
    //Populate thoughts and friend data with get single user,
    .populate('thoughts')
    .populate('friends')
    .then(async (users) =>
        !users
          ? res.status(404).json({ message: 'No users with that ID' })
          : res.json({
              users,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
    },

// //post/create new user 
createUser(req, res) {
  console.log(req.body)
  User.create(req.body)
    .then((users) => {
      console.log(users)
      return res.json(users) 
    })
    .catch((err) => res.status(500).json(err));
},
// //put/ update user by id

updateUser(req, res) {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    {
      $set: req.body, 
    },
    {
      runValidators: true,
      new: true,
    }
  )
    .then((dbUserData) => {
      if (!dbUserData) {
        return res.status(404).json({ message: 'No user with this id!' });
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
},

// delete user by id 
deleteUser(req, res) {
  User.findOneAndRemove({ _id: req.params.userId })
  .then((user) => {
    !user
          ? res.status(404).json({ message: 'No such user exists' })
          : Thought.findOneAndUpdate(
              { users: req.params.userId },
              { $pull: { users: req.params.userId } },
              { new: true }
            )
  })
},

//add friend 
addFriend(req, res) {
   User.findOneAndUpdate(
    { _id: req.params.userId },
    { $addToSet: { friends: req.params.friendsId } },
    { new: true }
    )
     .then((dbUserData) => {
       if (!dbUserData) {
         return res.status(404).json({ message: 'No user with this id!' });
       }
       return res.json(dbUserData);
     })
     .catch((err) => {
       console.log(err);
       res.status(500).json(err);
     });
 },

//remove friend
removeFriend(req, res) {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $pull: { friends: req.params.friendsId } },
    { runValidators: true, new: true }
  )
    .then((user) =>
      !user
        ? res
            .status(404)
            .json({ message: 'No user found with that ID :(' })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
},
}

module.exports = userController;