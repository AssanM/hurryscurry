import mongoose from "mongoose";
const promotionSchema = new mongoose.Schema({
    name: {type:String, required: true},
    image:{type:Array, required:true},
    active:{type:Boolean},
    date:{type:Number,required:true}

})

const promotionModel = mongoose.models.promotion || mongoose.model("promotion", promotionSchema);

export default promotionModel