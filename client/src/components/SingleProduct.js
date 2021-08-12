import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import { fetchProduct } from "../redux/actions/product-actions";
import ProductService from "../services/product-services";
import { Link } from "react-router-dom";

function SingleProduct() {
  const product = useSelector((state) => state.product);
  //   console.log(product.products);
  const singleProduct =
    product.products.products && product.products.products.length > 0 ? (
      product.products.products.map((prod, index) => {
        return (
          <div className="col-md-3" key={index}>
            <div className="card mb-3">
              <div className="card-body">
                <Link to={"/products/" + prod.id}>
                  <img
                    src={"http://localhost:5000/" + prod.imageUrl}
                    width="100%"
                    height="100%"
                  />
                </Link>
                <Link to={"/products/" + prod.id}>
                  <h5 className="card-title mt-2">{prod.title}</h5>
                </Link>
                <p className="card-text text-primary">
                  <strong>&#8377;{prod.price}</strong>
                </p>
                <div class="d-grid gap-0">
                  <Link
                    class="btn  btn-primary"
                    type="button"
                    to={"/products/" + prod.id}
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })
    ) : (
      <div>....Loading</div>
    );
  return <div className="row mt-3">{singleProduct}</div>;
}

export default SingleProduct;
