const express = require("express");
const cors = require("cors");
const db = require("./firebase");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("API Firebase funcionando"));

app.get("/api/productos", async (req, res) => {
  try {
    const snapshot = await db.collection("productos").get();
    const productos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al listar productos" });
  }
});

app.post("/api/productos", async (req, res) => {
  try {
    const { nombre, categoria, precio, stock } = req.body;
    if (!nombre || !categoria || precio === undefined || stock === undefined) {
      return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
    }
    const nuevo = { nombre, categoria, precio: Number(precio), stock: Number(stock), creadoEn: new Date().toISOString() };
    const docRef = await db.collection("productos").add(nuevo);
    res.status(201).json({ id: docRef.id, ...nuevo });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear producto" });
  }
});

app.put("/api/productos/:id", async (req, res) => {
  try {
    const ref = db.collection("productos").doc(req.params.id);
    const doc = await ref.get();
    if (!doc.exists) return res.status(404).json({ mensaje: "Producto no encontrado" });
    await ref.update(req.body);
    const actualizado = await ref.get();
    res.json({ id: actualizado.id, ...actualizado.data() });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar producto" });
  }
});

app.delete("/api/productos/:id", async (req, res) => {
  try {
    const ref = db.collection("productos").doc(req.params.id);
    const doc = await ref.get();
    if (!doc.exists) return res.status(404).json({ mensaje: "Producto no encontrado" });
    await ref.delete();
    res.json({ mensaje: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar producto" });
  }
});

app.listen(3000, () => console.log("Servidor Firebase en http://localhost:3000"));