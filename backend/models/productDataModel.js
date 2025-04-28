import mongoose from "mongoose";

const productDataSchema = new mongoose.Schema({
    email: {type:String, required: true},
    password: {type:String, required: true},
    productId :{type: String, required:true}
})

const productDataModel = mongoose.models.productData || mongoose.model("productData", productDataSchema);

export default productDataModel