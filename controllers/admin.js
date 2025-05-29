const product = require("../models/single-product");

module.exports.addProductPage = (req, res) => {
  // res.sendFile(path.join(__dirname,'../','views','add-product.html'))
  res.render("admin/add-product", {
    pageTitle: "Add Product",
  });
};

// module.exports.getProducts = (req, res) => {
//   product.fetchProductData((allProduct) => {
//     res.render("admin/products", {
//       pageTitle: "Admin Products",
//       productArr: allProduct,
//     });
//   });
// };

module.exports.sendProducts = (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;

  const imageUrl = "/images/" + req.file.filename;
  // const products = new product(title, price, description, imageUrl);
  // products.saveProductData();
  // res.redirect("/");
  const products = new product(title, price, description, imageUrl);
  products.saveProductData()
  .then(() => {
    console.log('Product saved successfully');
    res.redirect("/admin/add-product");

  })
  .catch((err) => {
    console.error("Error saving product:", err);
    res.status(500).send("Internal Server Error");
  });
};

// module.exports.deleteProduct = (req, res) => {
//   const productId = req.body.productID;
//   product.deleteProductData(productId);
//   res.redirect("/admin/products");
// };
