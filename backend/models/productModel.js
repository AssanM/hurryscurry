import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {type:String, required: true},
    description: {type:String, required: true},
    price:{type:Number, required:true},
    accid:{type:Number, required:true},
    image:{type:Array, required:true},
    category:{type:String, required:false},
    subCategory:{type:String, required:false},
    sizes:{type:Array, required:false},
    bestseller:{type:Boolean},
    date:{type:Number,required:true},
    game:{type:String, required:true},
    region:{type:String, required:true},
    categoryFilter:{type:String, required:true}
})

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel