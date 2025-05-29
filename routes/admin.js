const path = require("path");
const express = require("express");
const multer = require("multer");
const router = express.Router();
const adminController = require("../controllers/admin");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/add-product", adminController.addProductPage);

// router.get("/products", adminController.getProducts);

router.post("/add-product", upload.single("image"), adminController.sendProducts);

// router.post("/delete-product",adminController.deleteProduct)

module.exports = router;

// exports.routers=router
// exports.products=products
