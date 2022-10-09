const User = require("../models/User");
const Thought = require("../models/Thought");
const router = require("express").Router();

//Get routes for retrieving all thoughts
router.get("/thoughts", (req, res) => {
    try{
        Thought.find({})
            .populate("text")
            .populate("username")
            .populate("reactions")
            .then((thoughts) => {
                res.json(thoughts);
            })
    }catch(err){
        res.json("you have encountered an error, please check your request and try again.");
    }
});

// Get route for single thought
router.get("/thoughts/:id", (req, res) => {
    try{
        Thought.findById(req.params.id).then((thought) => {
            if(!thought){
                res.json("Thought not found :(");
            }else{
                res.json(thought)
            }
        })
    }catch (err) {
        res.json("you have encountered an error, please check your request and try again.");
      }
});

//post route to create new thought
router.post("/thoughts/:id", (req, res) => {
    try{
        const thought = new Thought({
            text: req.body.text,
            username: req.body.username,
        });
        thought.save().then(res.json(thought));
        User.findById(req.params.id).then(function(user){
            user.thoughts.push(thought._id);
            user.save();
        })
    }catch (err) {
        res.json("you have encountered an error, please check your request and try again.");
      }
});


module.exports = router;