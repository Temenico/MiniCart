function validateAddItemForm(formData) {
  const errors = {};

  const productId = Number(formData.productId);
  if (!formData.productId || Number.isNaN(productId) || productId <= 0) {
    errors.productId = "Debes seleccionar un producto válido.";
  }

  const quantity = Number(formData.quantity);
  if (!formData.quantity || Number.isNaN(quantity)) {
    errors.quantity = "La cantidad es obligatoria.";
  } else if (!Number.isInteger(quantity) || quantity < 1) {
    errors.quantity = "La cantidad debe ser un número entero mayor o igual a 1.";
  }

  return errors;
}

function validateQuantityValue(quantity) {
  const parsed = Number(quantity);
  if (Number.isNaN(parsed) || !Number.isInteger(parsed) || parsed < 1) {
    return "La cantidad debe ser un número entero mayor o igual a 1.";
  }

  return null;
}

export { validateAddItemForm, validateQuantityValue };
