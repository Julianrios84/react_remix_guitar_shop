import { useLoaderData, useOutletContext } from '@remix-run/react';
import { useState } from 'react';
import { getGuitar } from '~/models/guitars';

export async function loader({ params }) {
  const { guitarUrl } = params;
  const guitar = await getGuitar(guitarUrl);

  if (guitar.data.length === 0) {
    throw new Response('', {
      status: 404,
      statusText: 'Guitar not found.'
    });
  }
  return guitar;
}

export function meta({ data }) {
  if (!data) {
    return {
      title: 'Guitars - Guitar not found',
      description: `Guitars, guitars for sale, guitar not found`
    };
  }
  return {
    title: `Guitars - ${data?.data[0]?.attributes.nombre}`,
    description: `Guitars, guitars for sale, guitar ${data.data[0].attributes.nombre}`
  };
}

function Guitar() {
  const { addCart } = useOutletContext();
  const [quantity, setQuantity] = useState(0);

  const guitar = useLoaderData();
  const { name, description, picture, price } = guitar.data[0].attributes;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (quantity < 0) {
      alert('Choose one quantity');
      return;
    }

    const guitarSelected = {
      id: guitar.data[0].id,
      picture: picture.data.attributes.url,
      name,
      price,
      quantity
    };

    addCart(guitarSelected);
  };

  return (
    <div className="guitar">
      <img
        className="image"
        src={picture.data.attributes.url}
        alt={`Guitar image ${name}`}
      />

      <div className="content">
        <h3>{name}</h3>
        <p className="text">{description}</p>
        <p className="price">${price}</p>

        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="quantity">Quantity</label>
          <select
            id="quantity"
            onChange={(e) => setQuantity(parseFloat(e.target.value))}
          >
            <option value="0">-- Choose --</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

          <input type="submit" value="Add cart" />
        </form>
      </div>
    </div>
  );
}

export default Guitar;
