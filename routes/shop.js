const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shop");

router.get("/", shopController.getIndex);

router.get("/products", shopController.getAllProducts);

router.get("/products/:productId",shopController.getProductDetail);

router.get("/cart", shopController.getCart);

router.post("/cart", shopController.postCart);

module.exports = router;