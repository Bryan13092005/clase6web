import { useState } from "react";

function ProductoForm({ onCrear }) {
  const [form, setForm] = useState({
    nombre: "",
    categoria: "",
    precio: "",
    stock: ""
  });

  const manejarCambio = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const manejarSubmit = (e) => {
    e.preventDefault();
    onCrear(form);
    setForm({ nombre: "", categoria: "", precio: "", stock: "" });
  };

  return (
    <form onSubmit={manejarSubmit}>
      <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={manejarCambio} />
      <input name="categoria" placeholder="Categoría" value={form.categoria} onChange={manejarCambio} />
      <input name="precio" placeholder="Precio" value={form.precio} onChange={manejarCambio} />
      <input name="stock" placeholder="Stock" value={form.stock} onChange={manejarCambio} />
      <button>Guardar</button>
    </form>
  );
}

export default ProductoForm;