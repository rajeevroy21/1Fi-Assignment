const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema(
  {
    color: {
      type: String,
      required: true
    },

    storage: {
      type: String,
      required: true
    },

    image: {
      type: String,
      required: true
    }
  },
  {
    _id: true
  }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    slug: {
      type: String,
      required: true,
      unique: true
    },

    brand: {
      type: String,
      required: true
    },

    mrp: {
      type: Number,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    variants: {
      type: [variantSchema],
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Product", productSchema);