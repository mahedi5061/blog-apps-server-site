const express=require('express');
const routeAuth=require('./routes/auth');
const userRoute=require('./routes/user');
const userPost=require('./routes/post');
const categoryRoute=require('./routes/categories');
const multer=require('multer')
const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();
const app=express();
app.use(express.json());
const MONGO_URL =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.taqt5.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
mongoose.connect(MONGO_URL,{
useNewUrlParser: true,
useUnifiedTopology: true,
useCreateIndex: true,
})
.then(console.log("MongoDB is running..."))
.catch((err) => console.log(err));

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"blogImages")
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name)
    }
})

const upload=multer({storage:storage});

app.post('/upload',upload.single("file"),(req,res)=>{
    res.status(200).json("File successfully upload!")
})

app.use("/auth",routeAuth);
app.use("/user",userRoute);
app.use("/post",userPost);
app.use("/categories",categoryRoute);

app.listen('5000',()=>{
    console.log('Server is running...');
})