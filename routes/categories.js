const router = require("express").Router();
const Category=require("../BlogSchemas/Category");


router.post("/cat", async (req, res) => {
    const newCat = new Category(req.body);
    try {
      const saveCat = await newCat.save();
      res.status(200).json(saveCat)
    }
    catch (err){
      res.status(500).json(err)
    }
});
module.exports = router;