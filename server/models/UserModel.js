const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
        total: { type: Number, required: true },
      },
    ],
  },
});

userSchema.methods.addToCart = function (product) {
  const cartProductIndex = this.cart.items.findIndex((cp) => {
    return cp.productId.toString() === product._id.toString();
  });
  let newQuantity = 1;
  let price;
  const updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    price = this.cart.items[cartProductIndex].total + product.price;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
    updatedCartItems[cartProductIndex].total = price;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity,
      total: product.price,
    });
  }
  const updatedCart = {
    items: updatedCartItems,
  };
  this.cart = updatedCart;
  return this.save();
};

userSchema.methods.deleteItemFromCart = function (product) {
  const cartProductIndex = this.cart.items.findIndex((cp) => {
    return cp.productId.toString() === product._id.toString();
  });
  let delQuantity = 1;
  let price;
  const updatedCartItems = [...this.cart.items];
  console.log(this.cart.items[cartProductIndex].quantity);
  if (this.cart.items[cartProductIndex].quantity > 0) {
    if (cartProductIndex >= 0) {
      delQuantity = this.cart.items[cartProductIndex].quantity - 1;
      price = this.cart.items[cartProductIndex].total - product.price;
      updatedCartItems[cartProductIndex].quantity = delQuantity;
      updatedCartItems[cartProductIndex].total = price;

      if (delQuantity == 0) {
        const update = this.cart.items.filter((item) => {
          item.productId.toString() !== product._id.toString();
        });
        console.log(update, "in");
        const updatedCart1 = {
          items: update,
        };
        this.cart = updatedCart1;
        return this.save();
      }
    }
  } else {
    const update = this.cart.items.filter((item) => {
      item.productId.toString() !== product._id.toString();
    });
    console.log(update, "out");
    const updatedCart1 = {
      items: update,
    };
    this.cart = updatedCart1;
    return this.save();
  }

  const updatedCart = {
    items: updatedCartItems,
  };
  this.cart = updatedCart;
  return this.save();
};

userSchema.methods.deleteCart = function (product) {
  console.log("=========start==========================");
  console.log(product);
  const update3 = this.cart.items.filter((item) => {
    item.productId.toString() !== product._id.toString();
  });

  console.log(update3);
  const updatedCart3 = {
    items: update3,
  };
  this.cart = updatedCart3;

  return this.save();
};

module.exports = mongoose.model("User", userSchema);
