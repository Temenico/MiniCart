import { useEffect, useMemo, useState } from "react";
import { formatCurrency } from "../models/cartModel.js";
import { validateQuantityValue } from "../utils/cartValidators.js";

function CartItemsTable({
  selectedCart,
  isLoading,
  isSubmitting,
  onUpdateQuantity,
  onRequestRemoveItem,
}) {
  const [draftQuantities, setDraftQuantities] = useState({});

  const items = useMemo(() => selectedCart?.items ?? [], [selectedCart?.items]);

  useEffect(() => {
    const nextDraft = {};
    for (const item of items) {
      nextDraft[item.id] = String(item.quantity);
    }
    setDraftQuantities(nextDraft);
  }, [items]);

  async function handleUpdate(item) {
    const rawValue = draftQuantities[item.id] ?? "";
    const quantityError = validateQuantityValue(rawValue);
    if (quantityError) {
      return;
    }

    const newQuantity = Number(rawValue);
    if (newQuantity === Number(item.quantity)) {
      return;
    }

    await onUpdateQuantity(item.id, newQuantity);
  }

  if (isLoading) {
    return (
      <section className="cart-data-surface">
        <h2>Detalle del carrito</h2>
        <p className="empty-copy">Cargando carrito...</p>
      </section>
    );
  }

  if (!selectedCart) {
    return (
      <section className="cart-data-surface">
        <h2>Detalle del carrito</h2>
        <p className="empty-copy">
          No hay carrito seleccionado. Crea uno para comenzar tu compra.
        </p>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="cart-data-surface">
        <h2>Detalle del carrito #{selectedCart.id}</h2>
        <p className="empty-copy">
          El carrito está vacío. Agrega productos desde el panel lateral.
        </p>
        <p className="cart-total-inline">
          Total: <strong>{formatCurrency(selectedCart.total)}</strong>
        </p>
      </section>
    );
  }

  return (
    <section className="cart-data-surface">
      <h2>Detalle del carrito #{selectedCart.id}</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio unitario</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td data-label="Producto">{item.productName}</td>
                <td data-label="Precio unitario">{formatCurrency(item.unitPrice)}</td>
                <td data-label="Cantidad">
                  <input
                    className="quantity-input"
                    type="number"
                    min="1"
                    step="1"
                    value={draftQuantities[item.id] ?? ""}
                    onChange={(event) =>
                      setDraftQuantities((previous) => ({
                        ...previous,
                        [item.id]: event.target.value,
                      }))
                    }
                  />
                </td>
                <td data-label="Subtotal">{formatCurrency(item.subtotal)}</td>
                <td className="table-actions">
                  <button
                    type="button"
                    className="button-primary"
                    onClick={() => handleUpdate(item)}
                    disabled={isSubmitting}
                  >
                    Actualizar
                  </button>
                  <button
                    type="button"
                    className="button-danger"
                    onClick={() => onRequestRemoveItem(item)}
                    disabled={isSubmitting}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="cart-total-inline">
        Total del carrito: <strong>{formatCurrency(selectedCart.total)}</strong>
      </p>
    </section>
  );
}

export default CartItemsTable;
