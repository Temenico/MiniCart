import { request } from "./httpClient.js";

function listCarts() {
  return request("/carts");
}

function createCart() {
  return request("/carts", {
    method: "POST",
  });
}

function findCartById(cartId) {
  return request(`/carts/${cartId}`);
}

function addCartItem(cartId, payload) {
  return request(`/carts/${cartId}/items`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

function updateCartItemQuantity(cartId, itemId, payload) {
  return request(`/carts/${cartId}/items/${itemId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

function deleteCartItem(cartId, itemId) {
  return request(`/carts/${cartId}/items/${itemId}`, {
    method: "DELETE",
  });
}

export {
  addCartItem,
  createCart,
  deleteCartItem,
  findCartById,
  listCarts,
  updateCartItemQuantity,
};
