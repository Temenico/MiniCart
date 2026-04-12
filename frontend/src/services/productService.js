import { request } from "./httpClient.js";

function listProducts() {
  return request("/products");
}

function createProduct(payload) {
  return request("/products", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

function updateProduct(id, payload) {
  return request(`/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

function deleteProduct(id) {
  return request(`/products/${id}`, {
    method: "DELETE",
  });
}

export { createProduct, deleteProduct, listProducts, updateProduct };
