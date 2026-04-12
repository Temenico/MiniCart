import { useEffect, useMemo, useState } from "react";
import AddCartItemForm from "../components/AddCartItemForm.jsx";
import CartItemsTable from "../components/CartItemsTable.jsx";
import CartSelector from "../components/CartSelector.jsx";
import ConfirmDialog from "../components/ConfirmDialog.jsx";
import FeedbackMessage from "../components/FeedbackMessage.jsx";
import { formatCurrency } from "../models/cartModel.js";
import useCartManagement from "../hooks/useCartManagement.js";
import "../styles/carts.css";

function CartManagementPage({ onGoToProducts }) {
  const {
    products,
    carts,
    selectedCartId,
    selectedCart,
    isLoading,
    isSubmitting,
    activeCartItemsCount,
    chooseCart,
    createNewCart,
    addItemToCart,
    updateItemQuantity,
    removeItemFromCart,
  } = useCartManagement();
  const [feedback, setFeedback] = useState(null);
  const [itemPendingDeletion, setItemPendingDeletion] = useState(null);

  const selectedTotal = useMemo(
    () => formatCurrency(selectedCart?.total ?? 0),
    [selectedCart?.total],
  );

  function showFeedback(type, text) {
    setFeedback({ type, text });
  }

  useEffect(() => {
    if (!feedback) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setFeedback(null);
    }, 3200);

    return () => window.clearTimeout(timeoutId);
  }, [feedback]);

  async function handleCreateCart() {
    const result = await createNewCart();
    if (result.ok) {
      showFeedback("success", `Carrito #${result.data.id} creado correctamente.`);
      return;
    }

    showFeedback("error", result.message);
  }

  async function handleSelectCart(nextCartId) {
    const result = await chooseCart(nextCartId);
    if (!result.ok) {
      showFeedback("error", result.message);
    }
  }

  async function handleAddItem(payload) {
    const result = await addItemToCart(payload);
    if (result.ok) {
      showFeedback("success", "Producto agregado al carrito.");
      return result;
    }

    showFeedback("error", result.message);
    return result;
  }

  async function handleUpdateItem(itemId, quantity) {
    const result = await updateItemQuantity(itemId, quantity);
    if (result.ok) {
      showFeedback("success", "Cantidad actualizada correctamente.");
      return;
    }

    showFeedback("error", result.message);
  }

  async function handleRemoveItemConfirmed() {
    if (!itemPendingDeletion) {
      return;
    }

    const itemId = itemPendingDeletion.id;
    const result = await removeItemFromCart(itemId);
    if (result.ok) {
      showFeedback("success", "Producto eliminado del carrito.");
      setItemPendingDeletion(null);
      return;
    }

    showFeedback("error", result.message);
    setItemPendingDeletion(null);
  }

  return (
    <main className="cart-page">
      <section className="cart-hero-band">
        <div className="cart-hero-content">
          <p className="cart-hero-kicker">
            <img src="/minicart-icon.svg" alt="" aria-hidden="true" />
            MiniCart
          </p>
          <h1>Carrito de compras</h1>
          <p>Agrega productos, ajusta cantidades y revisa el total en tiempo real.</p>
          <button type="button" className="button-secondary" onClick={onGoToProducts}>
            Ir a productos
          </button>
        </div>
        <div className="cart-hero-metrics" aria-label="Resumen del carrito">
          <div>
            <span>Carritos</span>
            <strong>{carts.length}</strong>
          </div>
          <div>
            <span>Ítems</span>
            <strong>{activeCartItemsCount}</strong>
          </div>
          <div>
            <span>Total</span>
            <strong>{selectedTotal}</strong>
          </div>
        </div>
      </section>

      <FeedbackMessage feedback={feedback} />

      <section className="cart-workspace-grid">
        <aside className="cart-sidebar">
          <CartSelector
            carts={carts}
            selectedCartId={selectedCartId}
            isSubmitting={isSubmitting}
            onSelectCart={handleSelectCart}
            onCreateCart={handleCreateCart}
          />
          <AddCartItemForm
            products={products}
            selectedCartId={selectedCartId}
            isSubmitting={isSubmitting}
            onAddItem={handleAddItem}
          />
        </aside>
        <CartItemsTable
          selectedCart={selectedCart}
          isLoading={isLoading}
          isSubmitting={isSubmitting}
          onUpdateQuantity={handleUpdateItem}
          onRequestRemoveItem={setItemPendingDeletion}
        />
      </section>

      <ConfirmDialog
        isOpen={Boolean(itemPendingDeletion)}
        title="Confirmar eliminación"
        description={
          itemPendingDeletion
            ? `¿Deseas eliminar "${itemPendingDeletion.productName}" del carrito?`
            : ""
        }
        confirmLabel="Eliminar ítem"
        onConfirm={handleRemoveItemConfirmed}
        onCancel={() => setItemPendingDeletion(null)}
      />
    </main>
  );
}

export default CartManagementPage;
