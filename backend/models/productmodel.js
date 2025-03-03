const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    id:{type:Number,required:true},
    name:{type:String,required:true},
    price:{type:Number,required:true},
    image:{type:String,required:true},
    category:{type:String,required:true},
    date:{type:Date,default:Date.now},
    available:{type:Boolean,required:true},
})
const Product=mongoose.model("Product",productSchema)
module.exports=Product