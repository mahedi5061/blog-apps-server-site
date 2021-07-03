const mongoose=require('mongoose');

const CategoriesSchema=new mongoose.Schema({
       catname:{
           type:String,
           required:true
       }
},
{timestamps:true}
);
const CategoriesInfoSchema =mongoose.model("Category",CategoriesSchema);

module.exports=CategoriesInfoSchema;