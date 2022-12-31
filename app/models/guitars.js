export async function getGuitars() {
  const response = await fetch(
    `${process.env.API_URL}/guitars?populate=picture`
  );
  return await response.json();
}

export async function getGuitar(url) {
  const respuesta = await fetch(
    `${process.env.API_URL}/guitars?filters[url]=${url}&populate=picture`
  );
  return await respuesta.json();
}
