// const API_URL = "http://localhost:5000/api";
const API_URL="https://onefi-assignment-0hs3.onrender.com/api";

export async function getProducts() {
  const response = await fetch(
    `${API_URL}/products`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export async function getProduct(slug) {
  const response = await fetch(
    `${API_URL}/products/${slug}`
  );

  if (!response.ok) {
    throw new Error("Product not found");
  }

  return response.json();
}