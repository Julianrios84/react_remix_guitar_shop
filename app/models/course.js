export async function getCourse() {
  const response = await fetch(
    `${process.env.API_URL}/course?populate=picture`
  );
  return await response.json();
}
