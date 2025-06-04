const product = require("../models/single-product");
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
      console.log(err);
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
      console.log(err);
    });
};

module.exports.getProductDetail = (req, res) => {
  const productID = parseInt(req.params.productId);
  product.fetchOneProduct(productID).then((product) => {
    if (!product) {
      return res.status(404).render("shop/productDetail", {
        product: { title: "Not Found", price: "", description: "" },
        pageTitle: "Product Not Found",
      });
    }
    res.render("shop/productDetail", {
      product,
      pageTitle: product.title,
    });
  });
};

module.exports.getCart = (req, res) => {
  res.render("shop/cart", {
    pageTitle: "cart",
  });
};

module.exports.postCart = (req, res) => {
  const productId = req.body.productId;
  Product.fetchOneProduct(productId).then((product) => {
    return req.user.addToCart(product);
  })
  .then(result=>{
    console.log(result)
    res.redirect('/cart')
  })
};
