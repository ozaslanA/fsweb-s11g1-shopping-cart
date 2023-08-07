import React, { useState } from "react";
import { Route } from "react-router-dom";
import { data } from "./data";
import { ProductContext } from "./contexts/ProductContext";
import { CartContext } from "./contexts/CartContext";

// Bileşenler
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";

function App() {
  const [products, setProducts] = useState(data);
  const [cart, setCart] = useState(initialStateOku("cart"));

  function cartLocalStorageYaz(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  function cartLocalStorageOku(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  function initialStateOku(key) {
    const initialCart = cartLocalStorageOku(key);
    if (initialCart) {
      return initialCart;
    } else {
      return [];
    }
  }
  const addItem = (item) => {
    // verilen itemi sepete ekleyin
    const newCart = [...cart, item];
    setCart(newCart);
    //console.log("item", item);
    cartLocalStorageYaz(newCart);
  };

  const removeItem = (item) => {
    const removeCart = [...cart.filter((i) => i.id !== item.id)];
    setCart(removeCart);
    cartLocalStorageYaz(removeCart);
  };

  return (
    <div className="App">
      <ProductContext.Provider value={{ products, addItem }}>
        <CartContext.Provider value={{ cart, removeItem }}>
          <Navigation />

          {/* Routelar */}
          <main className="content">
            <Route exact path="/">
              <Products />
            </Route>

            <Route path="/cart">
              <ShoppingCart />
            </Route>
          </main>
        </CartContext.Provider>
      </ProductContext.Provider>
    </div>
  );
}

export default App;
