import { createContext, useState } from 'react';

const AppContext = createContext();

function AppProvider(props) {
  const [cart, setCart] = useState(() => {
    let products = [];

    try {
      products = JSON.parse(localStorage.getItem('products')) || [];
    } catch (err) {
      products = [];
    }

    return products;
  });

  function handleProductAdd(newProduct) {
    const existingProduct = cart.find(product => product.id === newProduct.id);

    if (!existingProduct) {
      setCart(
        [...cart, { ...newProduct, quantity: 1 }]
      )
    } else {
      setCart(
        cart.map(product => {
          if (product.id === newProduct.id) return { ...product, quantity: product.quantity + 1 };
          return product;
        })
      )
    }
  }

  function handleProductDelete(id) {
    setCart(
      cart.filter(product => product.id !== id)
    )
  }

  function getCartCount() {
    return cart.reduce((total, product) => total + product.quantity, 0);
  }

  function emptyCart() {
    setCart([]);
  }

  function getTotalPrice() {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
  }

  function getProductFromCart(product) {
    return cart.find(item => item.id === product.id);
  }

  const value = {
    cart,
    onProductAdd: handleProductAdd,
    onProductDelete: handleProductDelete,
    getCartCount,
    emptyCart,
    getTotalPrice,
    getProductFromCart
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
}

export { AppContext, AppProvider };