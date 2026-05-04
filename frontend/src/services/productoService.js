// frontend/src/services/productosService.js
const API_URL = "/api/productos";

export async function obtenerProductos() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function crearProducto(producto) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto)
  });
  return res.json();
}

export async function actualizarProducto(id, producto) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto)
  });
  return res.json();
}

export async function eliminarProducto(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });
  return res.json();
}