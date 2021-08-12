import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { fetchCart } from "../redux/actions/product-actions";
import ProductService from "../services/product-services";

function Cart() {
  const [sid, setSid] = useState("");
  const cart = useSelector((state) => state.product.cart);
  console.log(cart.products);
  const dispatch = useDispatch();

  const fetchCartProducts = async () => {
    try {
      const response = await ProductService.cartFetch();
      dispatch(fetchCart(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCartProducts();
  }, [sid]);

  const addCart = async (e) => {
    try {
      const id = e.target.getAttribute("data-id");
      //  alert(id);
      setSid(id);
      const response = await ProductService.cartAdd({ productId: id });
      alert("product Added in cart Successfully");
      setSid("");
    } catch (error) {
      console.log(error);
    }
  };

  const removeCart = async (e) => {
    try {
      const id = e.target.getAttribute("data-id");
      // alert(id);
      setSid(id);
      const response = await ProductService.cartRemove({ productId: id });
      alert("product Deleted in cart Successfully");
      setSid("");
    } catch (error) {
      console.log(error);
    }
  };
  let sum = 0;
  const sum1 = cart.products.map((count) => {
    return (sum += count.total);
  });

  const buy=()=>{
      alert("Thanks for Purchase");
  }

  const cartItems = cart.products.map((prod) => {
    return (
      <div className="row">
        <hr></hr>
        <div className="col-md-3 text-center">
          <p>{prod.productId.title}</p>
        </div>
        <div className="col-md-2 text-center">
          <p>{prod.productId.price}</p>
        </div>
        <div className="col-md-2 text-center">
          <p>{prod.quantity}</p>
        </div>
        <div className="col-md-2 text-center">
          <p>{prod.total}</p>
        </div>
        <div className="col-md-3 text-center">
          <button
            className="btn"
            id="remove-button"
            data-id={prod.productId.id}
            onClick={removeCart}
          >
            -
          </button>
          <button
            className="btn"
            id="add-button"
            data-id={prod.productId.id}
            onClick={addCart}
          >
            +
          </button>
        </div>
      </div>
    );
  });
  return (
    <div className="row">
      <div className="col-md-8">
        <div className="card mb-3">
          <div className="card-body">
            <h3 className="text-center">cart</h3>
            <div className="row mb-1">
              <hr></hr>
              <div className="col-md-3 text-center">Product</div>
              <div className="col-md-2 text-center">Price</div>
              <div className="col-md-2 text-center">Qty</div>
              <div className="col-md-2 text-center">Total</div>
              <div className="col-md-3 text-center">Action</div>
            </div>
            {cartItems}
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card mb-3">
          <div className="card-body">
            <h3 className="text-center">Checkout</h3>
            <hr></hr>
            <h5 className="text-center">Total Amount </h5>
            <hr></hr>
            <h5 className="text-center">{sum}</h5>
            <hr></hr>
            <div className="d-grid gap-0">
              <a className="btn  btn-primary" type="button" onClick={buy}>
               BUY
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
