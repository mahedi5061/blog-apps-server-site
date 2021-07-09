const router = require("express").Router();
const User = require("../BlogSchemas/User");
const bcrypt = require("bcrypt");
const Post = require("../BlogSchemas/Post");

//UPDATE
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    //update password system...
    // if (req.body.password) {
    //   req.body.password = await bcrypt.hash(req.body.password, 10);
    // }
    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updateUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You can update your account");
  }
});
//DELETE
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
      } catch (err) {
        res.status(200).json("user has been deleted!");
      }
    } catch (err) {
      res.status(404).json("user not found!");
    }
  } else {
    res.status(401).json("You account has been deleted!");
  }
});

//GET USER
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const {password, ...others} =user._doc;
        res.status(200).json(others)
    }
    catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;
