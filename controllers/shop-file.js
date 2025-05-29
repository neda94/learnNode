const Product = require("../models/single-product");
const Cart = require("../models/cart");

module.exports.getAllProducts = (req, res) => {
  Product.fetchProductData((allProduct) => {
    res.render("shop/productList", {
      pageTitle: "Shop Store",
      productArr: allProduct,
    });
  });
};

module.exports.getProductDetail = (req, res) => {
  const productID = parseInt(req.params.productId);
  Product.fetchOneProduct(productID, (product) => {
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

module.exports.getIndex = (req, res) => {
  Product.fetchProductData((allProduct) => {
    res.render("shop/index", {
      pageTitle: "Shop ",
      productArr: allProduct,
    });
  });
};

module.exports.getCart = (req, res) => {
  res.render("shop/cart", {
    pageTitle: "cart",
  });
};

module.exports.postCart = (req, res) => {
  const productId = parseInt(req.body.productId);
  Product.fetchOneProduct(productId, (product) => {
    if (!product) {
      return res.status(404).render("shop/productDetail", {
        product: { title: "Not Found", price: "", description: "" },
        pageTitle: "Product Not Found",
      });
    }
    Cart.addToCart(productId, product.price);
  });
  res.redirect("/cart");
};

module.exports.getOrders = (req, res) => {
  res.render("shop/orders", {
    pageTitle: "Orders",
  });
};

module.exports.getCheckout = (req, res) => {
  res.render("shop/checkout", {
    pageTitle: "checkout",
  });
};
