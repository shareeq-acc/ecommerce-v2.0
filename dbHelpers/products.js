import Product from "../models/productSchema.js";

export const loadAllProducts = async () => {
  return await Product.find({});
};

export const getProductsForHomePage = async () => {
  const limit = 15;
  let queryLookup = {
    $lookup: {
      from: "reviews",
      localField: "reviews",
      foreignField: "_id",
      as: "reviews_doc",
    },
  };
  let queryProject = {
    $project: {
      rating: {
        total: { $size: "$reviews" },
        value: { $sum: "$reviews_doc.rating" },
      },
      name: 1,
      brand: 1,
      slug: 1,
      images: 1,
      createdAt: 1,
      orders: 1,
      price: 1,
      previousPrice: 1,
    },
  };
  const newArrivalProducts = await Product.aggregate([
    { $match: {} },
    queryLookup,
    queryProject,
    { $sort: { createdAt: -1 } },
    { $limit: limit },
  ]);

  const trendingProducts = await Product.aggregate([
    { $match: {} },
    queryLookup,
    queryProject,
    { $sort: { orders: -1 } },
    { $limit: limit },
  ]);

  const discountedProducts = await Product.aggregate([
    { $match: { previousPrice: { $gt: 0 } } },
    queryLookup,
    queryProject,
    {
      $addFields: {
        discountRatio: { $divide: ["$previousPrice", "$price"] },
      },
    },
    { $sort: { discountRatio: -1 } },
    { $limit: limit },
  ]);

  return [
    {
      title: "new arrival",
      products: newArrivalProducts,
    },
    {
      title: "discounted",
      products: discountedProducts,
    },
    {
      title: "trending",
      products: trendingProducts,
    },
  ];
};
//   const limit = 15;
//   // const allProducts = await Product.find({ isActive: true });
//   const newArrival = await Product.find({ isActive: true })
//     .sort({ createdAt: -1 })
//     .limit(limit)
//     .populate("reviews");
//   // .populate("");
//   const trending = await Product.find({ isActive: true })
//     .sort({ orders: -1 })
//     .limit(limit);
//   // const discounted = await Product.find({ isActive: true })
//   //   .sort({ total: { $subtract: ["previousPrice", "price"] } })
//   //   .limit(limit);
//   const discounted = await Product.aggregate([
//     {
//       $addFields: {
//         sortOrder: {
//           $cond: {
//             if: "$previousPrice",
//             then: { $subtract: ["$price", "$previousPrice"] },
//             else: "$price",
//           },
//         },
//       },
//     },
//     { $sort: { previousPrice: 1 } },
//     { $limit: 1 },
//   ]);
//   return [
//     {
//       title: "new arrival",
//       products: newArrival,
//     },
//     {
//       title: "discounted",
//       products: discounted,
//     },
//     {
//       title: "trending",
//       products: trending,
//     },
//   ];
// };

export const findProduct = async (field, value) => {
  return await Product.findOne({ [field]: value });
};

export const getSingleProductDetails = async (slug) => {
  const product = await Product.aggregate([
    { $match: { slug } },
    {
      $lookup: {
        from: "reviews",
        localField: "reviews",
        foreignField: "_id",
        as: "reviews",
      },
    },
    {
      $addFields: {
        rating: {
          total: { $size: "$reviews" },
          value: { $sum: "$reviews.rating" },
        },
      },
    },
    { $project: { reviews: 0, __v: 0, updatedAt: 0, createdAt: 0, _id: 0 } },
    { $limit: 1 },
  ]);
  if (product?.length) {
    return product[0];
  } else return {};
};

export const createProduct = async (data) => {
  const newProduct = new Product(data);
  await newProduct.save();
};

export const findProductById = async (id) => {
  return await Product.findById(id);
};

export const searchProductByText = async (
  text,
  { start, min, max, brands, order }
) => {
  const maxLimit = 15;
  const sortOrder =
    order === "default" ? 0 : order.toLowerCase() === "low-high" ? 1 : -1;

  if (brands?.length > 0) {
    return await Product.find({
      name: { $regex: text, $options: "i" },
      brand: { $in: brands },
    })
      .select("_id name slug quantity price previousPrice images")
      .where("price")
      .gte(min)
      .lte(max)
      .sort({ price: sortOrder })
      .skip(start)
      .limit(maxLimit);
  } else {
    return await Product.find({
      name: { $regex: text, $options: "i" },
    })
      .select("_id name slug quantity price previousPrice images")
      .where("price")
      .gte(min)
      .lte(max)
      .sort({ price: sortOrder })
      .skip(start)
      .limit(maxLimit);
  }
};

export const removeProduct = async (productId) => {
  await Product.findByIdAndRemove(productId);
};

export const updateProductInDb = async (productId, product) => {
  await Product.findOneAndUpdate({ _id: productId }, product);
};

export const adjustProductQuantity = async (productId, adjustment) => {
  // Adjustment Positive -> Increment and Adjustment Negative -> Decrement
  let greatorThanNumber = 0;
  if (adjustment < 0) {
    // Negative -> Decrement (Ensure than the Quantity does not turn negative after decrement)
    greatorThanNumber = adjustment;
  }
  await Product.findByIdAndUpdate(
    productId,
    { $inc: { quantity: adjustment } },
    { quantity: { $gte: greatorThanNumber } }
  );
};
export const incrementProductOrders = async (productId) => {
  await Product.findByIdAndUpdate(productId, { $inc: { orders: 1 } });
};
