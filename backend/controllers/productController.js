import {v2 as cloudinary} from "cloudinary"
import productModel from "../models/productModel.js";
import productDataModel from "../models/productDataModel.js";


// function for add product
const addProduct = async (req,res)=>{
    try {
        const  {name, description, price, bestseller, game, region, categoryFilter, accountData}  = req.body;
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];
        const image5 = req.files.image5 && req.files.image5[0];
        const image6 = req.files.image6 && req.files.image6[0];
        const image7 = req.files.image7 && req.files.image7[0];
        const image8 = req.files.image8 && req.files.image8[0];

        const images = [image1, image2, image3, image4, image5, image6, image7, image8].filter((item)=>item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async(item)=>{
                let result = await cloudinary.uploader.upload(item.path, {resource_type:'image'});
                return result.secure_url
            })
        )

        const productData = {
            name,
            description,
            game,
            region,
            price:Number(price),
            categoryFilter,
            accountData,
            bestseller:bestseller === "true"? true:false,
            image:imagesUrl,
            date: Date.now()
        }
        const product = new productModel(productData);
        await product.save()
        const productId = product.id;
        
        const productDataClient ={
            accountData,
            productId
        }

        const data = new productDataModel(productDataClient);
        await data.save();

        res.json({success:true, message:"Product added"}); 
        

    } catch (error) {
        console.log(error);        
        res.json({success:false, message: error.message});
    }

}

// function for list product
const listProducts = async (req,res)=>{
    try {
        const products = await productModel.find({});
        res.json({success:true, products})
    } catch (error) {
        console.log(error);        
        res.json({success:false, message: error.message});
    }

}

// function for removing product
const removeProduct = async (req,res)=>{
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true, message:"Product removed"})
    } catch (error) {
        console.log(error);        
        res.json({success:false, message: error.message});
    }
}

// function for single product info
const singleProduct = async (req,res)=>{
    try {
        const {productId} = req.body;
        const product = await productModel.findById(productId)
        res.json({success:true, product})
    } catch (error) {
        console.log(error);
        res.json({success:false, message: error.message});
    }

}

export {listProducts, addProduct, removeProduct, singleProduct}
