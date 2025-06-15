import multer from 'multer'
import CloudinaryStorage from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv'
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
})


const storage = new CloudinaryStorage({
    cloudinary: cloudinary
});

const storageResume = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "resumes",
        resource_type: "raw",
        allowedFormats: ["pdf"],
    },
});

export const uploader = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 2,
    }
});

export const resumeUploader = multer({
    storage: storageResume,
    limits: {
        fileSize: 1024 * 1024 * 2,
    }
})

export const deleteImageCloudinary = async (publicId) => {
    try {
        const response = await cloudinary.uploader.destroy(publicId);
        console.log("cloudinary response", response);
    } catch (error) {
        console.log('unable to delete image', error);
        throw error
    }
};

export const deleteResumeCloudinary = async (publicId) => {
    try {
        const response = await cloudinary.uploader.destroy(publicId, { resource_type: "raw" });
        console.log("cloudinary response", response);
    } catch (error) {
        console.log('unable to delete video', error);
        throw error
    }
}