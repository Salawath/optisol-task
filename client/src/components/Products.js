import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchProduct } from "../redux/actions/product-actions";
import ProductService from "../services/product-services";
import SingleProduct from "./SingleProduct";
function Products() {
  const product = useSelector((state) => state.product);
  console.log(product.products.products);
  const history = useHistory();
  const dispatch = useDispatch();
  const fetchALL = async () => {
    try {
      const response = await ProductService.productsFetch();
      //const response = await axios.get("/tutorials");
      // console.log(response.data);
      dispatch(fetchProduct(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchALL();
  }, []);

  return <>{
    
    <SingleProduct />
    }</>;
}

export default Products;
