import { useEffect, useState } from "react";
import {
  emptyProductForm,
  toProductFormData,
  toProductPayload,
} from "../models/productModel.js";
import { validateProductForm } from "../utils/productValidators.js";

function ProductForm({
  editingProduct,
  isSubmitting,
  onSubmitCreate,
  onSubmitUpdate,
  onCancelEdit,
}) {
  const [formData, setFormData] = useState(emptyProductForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingProduct) {
      setFormData(toProductFormData(editingProduct));
      setErrors({});
      return;
    }

    setFormData(emptyProductForm);
    setErrors({});
  }, [editingProduct]);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validateProductForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const payload = toProductPayload(formData);

    if (editingProduct) {
      await onSubmitUpdate(editingProduct.id, payload);
      return;
    }

    const result = await onSubmitCreate(payload);
    if (result?.ok) {
      setFormData(emptyProductForm);
    }
  }

  const buttonLabel = editingProduct ? "Guardar cambios" : "Crear producto";
  const title = editingProduct ? "Editar producto" : "Crear producto";

  return (
    <section className="form-surface">
      <div className="form-heading">
        <h2>{title}</h2>
      </div>
      <form className="product-form" onSubmit={handleSubmit}>
        <label htmlFor="name">
          Nombre
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            maxLength={120}
          />
          {errors.name && <small>{errors.name}</small>}
        </label>

        <label htmlFor="description">
          Descripción
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            maxLength={500}
            rows={2}
          />
          {errors.description && <small>{errors.description}</small>}
        </label>

        <div className="row-fields">
          <label htmlFor="price">
            Precio
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
            />
            {errors.price && <small>{errors.price}</small>}
          </label>

          <label htmlFor="stock">
            Stock
            <input
              id="stock"
              name="stock"
              type="number"
              min="0"
              step="1"
              value={formData.stock}
              onChange={handleChange}
            />
            {errors.stock && <small>{errors.stock}</small>}
          </label>
        </div>

        <label className="checkbox-field" htmlFor="active">
          <input
            id="active"
            name="active"
            type="checkbox"
            checked={formData.active}
            onChange={handleChange}
          />
          Producto activo
        </label>

        <div className="form-actions">
          <button type="submit" className="button-primary" disabled={isSubmitting}>
            {isSubmitting ? "Procesando..." : buttonLabel}
          </button>
          {editingProduct && (
            <button
              type="button"
              className="button-secondary"
              onClick={onCancelEdit}
              aria-label="Cancelar edición de producto"
            >
              Cancelar edición
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default ProductForm;
