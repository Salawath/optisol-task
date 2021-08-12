const path = require("path");

const express = require("express");

const shopController = require("../controllers/productController");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/products/:productId", shopController.getProduct);

router.get("/cart", isAuth, shopController.getCart);

router.post("/cart", isAuth, shopController.postCart);

router.post("/cart-delete-item", isAuth, shopController.postCartDeleteProduct);

router.post("/cart-delete", isAuth, shopController.deleteCart);

// router.post('/create-order', shopController.postOrder);

// router.get('/orders', shopController.getOrders);

router.post("/add-product", shopController.postAddProduct);

module.exports = router;
