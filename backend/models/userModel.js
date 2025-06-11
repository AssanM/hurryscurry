import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    accountData: { type: String, required: true },
    name: {type:String, required: true},
    /*email: {type:String, required: true, unique:true},
    password: {type:String, required: true},*/
    cartData: {type:Object, default:{}}
},{minimize:false})

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;