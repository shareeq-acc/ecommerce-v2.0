import mongoose from "mongoose";
import crypto from "crypto";
import slugify from "../utility/generateSlug.js";
const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  brand: {
    type: String,
    required: true,
    trim: true,
    default:null
  },
  images: [
    {
      name: String,
      url: String,
    },
  ],
  description: {
    type: String,
    trim: true,
  },
  quantity: {
    type: Number,
  },
  price: {
    type: Number,
  },
  previousPrice: {
    type: Number,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  orders: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
});

const generateUniqueSlug = async (data) => {
  const mainSlug = slugify(data);
  let generatedSlug = "";
  const maxIterations = 10;
  let i = 0;
  let foundUniqueSlug = false;

  while (i < maxIterations && foundUniqueSlug === false) {
    // Check for A Unique Slug
    const randomCharacters = crypto.randomBytes(4).toString("hex");
    generatedSlug = `${mainSlug}-${randomCharacters}`;
    const isExistingSlug = await Product.findOne({ slug: generatedSlug });
    if (!isExistingSlug) {
      console.log(`Found Unique Slug on ${i} Iteration, ${generatedSlug}`);
      foundUniqueSlug = true;
    }
    i++;
  }

  // Failed to Find a Unique Slug
  if (foundUniqueSlug === false) {
    throw new Error();
  }
  return generatedSlug;
};

productSchema.methods.generateSlug = async function generateSlug(name) {
  return await generateUniqueSlug(name);
};

productSchema.pre("save", async function save(next) {
  const slugGenerated = await generateUniqueSlug(this.name);
  this.slug = slugGenerated;
  next();
});

const Product = mongoose.model("Product", productSchema);
export default Product;
