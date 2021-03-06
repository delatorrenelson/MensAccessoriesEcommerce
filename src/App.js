import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Products from "./pages/Products";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { UserProvider } from "./UserContext";
import Home from "./pages/Home";
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

function App() {
  const [user, setUser] = useState({firstName: "", id: null, isAdmin: null });
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

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data._id !== "undefined") {
          setUser({
            firstName: data.firstName,
            id: data._id,
            isAdmin: data.isAdmin,
          });
          setIsAuthenticated(true);
        } else {
          setUser({
            firstName: "",
            id: null,
            isAdmin: null,
          });
        }
      });
    if (isMounted) {}

    return () => {
      setIsMounted(false);
    };
  });

  const authtdUserRoute = () => {
    if (isAuthenticated) {
      
      if (user.isAdmin) {
        return [
          <Route key={""} exact path="/dashboard" component={Dashboard} />,
          <Route
            key={""}
            exact
            path="/products/:productId"
            component={EditProduct}
          />,
          <Route key={""} exact path="/addProduct" component={AddProduct} />,
          <Route exact path="/orders" component={Orders} />
        ];
      } else {
        return [
          <Route key={""} exact path="/cart" component={Cart} />,
          <Route
            key={""}
            exact
            path="/products/:productId"
            component={ProductDetails}
          />,
          <Route exact path="/orders" component={Orders} />
        ];
      }
    }

    return <Route key={""} component={Page404} />;
  };

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />

          <Route exact path="/products" component={Products} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          

          {authtdUserRoute()}

          {/* {isAuthenticated ? (
            user.isAdmin ? (
              <Route exact path="/dashboard" component={Dashboard} />
            ) : (
              <Route exact path="/cart" component={Cart} />
            )
          ) : (
            <Route component={Page404} />
          )} */}

          <Route component={Page404} />
        </Switch>
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;
