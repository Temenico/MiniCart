function validateProductForm(formData) {
  const errors = {};

  if (!formData.name || formData.name.trim().length === 0) {
    errors.name = "El nombre es obligatorio.";
  }

  if (formData.price === "") {
    errors.price = "El precio es obligatorio.";
  } else if (Number(formData.price) < 0) {
    errors.price = "El precio debe ser mayor o igual a 0.";
  }

  if (formData.stock === "") {
    errors.stock = "El stock es obligatorio.";
  } else if (!Number.isInteger(Number(formData.stock))) {
    errors.stock = "El stock debe ser un número entero.";
  } else if (Number(formData.stock) < 0) {
    errors.stock = "El stock debe ser mayor o igual a 0.";
  }

  return errors;
}

export { validateProductForm };
