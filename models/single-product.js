const getDB = require("../util/dataBase").getDB;

class product {
  constructor(title, price, description, imageUrl) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this.id = Math.floor(Math.random() * 10);
  }

  saveProductData() {
    const db = getDB();
    return db
      .collection("product")
      .insertOne(this)
      .then((result) => {
        console.log("Product saved successfully", result);
      })
      .catch((err) => {
        console.error("Error saving product:", err);
      });
  }

  static fetchAllProduct() {
    const db = getDB();
    return db.collection("product")
      .find()
      .toArray()
      .then((products) => {
        console.log(products);
        return products;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
module.exports = product;
