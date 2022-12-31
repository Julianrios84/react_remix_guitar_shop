import { useOutletContext } from '@remix-run/react';
import { useEffect, useState } from 'react';
import styles from '~/styles/cart.css';
import { ClientOnly } from 'remix-utils';

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: styles
    }
  ];
}

export function meta() {
  return {
    title: 'Guitar - Shopping cart',
    description: 'Sale of guitars, music, blog, shopping cart, store'
  };
}

const Cart = () => {
  const [total, setTotal] = useState(0);
  const { cart, handleUpdateGuitar, handleRemoveGuitar } = useOutletContext();

  useEffect(() => {
    const calculateTotal = cart.reduce(
      (total, product) => total + product.quantity * product.price,
      0
    );
    setTotal(calculateTotal);
  }, [cart]);

  return (
    <ClientOnly fallback={'Loading...'}>
      {() => (
        <main className="container">
          <h1 className="heading">Shopping cart</h1>
          <div className="content">
            <div className="cart">
              <h2>Articles</h2>
              {cart?.length === 0
                ? 'Cart empty'
                : cart?.map((item) => (
                    <div key={item.id} className="product">
                      <div>
                        <img
                          src={item.picture}
                          alt={`Image product ${item.name}`}
                        />
                      </div>
                      <div>
                        <p className="name">{item.name}</p>
                        <p>Quantity: </p>
                        <select
                          defaultValue={item.quantity}
                          className="select"
                          onChange={(e) =>
                            handleUpdateGuitar({
                              quantity: parseFloat(e.target.value),
                              id: item.id
                            })
                          }
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                        <p className="price">
                          $ <span>{item.price}</span>
                        </p>
                        <p className="subtotal">
                          Subtotal: $ <span>{item.quantity * item.price}</span>
                        </p>
                      </div>
                      <button
                        type="button"
                        className="btnRemove"
                        onClick={() => handleRemoveGuitar(item.id)}
                      >
                        X
                      </button>
                    </div>
                  ))}
            </div>
            <aside className="resume">
              <h3>Order resume</h3>
              <p>Total payment: ${total}</p>
            </aside>
          </div>
        </main>
      )}
    </ClientOnly>
  );
};

export default Cart;
