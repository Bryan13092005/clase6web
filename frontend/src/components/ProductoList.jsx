import "./productoList.css";
function ProductoList({ productos, onEliminar }) {
  if (productos.length === 0) {
    return (
      <div className="empty-state">
        <div className="icon-box">📦</div>
        <p>No hay productos registrados aún.</p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="modern-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Estado Stock</th>
            <th className="text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id} className="table-row">
              <td>
                <div className="product-info">
                  <div className="product-avatar">{producto.nombre.charAt(0)}</div>
                  <span className="product-name">{producto.nombre}</span>
                </div>
              </td>
              <td>
                <span className="category-tag">{producto.categoria}</span>
              </td>
              <td className="price-cell">${Number(producto.precio).toLocaleString()}</td>
              <td>
                <div className={`stock-indicator ${producto.stock < 5 ? 'critical' : 'healthy'}`}>
                  <span className="dot"></span>
                  {producto.stock} unidades
                </div>
              </td>
              <td className="text-right">
                <button 
                  className="action-btn delete" 
                  onClick={() => onEliminar(producto.id)}
                >
                  <span className="icon">🗑️</span> Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductoList;
