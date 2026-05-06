import { useEffect, useState } from "react";
import ProductoForm from "./ProductoForm";
import ProductoList from "./ProductoList";
import "./productoPrincipal.css";
import {
  obtenerProductos,
  crearProducto,
  eliminarProducto
} from "../services/productoService.js";

function ProductoPrincipal() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);

  const cargarProductos = async () => {
    setLoading(true);
    const data = await obtenerProductos();
    setProductos(data);
    setLoading(false);
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const manejarCrear = async (producto) => {
    await crearProducto(producto);
    cargarProductos();
  };

  const manejarEliminar = async (id) => {
    await eliminarProducto(id);
    cargarProductos();
  };

  return (
    <main className="dashboard-container">
      <header className="dashboard-header">
        <h1>Inventario <span>Fullstack</span></h1>
        <p>Gestiona tus productos en tiempo real</p>
      </header>

      <section className="dashboard-content">
        <aside className="form-sidebar">
          <div className="card">
            <h3>Nuevo Producto</h3>
            <ProductoForm onCrear={manejarCrear} />
          </div>
        </aside>

        <section className="list-main">
          {loading ? (
            <div className="loader-container">
              <div className="spinner"></div>
              <p>Sincronizando inventario...</p>
            </div>
          ) : (
            <div className="card">
              <h3>Productos Disponibles</h3>
              <ProductoList productos={productos} onEliminar={manejarEliminar} />
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

export default ProductoPrincipal;