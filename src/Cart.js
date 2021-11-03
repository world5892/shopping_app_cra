import { useState, useEffect, useContext } from 'react';
import Input from './Input.js';
import Button from './Button.js';
import { AppContext } from './AppContext.js';

export default function Cart() {
  const [email, setEmail] = useState('');
  const [paid, setPaid] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const { cart, emptyCart, getTotalPrice } = useContext(AppContext);
  const totalPrice = getTotalPrice();

  function handleFormSubmit(e) {
    e.preventDefault();

    emptyCart();
    setEmail('');
    setPaid(true);
    setSeconds(10);
  }

  useEffect(() => {
    if (paid) {
      if (seconds > 0) {
        const warningTimer = setTimeout(() => {
          setSeconds(prevState => prevState - 1);
        }, 1000);

        return () => {
          clearTimeout(warningTimer);
        }
      } else setPaid(false);
    }
  }, [seconds]);

  return (
    <div className="cart-layout">
      {!paid && <div>
        <h1>Your Cart</h1>
        {cart.length === 0 && <p>You have not added any product to your cart yet.</p>}
      </div>}
      {cart.length > 0 &&
        <table className="table table-cart">
          <thead>
            <tr>
              <th width="25%" className="th-product">Product</th>
              <th width="20%">Unit price</th>
              <th width="10%">Quanity</th>
              <th width="25%">Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(product => {
              return <tr key={product.id}>
                <td>
                  <img src={product.image} width="30" height="30" alt="" />
                  {product.name}
                </td>
                <td>${product.price}</td>
                <td>{product.quantity}</td>
                <td>
                  <strong>${product.price * product.quantity}</strong>
                </td>
              </tr>
            })
            }
          </tbody>
          <tfoot>
            <tr>
              <th colSpan="2"></th>
              <th className="cart-highlight">Total</th>
              <th className="cart-highlight">${totalPrice}</th>
            </tr>
          </tfoot>
        </table>
      }
      {cart.length > 0 &&
        <form className="pay-form" onSubmit={handleFormSubmit}>
          <p>
            Enter your email and then click on pay and your products will be
            delivered to you on the same day!
          </p>
          <Input
            placeholder="Email"
            type="email"
            value={email}
            required={true}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit">Pay</Button>
        </form>
      }
      {seconds > 0 &&
        <>
          <p className="p-paid">Thank you for shopping in our store! Your payment has been accepted. We have sent you an email with the details of your order.</p>
          <p className="p-warning">This message will disappear in {seconds} sec(s)...</p>
        </>
      }
    </div>
  );
}