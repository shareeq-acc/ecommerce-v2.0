import { extname } from "path";
import productValidation from "../utility/validation/productValidation.js";
import ErrorHandler from "../utility/errorHandler.js";
import bufferToUrl from "../utility/bufferToUrl.js";
import { uploadImage, deleteImage } from "../utility/images.js";
import {
  createProduct,
  findProduct,
  loadAllProducts,
  updateProductInDb,
  removeProduct,
  searchProductByText,
  findProductById,
  getProductsForHomePage,
} from "../dbHelpers/products.js";
import { getSingleProductDetails } from "../dbHelpers/products.js";

export const findHomeProducts = async (req, res, next) => {
  const productsData = await getProductsForHomePage();
  res.status(200).json({
    success: true,
    products: productsData,
  });
};

export const findAllProducts = async (req, res, next) => {
  const products = await loadAllProducts();
  res.status(200).json({
    success: true,
    products,
  });
};

export const createNewProduct = async (req, res, next) => {
  const images = req.files;
  const imagesLength = images.length || 0;
  const { name, description, quantity, price, previousPrice, brand } = req.body;
  const uploadedImgDetails = [];

  const validateProduct = productValidation({
    name,
    description,
    quantity,
    price,
    previousPrice,
    images,
    imageValidationFlag: true,
  });

  if (!validateProduct.success) {
    return next(
      new ErrorHandler(400, "Product Validation Error", {
        formErrors: validateProduct?.formErrors || {},
      })
    );
  }

  // Upload Product Images
  for (let i = 0; i < imagesLength; i++) {
    const fileFormat = extname(images[i].originalname);
    const { base64 } = bufferToUrl(fileFormat, images[i].buffer);
    const imageInfo = await uploadImage(fileFormat, base64);
    uploadedImgDetails[i] = imageInfo;
  }

  await createProduct({
    name,
    description,
    quantity: parseInt(quantity),
    price: parseInt(price),
    previousPrice: previousPrice ? parseInt(previousPrice) : null,
    images: uploadedImgDetails,
    reviews: [],
    brand: brand,
  });

  res.status(201).json({
    success: true,
  });
};

export const deleteProduct = async (req, res, next) => {
  const { productId } = req.params;
  const isExistingProduct = await findProductById(productId);

  if (!isExistingProduct) {
    return next(
      new ErrorHandler(400, "No Product Found", {
        message: "Product Does Not Exists",
      })
    );
  }
  await removeProduct(isExistingProduct._id);

  // Remove All Product Images
  const imagesLength = isExistingProduct.images.length || 0;
  for (let i = 0; i < imagesLength; i++) {
    const publicId = isExistingProduct.images[i].name;
    await deleteImage(publicId);
  }

  return res.status(200).json({
    success: true,
    message: "Product Deleted",
  });
};

export const getProduct = async (req, res, next) => {
  const { productSlug } = req.params;
  const isExistingProduct = await getSingleProductDetails(productSlug);

  if (!isExistingProduct) {
    return next(
      new ErrorHandler(400, "No Product Found", {
        message: "Product Does Not Exists",
      })
    );
  }

  return res.status(200).json({
    success: true,
    product: isExistingProduct,
  });
};

export const updateProduct = async (req, res, next) => {
  const { productId } = req.params;
  const { name, description, quantity, price, previousPrice, brand } = req.body;
  const isExistingProduct = await findProductById(productId);
  if (!isExistingProduct) {
    return next(
      new ErrorHandler(400, "No Product Found", {
        message: "Product Does Not Exists",
      })
    );
  }
  const validateProduct = productValidation({
    name,
    description,
    quantity,
    price,
    previousPrice,
    imageValidationFlag: false,
  });

  if (!brand && isExistingProduct.brand?.toLowerCase() !== "unbranded") {
    return next(
      new ErrorHandler(400, "Product Validation Error", {
        formErrors: { brand: "Please Provide a Brand" },
      })
    );
  }

  if (!validateProduct.success) {
    return next(
      new ErrorHandler(400, "Product Validation Error", {
        formErrors: validateProduct?.formErrors || {},
      })
    );
  }
  if (isExistingProduct.name !== name) {
    // Name Changed -> Create New Slug
    const generatedNewSlug = await isExistingProduct.generateSlug(name);
    await updateProductInDb(isExistingProduct._id, {
      name,
      description,
      quantity,
      price,
      previousPrice,
      slug: generatedNewSlug,
      updatedAt: Date.now(),
    });
  } else {
    await updateProductInDb(isExistingProduct._id, {
      name,
      description,
      quantity,
      price,
      previousPrice,
      updatedAt: Date.now(),
    });
  }

  let generatedNewSlug = "";

  // Name Changed -> Create New Slug
  if (isExistingProduct.name !== name) {
    generatedNewSlug = await isExistingProduct.generateSlug(name);
  }

  await updateProductInDb(isExistingProduct._id, {
    name,
    description,
    quantity,
    price,
    previousPrice,
    brand,
    slug:
      isExistingProduct.name !== name
        ? generatedNewSlug
        : isExistingProduct.slug,
    updatedAt: Date.now(),
  });

  return res.status(200).json({
    success: true,
    message: "Sucessfully Updated Product",
  });
};

export const changeProductImage = async (req, res, next) => {
  const { productId } = req.params;
  const { name, index } = req.body;
  const image = req.file;

  const isExistingProduct = await findProductById(productId);
  if (!isExistingProduct) {
    return next(
      new ErrorHandler(400, "No Product Found", {
        message: "Product Does Not Exists",
      })
    );
  }
  if (!image) {
    return res.status(200).json({
      success: true,
    });
  }
  if (!name || !index) {
    return next(new ErrorHandler(400, "Empty Fields", {}));
  }

  let imagesDetailsArray = isExistingProduct.images;

  // Delete The Image
  await deleteImage(name);

  // Upload New Image
  const fileFormat = extname(image.originalname);
  const { base64 } = bufferToUrl(fileFormat, image.buffer);
  const newImage = await uploadImage(fileFormat, base64);

  // Replace Name and URl
  imagesDetailsArray[index].name = newImage.name;
  imagesDetailsArray[index].url = newImage.url;

  await updateProductInDb(isExistingProduct._id, {
    images: imagesDetailsArray,
  });

  return res.status(200).json({
    success: true,
    message: "Successfully Updated Image",
  });
};

export const searchProduct = async (req, res, next) => {
  const { text } = req.body;

  // Query Parameters
  req.query.start = parseInt(req.query.start) ? req.query.start : 0;
  req.query.min = parseInt(req.query.min) ? req.query.min : 0;
  req.query.max = parseInt(req.query.max) ? req.query.max : 999999999;
  req.query.brands = !req.query.brands
    ? []
    : Array.isArray(req.query.brands)
    ? req.query.brands
    : [req.query.brands];
  req.query.order = req.query.order?.length ? req.query.order : "default";
  const { start, min, max, brands, order } = req.query;

  if (!text || text?.length < 1) {
    return next(
      new ErrorHandler(400, "Search Text Not Provided", {
        message: "Please Enter a Search Value",
      })
    );
  }

  const searchResults = await searchProductByText(text, {
    start,
    min,
    max,
    brands,
    order,
  });

  res.status(200).json({
    success: true,
    products: searchResults,
    totalResults: searchResults?.length,
  });
};
