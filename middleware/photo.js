const uploader = require('../config/cloudinary.js');

const uploadImage = async req => {
  const tmp = req.files.photo.tempFilePath;
  const result = await uploader.upload(tmp, { folder: 'My Brand - Pretty'} ,(_, results) => results);
  return result.url;
};
module.exports = uploadImage;
