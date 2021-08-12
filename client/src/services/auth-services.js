import axios from "../axios";

class AuthService {
  signup(data) {
    return axios.post("/auth/signup", data);
  }

  login(data) {
    return axios.post("/auth/login", data);
  }
}

export default new AuthService();
