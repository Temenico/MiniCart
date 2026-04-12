function CartSelector({
  carts,
  selectedCartId,
  isSubmitting,
  onSelectCart,
  onCreateCart,
}) {
  return (
    <section className="cart-control-surface">
      <h2>Seleccionar carrito</h2>
      <div className="cart-control-grid">
        <label htmlFor="cart-selector">
          Carrito activo
          <select
            id="cart-selector"
            value={selectedCartId ?? ""}
            onChange={(event) => onSelectCart(event.target.value)}
          >
            <option value="" disabled>
              Selecciona un carrito
            </option>
            {carts.map((cart) => (
              <option key={cart.id} value={cart.id}>
                Carrito #{cart.id}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          className="button-secondary"
          onClick={onCreateCart}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Procesando..." : "Crear carrito"}
        </button>
      </div>
    </section>
  );
}

export default CartSelector;
