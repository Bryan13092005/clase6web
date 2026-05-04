function ProductoList({ productos, onEliminar }) {
  return (
    <div>
      {productos.map(producto => (
        <div key={producto.id}>
          <h3>{producto.nombre}</h3>
          <p>Categoría: {producto.categoria}</p>
          <p>Precio: ${producto.precio}</p>
          <p>Stock: {producto.stock}</p>
          <button onClick={() => onEliminar(producto.id)}>
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
}

export default ProductoList;