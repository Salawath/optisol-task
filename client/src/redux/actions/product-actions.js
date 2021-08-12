import { ActionTypes } from "../constants/product-action-types";

export const fetchProduct = (product) => {
  return {
    type: ActionTypes.PRODUCTS_FETCH,
    payload: product,
  };
};

export const fetchCart = (cart) => {
  return {
    type: ActionTypes.CART_FETCH,
    payload: cart,
  };
};
