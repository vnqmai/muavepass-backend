const Product = require("../models/Product");
const express = require("express");
const router = express.Router();

router.get("/list", async function (req, res) {
  return Product.find({status: "in_stock"}).then((products) => {
    res.json({
      error: 0,
      message: "Ok",
      data: products,
    });
  });
});

router.get("/list-in-stock", async function (req, res) {
  return Product.find({ status: "in_stock" }).then((products) => {
    res.json({
      error: 0,
      message: "Ok",
      data: products,
    });
  });
});

router.get("/:productId", async function (req, res) {
  return Product.findOne({ _id: req.params.productId }).then(
    (product) => {
      res.json({
        error: 0,
        message: "Ok",
        data: product,
      });
    }
  );
});

module.exports = router;
