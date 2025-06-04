const getDB = require("../util/dataBase").getDB;
const { ObjectId} = require("mongodb");

class product {
  constructor(title, price, description, imageUrl,uId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this.id = Math.floor(Math.random() * 10);
    this.uId=uId
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
    return db
      .collection("product")
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

  static fetchOneProduct(productID) {
    const db = getDB();
    return db
      .collection("product")
      .find({ _id: new ObjectId(productID) })
      .next()
      .then((product) => {
        console.log(product);
        return product;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static deleteOneProduct(productID) {
    const db = getDB();

    if (!ObjectId.isValid(productID) || productID.length !== 24) {
      console.error("Invalid ObjectId:", productID);
      return; // یا throw کن
    }

    return db
      .collection("product")
      .deleteOne({ _id: new ObjectId(productID) })
      .then((res) => {
        console.log("deleted!");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
module.exports = product;
