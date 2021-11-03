import { useState, useEffect } from "react";
import useFetch from "./useFetch.js";
import Product from "./Product.js";
import Loader from "./Loader.js";

export default function Products(props) {
  const [products, setProducts] = useState([]);
  const { get, loading } = useFetch("https://react-tutorial-demo.firebaseio.com/");
  const { cart, onProductAdd, onProductDelete } = props;

  useEffect(() => {
    get("supermarket.json")
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="products-layout">
      <h1>Products</h1>
      <p>Take a look at our products</p>
      {loading && <Loader />}
      <div className="products-grid">
        {
          products.map(product => {
            return <Product
              key={product.id}
              product={product}
              cart={cart}
              onProductAdd={onProductAdd}
              onProductDelete={onProductDelete}
            />
          })
        }
      </div>
    </div>
  );
}