import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setLogin, loginFail } from "../redux/actions/auth-actions";
import AuthService from "../services/auth-services";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      console.log(user);
      const response = await AuthService.login(user);
      //const response = await axios.post("/tutorials");
      console.log(response.data);
      dispatch(setLogin(response.data));
      const { token } = response.data;
      console.log(token);
      localStorage.setItem("token", token);
      
      setUser({
        email: "",
        password: "",
      });
      alert("Login Successfully");
      history.push("/products");
    } catch (error) {
      console.log(error);
      dispatch(loginFail());
    }
  };

  return (
    <div className="col-md-6 offset-md-3">
      <div className="card mb-3">
        <div className="card-body">
          <form onSubmit={loginUser}>
            <h3 className="card-header text-center">Login</h3>

            <div className="form-group">
              <label htmlFor="exampleInputEmail1" className="form-label mt-4">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                required
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="exampleInputPassword1"
                className="form-label mt-4"
              >
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                required
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>

            <div className="d-grid gap-0 mt-3">
              <button className="btn  btn-primary" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
