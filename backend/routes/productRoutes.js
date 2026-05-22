const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();


// CREATE + GET ALL
router
  .route("/")
  .post(protect, createProduct)
  .get(protect, getProducts);


// GET SINGLE + UPDATE + DELETE
router
  .route("/:id")
  .get(protect, getProduct)
  .put(protect, updateProduct)
  .delete(protect, deleteProduct);

module.exports = router;