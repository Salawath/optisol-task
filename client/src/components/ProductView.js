import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { fetchCart } from "../redux/actions/product-actions";
import ProductService from "../services/product-services";

function ProductView() {
  const cart = useSelector((state) => state.product.cart);
  const auth = useSelector((state) => state.auth);

  const [sproduct,setSproduct] =useState({});

  const dispatch = useDispatch();
  const { id } = useParams();
  const fetchCartProducts = async () => {
    try {
      const response = await ProductService.cartFetch();
      console.log(response.data);
      dispatch(fetchCart(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  const addCart = async () => {
   
    try {
      const response = await ProductService.cartAdd({ productId: id });
      alert('product Added in cart Successfully');
    } catch (error) {
      console.log(error);
    }
  };

   const fetchSingleProduct = async () => {
     try {
       const response = await ProductService.singleproductFetch(id);
      console.log(response.data.product);
      setSproduct(response.data.product);
     } catch (error) {
       console.log(error);
     }
   };

  useEffect(() => {
    fetchCartProducts();
    fetchSingleProduct();
  }, []);

  return (
    <div className="row">
      <div className="col-md-6">
        <img
          src={'http://localhost:5000/'+sproduct.imageUrl}
          width="100%"
          height="100%"
        />
      </div>

      <div className="col-md-6">
        <h3>{sproduct.title}</h3>
        <p>{sproduct.description}</p>

        <p className="text-primary">
          <strong>PRICE : &#8377;{sproduct.price}</strong>
        </p>
        <div className="d-grid gap-0">
          {!auth.isLoggedIn && (
            <Link class="btn  btn-primary" to="/login">
              please login first
            </Link>
          )}
          {auth.isLoggedIn && (
            <a className="btn  btn-primary" onClick={addCart} type="button">
              Add to Cart
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductView;
