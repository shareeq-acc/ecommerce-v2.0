import validateImages from "./validateImages.js";

const productValidation = ({
  name,
  description,
  quantity,
  price,
  previousPrice,
  brand,
  images,
  imageValidationFlag,
}) => {
  if (!name) {
    return {
      success: false,
      formErrors: {
        name: "Please Enter Product Name",
      },
    };
  }
  if (name.trim().length > 200) {
    return {
      success: false,
      formErrors: {
        name: "Product Name cannot Exceed 200 Characters",
      },
    };
  }
  if (!description) {
    return {
      success: false,
      formErrors: {
        description: "Please Enter Product Description",
      },
    };
  }
  if (description.length > 3000) {
    return {
      success: false,
      formErrors: {
        description: "Product Description cannot Exceed 3000 Characters",
      },
    };
  }
  if (!quantity) {
    return {
      success: false,
      formErrors: {
        quantity: "Please Enter Product Quantity",
      },
    };
  }
  if (isNaN(quantity)) {
    return {
      success: false,
      formErrors: {
        quantity: "Please Enter Valid Quantity",
      },
    };
  }
  if (!price) {
    return {
      success: false,
      formErrors: {
        price: "Please Enter Product Price",
      },
    };
  }
  if (isNaN(price)) {
    return {
      success: false,
      formErrors: {
        price: "Please Enter Valid Price",
      },
    };
  }
  if (previousPrice) {
    if (isNaN(previousPrice)) {
      return {
        success: false,
        formErrors: {
          previousPrice: "Please Enter Valid Previous Price",
        },
      };
    }
  }
  if (brand) {
    if (brand.length > 25) {
      return {
        success: false,
        formErrors: {
          brand: "Please Enter Valid Brand Name",
        },
      };
    }
  }
  if (imageValidationFlag) {
    const validImages = validateImages(images);
    if (!validImages.success) {
      return {
        success: false,
        formErrors: {
          images: validImages.message,
        },
      };
    }
  }
  return {
    success: true,
    formErrors: {},
  };
};
export default productValidation;
