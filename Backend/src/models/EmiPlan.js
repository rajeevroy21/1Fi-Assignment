const mongoose = require("mongoose");

const emiPlanSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },

    tenure: {
      type: Number,
      required: true
    },

    monthlyAmount: {
      type: Number,
      required: true
    },

    interestRate: {
      type: Number,
      required: true
    },

    cashback: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("EmiPlan", emiPlanSchema);