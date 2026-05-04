import { useEffect, useState } from "react";
import ProductoForm from "./components/ProductoForm";
import ProductoList from "./components/ProductoList";
import {
  obtenerProductos,
  crearProducto,
  eliminarProducto
} from "./services/productoService";

function App() {
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
    <main>
      <h1>Inventario Fullstack</h1>
      <ProductoForm onCrear={manejarCrear} />
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <ProductoList productos={productos} onEliminar={manejarEliminar} />
      )}
    </main>
  );
}

export default App;