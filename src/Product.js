import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "./AppContext";
import Button from "./Button";

export default function Product(props) {
  const { product } = props;
  const { onProductAdd, onProductDelete, getProductFromCart } = useContext(AppContext);
  const existingProduct = getProductFromCart(product);
  const quantity = existingProduct ? existingProduct.quantity : 0;

  return <div className="product">
    <div className="product-image-container">
      <NavLink to={`products/${product.id}`}>
        <img src={product.image} width="100" height="100" className="product-image" alt="product name here"
        />
      </NavLink>
      <div className="product-quantity-container">
        {quantity !== 0 && <div className="product-quantity">{quantity}</div>}
      </div>
    </div>
    <div className="product-info">
      <h3>{product.name}</h3>
      <p>{product.description}</p>
    </div>
    <div className="product-checkout">
      <div>
        {quantity !== 0 && <Button
          className="product-delete"
          outline={true}
          onClick={() => onProductDelete(product.id)}
        >
          x
        </Button>}
      </div>
      <Button
        outline={true}
        onClick={() => onProductAdd(product)}
      >
        ${product.price}
      </Button>
    </div>
  </div>;
}