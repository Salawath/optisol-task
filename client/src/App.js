// import logo from './logo.svg';
// import './App.css';
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Products from "./components/Products";
import Login from "./components/Login";
import Register from "./components/Register";
import ProductView from "./components/ProductView";
import Cart from "./components/Cart";

function App() {
  const auth = useSelector((state) => state.auth);
  console.log(auth);
  return (
    <>
      <Router>
        <Header />
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/products"]} component={Products} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route path="/products/:id" component={ProductView} />
            <Route path="/cart" component={Cart} />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
