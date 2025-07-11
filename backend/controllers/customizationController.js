import productModel from "../models/productModel.js";
import { v2 as cloudinary } from "cloudinary";

const addCustomization = async (req, res) => {
  try {
    const { description, productId } = req.body;

    const files = [];
    for (const key in req.files) {
      if (req.files.hasOwnProperty(key)) {
        // req.files[key] might not be iterable, check and push accordingly
        if (Array.isArray(req.files[key])) {
          files.push(...req.files[key]);
        } else {
          files.push(req.files[key]);
        }
      }
    }

    const imagesUrl = await Promise.all(
      files.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, { resource_type: "auto", quality: "auto", fetch_format: "auto" });
        return result.secure_url;
      })
    );

    // Do not update product document with customization data anymore
    // Just respond success with customization data

    res.json({ success: true, message: "Customization saved successfully", customization: {
      images: imagesUrl,
      description,
      createdAt: new Date()
    }});
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export { addCustomization };
