import mongoose from "mongoose";
const categorySchema = mongoose.Schema({
    name:{type:String, required:true},
    type:{type:String, required:true}
},{minimize:false})

const categoryModel = mongoose.models.category || mongoose.model("category", categorySchema);

export default categoryModel;