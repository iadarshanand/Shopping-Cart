const mongoose = require("mongoose");
const Review = require("./review");
const User = require("./user");

//Schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  img: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    min: 0,
    default: 0,
  },
  avgRating: {
    type: Number,
    min: 0,
    default: 0,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  desc: {
    type: String,
    trim: true,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});
//post middleware of delete query
productSchema.post("findOneAndDelete", async (product) => {
  // console.log(await product.reviews);
  if (product.reviews.length > 0) {
    await Review.deleteMany({ _id: { $in: product.reviews } });
  }
});
//Model
const Product = new mongoose.model("Product", productSchema);

//Export
module.exports = Product;
