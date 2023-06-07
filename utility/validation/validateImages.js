import keys from "../../config/keys.js";

const validateImages = (images) => {
  let index = 0;
  let errorFound = false;
  let message = "";
  while (index < images.length && errorFound === false) {
    if (
      images[index]?.mimetype !== "image/png" &&
      images[index]?.mimetype !== "image/jpeg"
    ) {
      errorFound = true;
      message = "All Images Must be PNG or JPEG/JPG";
    }
    if (images[index]?.size > keys.images.maxSize) {
      errorFound = true;
      message = "All Images Must be No be bigger than 5 MB";
    }
    index++;
  }
  if (errorFound) {
    return {
      success: false,
      message,
      imageIndex: index,
    };
  } else {
    return {
      success: true,
    };
  }
};

export default validateImages;
