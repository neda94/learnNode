const fs = require("fs");
const path = require("path");

const getFilePath = () => {
  return path.join(path.dirname(require.main.filename), "data", "cart.json");
};

module.exports = class Cart {
  static addToCart(id, productPrice) {
    const filePath = getFilePath();
    fs.readFile(filePath, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      const existingProductIndex = cart.products.findIndex((p) => p.id === id);
      const existingProduct = cart.products[existingProductIndex];

      let updatedProduct;

      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProduct] = updatedProduct;
      } else {
        updatedProduct = { id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;

      fs.writeFile(filePath, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static deleteProduct(id,productPrice){
    const filePath = getFilePath();
    fs.readFile(filePath,(err,contentFile)=>{
      const updatedProduct={...JSON.parse(contentFile)}
      const product=updatedProduct.products.find(p=>p.id===id)
      if(!product){
        return
      }
      const productQty=product.qty
      updatedProduct.products=updatedProduct.products.filter(p=>p.id!==id)
      updatedProduct.totalPrice=updatedProduct.totalPrice-productPrice*productQty
      fs.writeFile(filePath,JSON.stringify(updatedProduct),((err)=>{
        console.log(err)
      }))

    })
  }
};
