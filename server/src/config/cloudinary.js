import multer from 'multer'
import cloudinaryStorage from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: '',
    api_key: '',
    api_secret: '',
})

const storage = new cloudinaryStorage({
    cloudinary: cloudinary
})

export const uploader = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 2,
    }
});