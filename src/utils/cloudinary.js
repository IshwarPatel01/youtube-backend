//isme stratigy samjhna jaroori hai kis tarah se kaam karege
//resuable code hai


import fs from "fs" // file system node.js



import { v2 as cloudinary } from 'cloudinary';
import { log } from "console";

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

const uploadCloudinary = async (localFilePath) => {
    try{
        if (!localFilePath){
            return null
        }
        //upload the file on cloudinary
        const response =  await cloudinary.uploader.upload(localFilePath, {
            resource_type : "auto"
        })
        // file has been uploaded successfully
        console.log("file is uploaded on cloudinary", response.url);
        return response
    }catch(error){
        fs.unlinkSync(localFilePath) // remove the locally saved file as the upload operation got failed 
        return null
    }
}

export {uploadCloudinary}