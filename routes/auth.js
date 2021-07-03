const router = require('express').Router();
const User = require('../BlogSchemas/User')
const bcrypt = require('bcrypt');


//REGISTER
router.post('/register',async(req, res) => {
    try {
       const hashedPassword=await bcrypt.hash(req.body.password,10);
        const newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password:hashedPassword 
        }).save();
        res.status(200).json(newUser)
    }
    catch (err) {
         res.status(500).json(err);
    }
})
//LOGIN
router.post('/login',async(req, res) => {
    try {
        const currentUser=await User.findOne({username:req.body.username});
        !currentUser && res.status(400).json("wrong username!")
        const currentPassword=await bcrypt.compare(req.body.password, currentUser.password);
        !currentPassword && res.status(400).json("wrong password!");
        const {password, ...others}=currentUser._doc;
        res.status(200).json(others)
    }
    catch (err) {
        res.status(500).json(err);
    }

})
 
module.exports=router;