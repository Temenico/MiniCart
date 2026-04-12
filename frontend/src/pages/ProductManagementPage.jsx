import { useMemo, useState } from "react";
import FeedbackMessage from "../components/FeedbackMessage.jsx";
import ProductForm from "../components/ProductForm.jsx";
import ProductTable from "../components/ProductTable.jsx";
import useProducts from "../hooks/useProducts.js";
import "../styles/products.css";

function ProductManagementPage() {
  const { products, isLoading, addProduct, editProduct, removeProduct } =
    useProducts();
  const [feedback, setFeedback] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

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

  async function handleDelete(product) {
    const confirmed = window.confirm(
      `¿Seguro que deseas eliminar el producto "${product.name}"?`,
    );

    if (!confirmed) {
      return;
    }

    const result = await removeProduct(product.id);
    if (result.ok) {
      showFeedback("success", "Producto eliminado correctamente.");
      if (editingProduct?.id === product.id) {
        setEditingProduct(null);
      }
      return;
    }

    showFeedback("error", result.message);
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

      <FeedbackMessage feedback={feedback} onClose={() => setFeedback(null)} />

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
            onDelete={handleDelete}
          />
        )}
      </section>
    </main>
  );
}

export default ProductManagementPage;
