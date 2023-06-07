import cloudinary from "../config/cloudinary.js";

export const uploadImage = async (format, fileString) => {
  const res = await cloudinary.v2.uploader.upload(
    `data:image/${format};base64,${fileString}`
  );
  return {
    name: res.public_id,
    url: res.secure_url,
  };
};

export const uploadImageWithId = async (format, fileString, publicId) => {
  const res = await cloudinary.v2.uploader.upload(
    `data:image/${format};base64,${fileString}`,
    { public_id: publicId }
  );
  return {
    name: res.public_id,
    url: res.secure_url,
  };
};

export const deleteImage = async (public_id) => {
  await cloudinary.v2.uploader.destroy(public_id);
};

export const updateImage = async (public_id, fileFormat, fileString) => {
  await cloudinary.v2.uploader.explicit(public_id, options).then(callback);
};

export default uploadImage;
