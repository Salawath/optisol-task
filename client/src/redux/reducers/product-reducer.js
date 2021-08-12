import { ActionTypes } from "../constants/product-action-types";

const initialState = {
    products:[],
    cart:[]
};

export const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.PRODUCTS_FETCH:
      return {
        ...state,
        products: payload,
      };

    case ActionTypes.CART_FETCH:
      return {
        ...state,
        cart: payload,
      };
    default:
      return state;
  }
};
