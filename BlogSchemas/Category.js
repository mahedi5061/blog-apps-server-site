const mongoose=require('mongoose');

const CategoriesSchema=new mongoose.Schema({
       name:{
           type:String,
           required:true
       }
},
{timestamps:true}
);
const CategoriesInfoSchema =mongoose.model("Category",CategoriesSchema);

module.exports=CategoriesInfoSchema;