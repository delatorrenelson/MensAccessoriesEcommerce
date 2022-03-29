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

function App() {
  const [user, setUser] = useState({ id: null, isAdmin: null });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const unsetUser = () => {
    localStorage.clear();
    setUser({
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
            id: data._id,
            isAdmin: data.isAdmin,
          });
          setIsAuthenticated(true);
        } else {
          setUser({
            id: null,
            isAdmin: null,
          });
        }
      });
  });

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/products/:productId" component={ProductDetails} />
          <Route exact path="/products" component={Products} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />

          {isAuthenticated && !user.isAdmin ? ( // Registered only user routes
            <Route exact path="/cart" component={Cart} />
          ) : null}

          {isAuthenticated && user.isAdmin ? ( // Admin Only routes
            <>
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/orders" component={Orders} />
            </>
          ) : null}
          <Route component={Page404} />
        </Switch>
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;
