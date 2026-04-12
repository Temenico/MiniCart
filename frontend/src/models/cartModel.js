import { formatCopCurrency } from "../utils/currency.js";

const emptyAddItemForm = {
  productId: "",
  quantity: "1",
};

function toAddItemPayload(formData) {
  return {
    productId: Number(formData.productId),
    quantity: Number(formData.quantity),
  };
}

function formatCurrency(value) {
  return formatCopCurrency(value);
}

export { emptyAddItemForm, formatCurrency, toAddItemPayload };
