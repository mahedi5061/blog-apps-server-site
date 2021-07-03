const router = require("express").Router();
const User = require("../BlogSchemas/User");
const Post = require("../BlogSchemas/Post");

//CREATE POST
router.post("/posts", async (req, res) => {
    const newPost =new Post(req.body);
    try {
      const savePost = await newPost.save();
      res.status(200).json(savePost)
    }
    catch (err){
      res.status(500).json(err)
    }
});
//UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post= await Post.findById(req.params.id);
    if(post.username===req.body.username){
      try {
        const updatePost = await Post.findByIdAndUpdate(req.params.id,{
          $set:req.body,
        },{new: true})
        res.status(200).json(updatePost)
      }
      catch (err){
        res.status(500).json(err)
      }
    }
    else{
      res.status(401).json("You can only update your post!")
    }
  }
  catch (err){
    res.status(500).json(err)
  }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post= await Post.findById(req.params.id);
    if(post.username===req.body.username){
      try {
         await post.delete();
        res.status(200).json("post has been deleted...")
      }
      catch (err){
        res.status(500).json(err)
      }
    }
    else{
      res.status(401).json("You can only delete your post!")
    }
  }
  catch (err){
    res.status(500).json(err)
  }
});
//GET POST

module.exports = router;
