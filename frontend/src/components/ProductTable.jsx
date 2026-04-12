function ProductTable({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return (
      <section className="data-surface">
        <h2>Listado de productos</h2>
        <p className="empty-copy">
          No hay productos registrados. Crea el primero desde el formulario.
        </p>
      </section>
    );
  }

  return (
    <section className="data-surface">
      <h2>Listado de productos</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td data-label="ID">{product.id}</td>
                <td data-label="Nombre">{product.name}</td>
                <td data-label="Descripción">{product.description || "-"}</td>
                <td data-label="Precio">${Number(product.price).toFixed(2)}</td>
                <td data-label="Stock">{product.stock}</td>
                <td data-label="Estado">
                  <span
                    className={`status-pill ${product.active ? "active" : "inactive"}`}
                  >
                    {product.active ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td className="table-actions">
                  <button
                    type="button"
                    className="button-primary"
                    onClick={() => onEdit(product)}
                    aria-label={`Editar producto ${product.name}`}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className="button-danger"
                    onClick={() => onDelete(product)}
                    aria-label={`Eliminar producto ${product.name}`}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ProductTable;
