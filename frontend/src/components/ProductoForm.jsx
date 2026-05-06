import { useState } from "react";
import "./productoForm.css";

function ProductoForm({ onCrear }) {
  const [form, setForm] = useState({
    nombre: "",
    categoria: "",
    precio: "",
    stock: 0 // Empezamos en 0
  });

  const manejarCambio = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Función para los botones + y -
  const ajustarStock = (cantidad) => {
    setForm({
      ...form,
      stock: Math.max(0, parseInt(form.stock || 0) + cantidad)
    });
  };

  const manejarSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.categoria || form.precio === "" || form.stock === "") {
      alert("Todos los campos son obligatorios");
      return;
    }
    onCrear(form);
    setForm({ nombre: "", categoria: "", precio: "", stock: 0 });
  };

    return (
    <form className="producto-form" onSubmit={manejarSubmit}>
      <div className="form-group">
        <label>Nombre del Producto</label>
        <input 
          name="nombre" 
          placeholder="Ej: Laptop Pro" 
          value={form.nombre} 
          onChange={manejarCambio} 
        />
      </div>

      <div className="form-group">
        <label>Categoría</label>
        <input 
          name="categoria" 
          placeholder="Ej: Electrónica" 
          value={form.categoria} 
          onChange={manejarCambio} 
        />
      </div>

      <div className="form-group">
        <label>Precio</label>
        <input 
          type="number"
          name="precio" 
          placeholder="0.00" 
          value={form.precio} 
          onChange={manejarCambio} 
        />
      </div>

      <div className="form-group">
        <label>Stock Disponible</label>
        <input 
          type="number"
          name="stock" 
          className="input-stock"
          placeholder="Cantidad en unidades" 
          value={form.stock} 
          onChange={manejarCambio} 
        />
      </div>

      <button className="btn-save" type="submit">
        Añadir al Inventario
      </button>
    </form>
  );

}

export default ProductoForm;
