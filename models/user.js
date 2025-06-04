const getDB = require("../util/dataBase").getDB;
const { ObjectId } = require("mongodb");

class User {
  constructor(userName, email, cart, id) {
    this.userName = userName;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  saveUserData() {
    const db = getDB();
    return db.collection("user").insertOne(this);
  }

  addToCart(product) {
    console.log(product)
    const updatedCart = {
      items: [{ productId: new ObjectId(product._id), qty: 1 }],
    };
    const db = getDB();
    return db
      .collection("user")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }
  static findUserByID(uId) {
    const db = getDB();
    return db
      .collection("user")
      .findOne({ _id: new ObjectId(uId) })
      .then((user) => {
        console.log(`find user :${user}`);
        return user;
      })
      .catch((err) => {
        return err;
      });
  }
}

module.exports = User;
