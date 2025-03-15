import promotionModel from '../models/promotionModel.js'
import {v2 as cloudinary} from "cloudinary"
const addPromotion = async (req,res)=>{
    try {
        const {name} = req.body;
        const image1 =req.files.image1 && req.files.image1[0];
        const images = [image1].filter((item)=>item !== undefined)
        let imagesUrl = await Promise.all(
            images.map(async(item)=>{
                let result = await cloudinary.uploader.upload(item.path, {resource_type:'image'});
                return result.secure_url
            })
        )

        const promotionData = {
            name,
            image: imagesUrl,
            active: true,
            date:Date.now()
        }
        const promotion = new promotionModel(promotionData);
        await promotion.save()
        res.json({success:true, message:"Promotion added"}); 

    } catch (error) {
        return res.json({success:false, message:error.message})
    }
}

const removePromotion = async (req,res)=>{
    try {
        await promotionModel.findByIdAndDelete(req.body.id)
        res.json({success:true, message:"Promotion removed"})
    } catch (error) {
        console.log(error);        
        res.json({success:false, message: error.message});
    }
}

const allPromotions = async(req,res)=>{
    try {
        const promotions = await promotionModel.find({})
        res.json({success:true, promotions})
    } catch (error) {
        return res.json({success:false, message:error.message})
    }
}

const allActivePromotions = async (req, res)=>{
    try {
        const promotions = await promotionModel.find({})
        res.json({success:true, promotions})
    } catch (error) {
        return res.json({success:false, message:error.message})
    }
}

export {addPromotion, allPromotions,allActivePromotions,removePromotion}