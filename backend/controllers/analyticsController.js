const Product = require(
    "../models/Products"
  );
  
  const getAnalytics = async (
    req,
    res
  ) => {
  
    try {
  
      const products =
        await Product.find({
          createdBy:
            req.user._id,
        });
  
        
      // TOTAL PRODUCTS
      const totalProducts =
        products.length;
  
      // TOTAL REVENUE
      const totalRevenue =
        products.reduce(
          (acc, item) =>
            acc +
            item.price *
              item.sales,
          0
        );
  
      // TOTAL STOCK
      const totalStock =
        products.reduce(
          (acc, item) =>
            acc + item.stock,
          0
        );
  
      // TOP PRODUCTS
      const topProducts =
        [...products].sort(
          (a, b) =>
            b.sales - a.sales
        );
  
      res.json({
        totalProducts,
  
        totalRevenue,
  
        totalStock,
  
        topProducts:
          topProducts.slice(0, 5),
      });
  
    } catch (error) {
  
      res.status(500).json({
        message: error.message,
      });
    }
  };
  
  module.exports = {
    getAnalytics,
  };