import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { UserProvider } from "./UserContext";

import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import Page404 from "./pages/Page404";
import EditProduct from "./pages/EditProduct";
import AddProduct from "./pages/AddProduct";

import "./App.css";
import { uuid } from "./utils/uuid";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import MainNav from "./components/MainNav";

function App() {
  const [user, setUser] = useState({
    firstName: "",
    id: null,
    isAdmin: false,
    cart: [],
  });
  const [cart, setCart] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  const unsetUser = () => {
    localStorage.clear();
    setUser({
      firstName: "",
      id: null,
      isAdmin: null,
    });
  };

  const authtdUserRoute = () => {
    if (isAuthenticated) {
      if (user.isAdmin) {
        return [
          <Route key={uuid(5)} exact path="/dashboard" component={Dashboard} />,
          <Route key={uuid(5)} exact path="/products/:productId" component={EditProduct} />,
          <Route key={uuid(5)} exact path="/addProduct" component={AddProduct} />,
          <Route key={uuid(5)} exact path="/orders" component={Orders} />,
        ];
      } else {
        return [
          <Route key={uuid(5)} exact path="/cart" component={Cart} />,
          <Route key={uuid(5)} exact path="/profile" component={Profile} />,
          <Route key={uuid(5)} exact path="/orders" component={Orders} />,
        ];
      }
    }

    return <Route component={Page404} />;
  };

  useEffect(() => {
    if (isMounted) {
      fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data._id) {
            setCart(JSON.parse(localStorage.getItem("cart")));
            setUser({
              firstName: data.firstName,
              id: data._id,
              isAdmin: data.isAdmin,
              cart: cart,
            });
            setIsAuthenticated(true);
          } else {
            setUser({
              firstName: "",
              id: null,
              isAdmin: null,
              cart: cart,
            });
          }
        });
    }

    return () => {
      setIsMounted(false);
    };
  }, [isMounted, cart, user.cart]);

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        {/* <NavBar /> */}
        <MainNav />
        <Switch>
          <Route key={uuid(5)} exact path="/" component={Home} />
          <Route key={uuid(5)} exact path="/home" component={Home} />
          <Route key={uuid(5)} exact path="/products" component={Products} />
          <Route key={uuid(5)} exact path="/login" component={Login} />
          <Route key={uuid(5)} exact path="/register" component={Register} />
          <Route key={uuid(5)} exact path="/forgot-password" component={ForgotPassword} />
          <Route key={uuid(5)} exact path="/products/:productId" component={ProductDetails} />
          {authtdUserRoute()}
          <Route component={Page404} />
        </Switch>
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;
