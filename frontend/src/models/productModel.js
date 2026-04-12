const emptyProductForm = {
  name: "",
  description: "",
  price: "",
  stock: "",
  active: true,
};

function toProductPayload(formData) {
  return {
    name: formData.name.trim(),
    description: formData.description.trim(),
    price: Number(formData.price),
    stock: Number(formData.stock),
    active: Boolean(formData.active),
  };
}

function toProductFormData(product) {
  return {
    name: product.name ?? "",
    description: product.description ?? "",
    price: String(product.price ?? ""),
    stock: String(product.stock ?? ""),
    active: product.active ?? true,
  };
}

export { emptyProductForm, toProductFormData, toProductPayload };
