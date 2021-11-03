import { useEffect, useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./Navbar.js";
import Home from "./Home.js";
import About from "./About.js";
import Products from "./Products.js";
import Cart from "./Cart.js";
import ProductDetails from "./ProductDetails.js";
import { AppContext, AppProvider } from './AppContext.js';

function App() {
  const { cart } = useContext(AppContext);

  useEffect(() => {
    if (cart) localStorage.setItem('products', JSON.stringify(cart));
  }, [cart]);

  return (<>
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/products">
            <Products />
          </Route>
          <Route exact path="/cart">
            <Cart cart={cart} />
          </Route>
          <Route path="/products/:id">
            <ProductDetails />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  </>);
}

function AppWrapper() {
  return <AppProvider>
    <App />
  </AppProvider>
}

export default AppWrapper;
