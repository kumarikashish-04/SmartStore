const mongoose = require("mongoose");

const productSchema =
  new mongoose.Schema(
    {
      title: String,

      price: Number,

      category: String,

      description: String,

      tags: [String],

      stock: Number,

      sales: {
        type: Number,
        default: 0,
      },

      createdBy: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "Product",
  productSchema
);