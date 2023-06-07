import cloudinary from "cloudinary";
import keys from "./keys.js";
const { images } = keys;

cloudinary.config({
  cloud_name: images.upload.cloud_name,
  api_key: images.upload.api_key,
  api_secret: images.upload.api_secret,
});

export default cloudinary