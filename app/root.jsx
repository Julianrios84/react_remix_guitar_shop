import {
  Meta,
  Links,
  Outlet,
  Scripts,
  LiveReload,
  useCatch,
  Link
} from '@remix-run/react';

import styles from '~/styles/index.css';
import Header from '~/components/header';
import Footer from '~/components/footer';
import { useEffect, useState } from 'react';

export function meta() {
  return {
    charset: 'utf-8',
    title: 'GuitarLA - Remix',
    viewport: 'width=device-width,initial-scale=1'
  };
}

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: 'https://necolas.github.io/normalize.css/8.0.1/normalize.css'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'true'
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap'
    },
    {
      rel: 'stylesheet',
      href: styles
    }
  ];
}

export default function App() {
  const initialState = [];
  const [cart, setCart] = useState(initialState);

  useEffect(() => {
    const cartLocal = JSON.parse(localStorage.getItem('cart'));
    if (cartLocal) {
      setCart(cartLocal);
    }
  }, []);
  useEffect(() => {
    if (cart !== initialState) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  const addCart = (guitar) => {
    if (cart.some((guitarState) => guitarState.id === guitar.id)) {
      const updateCart = cart.map((guitarState) => {
        if (guitarState.id === guitar.id) {
          guitarState.quantity = guitar.quantity;
        }
        return guitarState;
      });
      setCart(updateCart);
    } else {
      setCart([...cart, guitar]);
    }
  };

  const handleUpdateGuitar = (guitar) => {
    const updateCart = cart.map((guitarState) => {
      if (guitarState.id === guitar.id) {
        guitarState.quantity = guitar.quantity;
      }
      return guitarState;
    });
    setCart(updateCart);
  };

  const handleRemoveGuitar = (id) => {
    const updateCart = cart.filter((guitarState) => guitarState.id !== id);
    setCart(updateCart);
  };

  return (
    <Document>
      <Outlet
        context={{ addCart, cart, handleUpdateGuitar, handleRemoveGuitar }}
      />
    </Document>
  );
}

function Document({ children }) {
  return (
    <html>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

/** Manejo de errores */
export function CatchBoundary() {
  const error = useCatch();
  return (
    <Document>
      <div>
        <p className="error">
          {error.status} {error.statusText}
        </p>
        <Link className="error-link" to="/">
          You may want to return to the main page
        </Link>
      </div>
    </Document>
  );
}

export function ErrorBoundary({ error }) {
  return (
    <Document>
      <div>
        <p className="error">
          {error.status} {error.statusText}
        </p>
        <Link className="error-link" to="/">
          You may want to return to the main page
        </Link>
      </div>
    </Document>
  );
}
