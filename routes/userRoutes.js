const User = require('../models/User');

const router = require('express').Router();

// router params for finding all users
router.get("/users", (req, res) => {
    try {
      User.find({})
        .populate("thoughts")
        .populate("friends")
        .then((users) => {
          res.json(users);
        });
    } catch (err) {
      res.json("you have encountered an error, please check your request and try again.");
    }
  });

// router params for finding single user by their ID
router.get("/users/:Id", (req, res) => {
    try{
        User.findById(req.params.id)
        .populate("thoughts")
        .populate("friends")
        .then((user) => {
            if(!user){
                res.json("unable to find user!, try again");
            }else{
                res.json(user);
            }
        });
    }catch(error){
        res.json("you have encountered an error, please check your request and try again.")
    }
});

// router params for finding and updating user by ID
router.put("/users/update/:id", async (req, res) => {
    try{
        const usersId = req.params.id;
        const newUserName = req.params.username;
        const newUserEmail = req.params.email;
        const user = await User.findByIdAndUpdate({_id: usersId}, {username: newUserName, email: newUserEmail});
        if(!user){
            res.json("unable to find user")
        }else{
            user.save().then(res.json("User Updated"));
        }
        }catch(error){
            res.json("you have encountered an error, please check your request and try again.");
        }
});

// Post route to create a new user
router.post("/users", (req, res) => {
    try {
      const user = new User({
        username: req.body.username,
        email: req.body.email,
      });
      user.save().then(res.json("User created!"));
    } catch (err) {
      res.json("There's been an error please check params and try again.");
    }
  });

  // Delete route for removing user
router.delete("/users/delete/:id", async (req, res) => {
    try {
      const userEnt = await User.findOne({ _id: req.params.id });
      const userName = userEnt.username;
      const thoughts = await Thought.find({ username: userName }).remove();
      const delUser = await User.findOneAndDelete({ _id: req.params.id }).then(
        res.json("User and associated thoughts removed!"));
    } catch (err) {
      res.json("There's been an error please check params and try again.");
    }
  });


module.exports = router;