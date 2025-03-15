import categoryModel from "../models/categoryModel.js"

const addCategory = async (req,res)=>{
    try {
        const {name, type} = req.body;
        const exists = await categoryModel.findOne({name, type});        
        if (exists)
        {
            return res.json({success:false, message:"Category already exists"})
        }
        const newCategory = new categoryModel({
            name,
            type
        })
        await newCategory.save()
        res.json({success: true, message:"Category Added"})
    } catch (error) {
        return res.json({success:false, message:error.message})
    }
}
const removeCategory = async (req,res)=>{
    try {
        await categoryModel.findByIdAndDelete(req.body.id)
        res.json({success:true, message:"Promotion removed"})
    } catch (error) {
        console.log(error);        
        res.json({success:false, message: error.message});
    }
}
const allCategory = async (req,res)=>{
    try {
        const categories = await categoryModel.find({});
        res.json({success:true, categories})
    } catch (error) {
        return res.json({success:false, message:error.message})
    }
}

export {addCategory,allCategory,removeCategory}