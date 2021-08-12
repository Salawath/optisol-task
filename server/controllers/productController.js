const Product = require("../models/ProductModel");
const User = require("../models/UserModel");

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      console.log(products);
      res.status(200).json({
        success: 1,
        message: "product fetched successfully",
        products: products,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(401).json({ success: 0, message: "error in getproducts" });
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      res.status(200).json({
        success: 1,
        message: "product fetched successfully",
        product: product,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(401).json({ success: 0, message: "error in getproduct" });
    });
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  User.findById(req.userId)
    .then((user) => {
      return user.populate("cart.items.productId").execPopulate();
    })
    .then((result) => {
      console.log(result);
      console.log(result.cart.items);
      const products = result.cart.items;
      res.status(200).json({
        success: 1,
        message: "cart fetched successfully",
        products: products,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(401).json({ success: 0, message: "error in get cart" });
    });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let myProduct;
  console.log(prodId, req.userId);
  Product.findById(prodId)
    .then((product) => {
      myProduct = product;
      return User.findById(req.userId).exec();
    })
    .then((user) => {
      return user.addToCart(myProduct);
      //console.log(user);
    })
    .then((result) => {
      console.log(result);
      res.status(200).json({
        success: 1,
        message: "cart added sucessfully",
        products: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(401).json({ success: 0, message: "error in post cart" });
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  let myProducts;
  Product.findById(prodId)
    .then((product) => {
      myProducts = product;

      return User.findById(req.userId).exec();
    })
    .then((user) => {
      return user.deleteItemFromCart(myProducts);
    })
    .then((result) => {
      res.status(200).json({
        success: 1,
        message: "cart deleted sucessfully",
        products: result,
      });
    })
    .catch((err) => console.log(err));
};

exports.deleteCart = (req, res, next) => {
  const prodId = req.body.productId;
  let myProducts;
  Product.findById(prodId)
    .then((product) => {
      myProducts = product;

      return User.findById(req.userId).exec();
    })
    .then((user) => {
      return user.deleteCart(myProducts);
    })
    .then((result) => {
      res.status(200).json({
        success: 1,
        message: "cart deleted sucessfully",
        products: result,
      });
    })
    .catch((err) => console.log(err));
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .addOrder()
    .then((result) => {
      res.redirect("/orders");
    })
    .catch((err) => console.log(err));
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders()
    .then((orders) => {
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        orders: orders,
      });
    })
    .catch((err) => console.log(err));
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const image = req.file;
  const price = req.body.price;
  const description = req.body.description;
  if (!image) {
    return res.status(401).json({ success: 0, message: "not a image" });
  }
  //   const errors = validationResult(req);

  //   if (!errors.isEmpty()) {
  //     return res.status(422).json({ success: 0, errors: errors.array() });
  //   }

  const imageUrl = image.path;

  const product = new Product({
    // _id: new mongoose.Types.ObjectId('5badf72403fd8b5be0366e81'),
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
  });
  product
    .save()
    .then((result) => {
      // console.log(result);
      console.log("Created Product");
      res.status(200).json({
        success: 1,
        message: "product created sucessfully",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
