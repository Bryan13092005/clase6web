// frontend/src/services/productosService.js
import { getAuth } from "firebase/auth";

const API_URL = "/api/productos";

// Función auxiliar para obtener el token dinámicamente
async function getAuthHeaders() {
  const auth = getAuth();
  const user = auth.currentUser;
  const token = user ? await user.getIdToken() : "";
  
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };
}

export async function obtenerProductos() {
  const headers = await getAuthHeaders();
  const res = await fetch(API_URL, { headers });
  return res.json();
}

export async function crearProducto(producto) {
  const headers = await getAuthHeaders();
  const res = await fetch(API_URL, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(producto)
  });
  return res.json();
}

export async function actualizarProducto(id, producto) {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(producto)
  });
  return res.json();
}

export async function eliminarProducto(id) {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: headers // Aunque sea DELETE, el backend necesita saber quién borra
  });
  return res.json();
}
