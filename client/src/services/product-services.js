import axios from "../axios";
const token = localStorage.getItem("token");
class ProductService {
  productsFetch() {
    return axios.get("/products");
  }

  singleproductFetch(data) {
    return axios.get(`/products/${data}`);
  }

  cartFetch() {
    return axios.get("/cart", {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  cartAdd(data) {
    return axios.post("/cart", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  cartRemove(data) {
    return axios.post("/cart-delete-item", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export default new ProductService();
