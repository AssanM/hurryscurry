import {v2 as cloudinary} from "cloudinary"
import productModel from "../models/productModel.js";
import productDataModel from "../models/productDataModel.js";

import sharp from 'sharp';
import fs from 'fs';
import { v4 as uuidv4 } from "uuid";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const addProduct = async (req,res)=>{
    try {
        console.log("REQ.FILES:", req.files);
        console.log("Body:", req.body);

        const  {name, description, price, accid, bestseller, game, region, categoryFilter, accountData}  = req.body;
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];
        const image5 = req.files.image5 && req.files.image5[0];
        const image6 = req.files.image6 && req.files.image6[0];
        const image7 = req.files.image7 && req.files.image7[0];
        const image8 = req.files.image8 && req.files.image8[0];

        const images = [image1, image2, image3, image4, image5, image6, image7, image8].filter(item => item !== undefined);

        images.forEach((img, i) => {
          if (!img.path || !fs.existsSync(img.path)) {
            throw new Error(`Image ${i + 1} missing or invalid path: ${JSON.stringify(img)}`);
          }
        });

        const imagesUrl = await Promise.all(
          images.map(async (item) => {
            const compressedBuffer = await sharp(item.path)
              .jpeg({ quality: 70 })
              .toBuffer();

            const tempFilePath = `temp_${uuidv4()}.jpg`;
            fs.writeFileSync(tempFilePath, compressedBuffer);

            console.log(`Temp file size: ${fs.statSync(tempFilePath).size} bytes`);

            const result = await cloudinary.uploader.upload(tempFilePath, {
              resource_type: "image",
            });

            console.log("Uploaded to Cloudinary:", result.secure_url);

            fs.unlinkSync(tempFilePath);
            return result.secure_url;
          })
        );

        const productData = {
            name,
            description,
            game,
            region,
            price:Number(price),
            accid,
            categoryFilter,
            accountData,
            bestseller:bestseller === "true",
            image:imagesUrl,
            date: Date.now()
        };

        const product = new productModel(productData);
        await product.save();

        const productId = product.id;

        const productDataClient = {
            accountData,
            productId
        };

        const data = new productDataModel(productDataClient);
        await data.save();

        res.json({success:true, message:"Product added"});

    } catch (error) {
        console.log(error);
        res.json({success:false, message: error.message});
    }
};

const listProducts = async (req,res)=>{
    try {
        const products = await productModel.find({});
        res.json({success:true, products});
    } catch (error) {
        console.log(error);
        res.json({success:false, message: error.message});
    }
};

const removeProduct = async (req,res)=>{
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({success:true, message:"Product removed"});
    } catch (error) {
        console.log(error);
        res.json({success:false, message: error.message});
    }
};

const singleProduct = async (req,res)=>{
    try {
        const {productId} = req.body;
        const product = await productModel.findById(productId);
        res.json({success:true, product});
    } catch (error) {
        console.log(error);
        res.json({success:false, message: error.message});
    }
};

// Обновление товара по ID
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updateData = req.body;

    const updatedProduct = await productModel.findByIdAndUpdate(productId, updateData, {
      new: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Товар не найден" });
    }

    res.json({ success: true, message: "Товар обновлён", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export {listProducts, addProduct, removeProduct, singleProduct};