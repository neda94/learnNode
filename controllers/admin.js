const product = require("../models/single-product");

module.exports.addProductPage = (req, res) => {
  // res.sendFile(path.join(__dirname,'../','views','add-product.html'))
  res.render("admin/add-product", {
    pageTitle: "Add Product",
  });
};

module.exports.getProducts = (req, res) => {
  product
    .fetchAllProduct()
    .then((products) => {
      
      res.render("admin/products", {
        productArr: products,
        pageTitle: "admin products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.sendProducts = (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;

  const imageUrl = "/images/" + req.file.filename;
  // const products = new product(title, price, description, imageUrl);
  // products.saveProductData();
  // res.redirect("/");
  const products = new product(title, price, description, imageUrl,req.user._id);
  products
    .saveProductData()
    .then(() => {
      console.log("Product saved successfully");
      res.redirect("/admin/add-product");
    })
    .catch((err) => {
      console.error("Error saving product:", err);
      res.status(500).send("Internal Server Error");
    });
};

module.exports.deleteProduct = (req, res) => {
  const productId = req.body.productID;
  // product.deleteProductData(productId);
  // res.redirect("/admin/products");
  product
    .deleteOneProduct(productId)
    .then(() => {
      console.log("product deleted !");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};
