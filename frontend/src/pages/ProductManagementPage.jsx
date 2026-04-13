import { useEffect, useMemo, useState } from "react";
import ConfirmDialog from "../components/ConfirmDialog.jsx";
import FeedbackMessage from "../components/FeedbackMessage.jsx";
import ProductForm from "../components/ProductForm.jsx";
import ProductTable from "../components/ProductTable.jsx";
import useProducts from "../hooks/useProducts.js";
import "../styles/products.css";

function ProductManagementPage({ onGoToCart }) {
  const { products, isLoading, addProduct, editProduct, removeProduct } =
    useProducts();
  const [feedback, setFeedback] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productPendingDeletion, setProductPendingDeletion] = useState(null);

  const sortedProducts = useMemo(
    () => [...products].sort((left, right) => left.id - right.id),
    [products],
  );
  const activeProducts = useMemo(
    () => sortedProducts.filter((product) => product.active).length,
    [sortedProducts],
  );
  const inactiveProducts = sortedProducts.length - activeProducts;

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

  async function handleCreate(payload) {
    setIsSubmitting(true);
    const result = await addProduct(payload);
    setIsSubmitting(false);

    if (result.ok) {
      showFeedback("success", "Producto creado correctamente.");
      return result;
    }

    showFeedback("error", result.message);
    return result;
  }

  async function handleUpdate(productId, payload) {
    setIsSubmitting(true);
    const result = await editProduct(productId, payload);
    setIsSubmitting(false);

    if (result.ok) {
      showFeedback("success", "Producto actualizado correctamente.");
      setEditingProduct(null);
      return;
    }

    showFeedback("error", result.message);
  }

  async function handleDeleteConfirmed() {
    if (!productPendingDeletion) {
      return;
    }

    const result = await removeProduct(productPendingDeletion.id);
    if (result.ok) {
      showFeedback("success", "Producto eliminado correctamente.");
      if (editingProduct?.id === productPendingDeletion.id) {
        setEditingProduct(null);
      }
      setProductPendingDeletion(null);
      return;
    }

    showFeedback("error", result.message);
    setProductPendingDeletion(null);
  }

  return (
    <main className="products-page">
      <section className="hero-band">
        <div className="hero-content">
          <p className="hero-kicker">
            <img src="/minicart-icon.svg" alt="" aria-hidden="true" />
            MiniCart
          </p>
          <h1>Gestión de productos</h1>
          <p>
            Crea, actualiza y mantiene tu inventario visible para la tienda.
          </p>
          <button type="button" className="button-secondary" onClick={onGoToCart}>
            Ir al carrito
          </button>
        </div>
        <div className="hero-metrics" aria-label="Resumen de catálogo">
          <div>
            <span>Total</span>
            <strong>{sortedProducts.length}</strong>
          </div>
          <div>
            <span>Activos</span>
            <strong>{activeProducts}</strong>
          </div>
          <div>
            <span>Inactivos</span>
            <strong>{inactiveProducts}</strong>
          </div>
        </div>
      </section>

      <FeedbackMessage feedback={feedback} />

      <section className="workspace-grid">
        <ProductForm
          editingProduct={editingProduct}
          isSubmitting={isSubmitting}
          onSubmitCreate={handleCreate}
          onSubmitUpdate={handleUpdate}
          onCancelEdit={() => setEditingProduct(null)}
        />

        {isLoading ? (
          <section className="data-surface">
            <h2>Listado de productos</h2>
            <div
              className="loading-skeleton"
              role="status"
              aria-live="polite"
              aria-label="Cargando productos"
            >
              <span />
              <span />
              <span />
              <span />
            </div>
          </section>
        ) : (
          <ProductTable
            products={sortedProducts}
            onEdit={setEditingProduct}
            onDelete={setProductPendingDeletion}
          />
        )}
      </section>

      <ConfirmDialog
        isOpen={Boolean(productPendingDeletion)}
        title="Confirmar eliminación"
        description={
          productPendingDeletion
            ? `¿Deseas eliminar el producto "${productPendingDeletion.name}"?`
            : ""
        }
        confirmLabel="Eliminar producto"
        onConfirm={handleDeleteConfirmed}
        onCancel={() => setProductPendingDeletion(null)}
      />
    </main>
  );
}

export default ProductManagementPage;
