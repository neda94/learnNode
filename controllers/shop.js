const Product = require("../models/single-product");

module.exports.getAllProducts = (req, res) => {
  Product.fetchAllProduct()
    .then((products) => {
      res.render("shop/productList", {
        productArr: products,
        pageTitle: "Shop Store",
        
      });
    })
    .catch((err) => {
      console.log(err)
    });
};



module.exports.getIndex = (req, res) => {
  Product.fetchAllProduct()
  .then((products) => {
    res.render("shop/index", {
      productArr: products,
      pageTitle: "Shop Store",
    });
  })
  .catch((err) => {
    console.log(err)
  });
};

