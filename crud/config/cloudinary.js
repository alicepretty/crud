const dotenv = require('dotenv');
const {v2} = require('cloudinary');

const cloudinary = v2;

dotenv.config();

 cloudinary.config ({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
 })
module.exports= cloudinary.uploader;