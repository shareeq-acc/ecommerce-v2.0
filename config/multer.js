import multer from "multer";
import keys from "./keys.js";

const maxFiles = 4;
const maxSize = keys.images.maxSize;

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    files: maxFiles,
    fileSize: maxSize,
  },
});
export default upload;
