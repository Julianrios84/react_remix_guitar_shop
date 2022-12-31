import { useLoaderData } from '@remix-run/react';
import { getGuitars } from '~/models/guitars';
import ListGuitars from '~/components/list-guitars';

export function meta() {
  return {
    title: 'Guitars - Shop',
    description: 'Guitars - Our guitar collection'
  };
}

export async function loader() {
  const guitars = await getGuitars();
  return guitars.data;
}

function Shop() {
  const guitars = useLoaderData();
  return <ListGuitars guitars={guitars} />;
}

export default Shop;
