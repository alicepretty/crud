import { config } from 'dotenv';
import { v2 } from 'cloudinary';

const cloudinary = v2;

config();

 cloudinary.config ({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
 })
export default cloudinary.uploader;