import { upload } from '../config/cloudinary.js';

const uploadImage = async req => {
  const tmp = req.files.photo.tempFilePath;
  const result = await upload(tmp, { folder: 'My Brand - Pretty'} ,(_, results) => results);
  return result;
};
export default uploadImage;
