import { useMemo, useState } from "react";
import { emptyAddItemForm, toAddItemPayload } from "../models/cartModel.js";
import { validateAddItemForm } from "../utils/cartValidators.js";

function AddCartItemForm({
  products,
  selectedCartId,
  isSubmitting,
  onAddItem,
}) {
  const [formData, setFormData] = useState(emptyAddItemForm);
  const [errors, setErrors] = useState({});

  const availableProducts = useMemo(
    () => products.filter((product) => Number(product.stock) > 0),
    [products],
  );

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateAddItemForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const result = await onAddItem(toAddItemPayload(formData));
    if (result?.ok) {
      setFormData(emptyAddItemForm);
      setErrors({});
    }
  }

  return (
    <section className="cart-control-surface">
      <h2>Agregar producto al carrito</h2>
      <form className="cart-item-form" onSubmit={handleSubmit}>
        <label htmlFor="productId">
          Producto
          <select
            id="productId"
            name="productId"
            value={formData.productId}
            onChange={handleChange}
            disabled={!selectedCartId}
          >
            <option value="">Selecciona un producto</option>
            {availableProducts.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} ({product.stock} disponibles)
              </option>
            ))}
          </select>
          {errors.productId && <small>{errors.productId}</small>}
        </label>

        <label htmlFor="quantity">
          Cantidad
          <input
            id="quantity"
            name="quantity"
            type="number"
            min="1"
            step="1"
            value={formData.quantity}
            onChange={handleChange}
            disabled={!selectedCartId}
          />
          {errors.quantity && <small>{errors.quantity}</small>}
        </label>

        <button
          type="submit"
          className="button-primary"
          disabled={!selectedCartId || isSubmitting}
        >
          {isSubmitting ? "Agregando..." : "Agregar al carrito"}
        </button>
      </form>
    </section>
  );
}

export default AddCartItemForm;
