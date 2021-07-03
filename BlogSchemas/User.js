const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
        username:{
            type:String,
            required:true,
            unique:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
            
        },
        userprofile:{
            type:String,
            default:""
            
        }
},
{timestamps:true}
);
const UserInfoSchema =mongoose.model("User",UserSchema);

module.exports=UserInfoSchema;