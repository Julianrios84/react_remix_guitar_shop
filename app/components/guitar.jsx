import { Link } from '@remix-run/react';
export default function Guitar({ guitar }) {
  const { description, picture, price, url, name } = guitar;

  return (
    <div className="guitars">
      <img
        src={picture.data.attributes.formats.medium.url}
        alt={`Image guitars ${name}`}
      />
      <div className="content">
        <h3>{name}</h3>
        <p className="description">{description}</p>
        <p className="price">${price}</p>

        <Link className="link" to={`/guitars/${url}`}>
          View Product
        </Link>
      </div>
    </div>
  );
}
