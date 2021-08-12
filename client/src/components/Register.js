import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setSignup, signupFail } from "../redux/actions/auth-actions";
import AuthService from "../services/auth-services";

function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      console.log(user);
      const response = await AuthService.signup(user);
      //const response = await axios.post("/tutorials");
      dispatch(setSignup(response.data));
      setUser({
        name: "",
        email: "",
        password: "",
      });
      alert("Registered Successfully");
      history.push("/login");
    } catch (error) {
      console.log(error);
      dispatch(signupFail());
    }
  };
  return (
    <div className="col-md-6 offset-md-3">
      <div className="card mb-3">
        <div className="card-body">
          <h3 className="card-header text-center">Register</h3>
          <form onSubmit={saveUser}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1" className="form-label mt-4">
                User Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter name"
                required
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </div>
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
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
