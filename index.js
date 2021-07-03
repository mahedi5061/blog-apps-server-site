const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const routeAuth=require('./routes/auth');
const userRoutes=require('./routes/user');
const userPost=require('./routes/post');
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


app.use("/auth",routeAuth);
app.use("/user",userRoutes);
app.use("/post",userPost)

app.listen('5000',()=>{
    console.log('Server is running...');
})