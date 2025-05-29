const fs = require("fs");
const path = require("path");
const cart = require("./cart");

const getFilePath = () => {
  return path.join(path.dirname(require.main.filename), "data", "product.json");
};

const getProductsFromFile = (cb) => {
  const filePath = getFilePath();

  fs.readFile(filePath, "utf-8", (err, fileContent) => {
    if (err || !fileContent) {
      return cb([]);
    }

    try {
      const products = JSON.parse(fileContent);
      cb(products);
    } catch (e) {
      cb([]);
    }
  });
};
module.exports = class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  saveProductData() {
    this.id = Math.floor(Math.random() * 10);
    const filePath = path.join(
      path.dirname(require.main.filename),
      "data",
      "product.json"
    );

    fs.readFile(filePath, (err, fileContent) => {
      let products = [];
      if (!err && fileContent.length > 0) {
        try {
          products = JSON.parse(fileContent);
        } catch (e) {
          products = [];
        }
      }

      products.push(this);

      fs.writeFile(filePath, JSON.stringify(products), (err) => {
        if (err) console.error("Error saving product:", err);
      });
    });
  }

  static deleteProductData(productID) {
    getProductsFromFile((products) => {
      const filePath = getFilePath();
      const productTarget=products.find(p=>p.id===productID)
      const updatedProduct = products.filter((p) => p.id !== productID);
      fs.writeFile(filePath, JSON.stringify(updatedProduct), (err) => {
        if (!err) {
          cart.deleteProduct(productTarget,productTarget.price)
        }
      });
    });
  }
  static fetchProductData(callback) {
    getProductsFromFile(callback);
  }

  static fetchOneProduct(id, cb) {
    getProductsFromFile((products) => {
      const oneProduct = products.find((p) => p.id === id);
      cb(oneProduct);
    });
  }
};
