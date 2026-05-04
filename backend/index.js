const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 3000

let productos = [
  { id: 1, nombre: 'Producto 1', precio: 10, stock: 100, categoria: 'Categoria 1' },
  { id: 2, nombre: 'Producto 2', precio: 20, stock: 200, categoria: 'Categoria 2' },
  { id: 3, nombre: 'Producto 3', precio: 30, stock: 300, categoria: 'Categoria 3' }
]
app.use(cors())
app.use(express.json())

app.get('/api/productos', (req, res) => {
  res.json(productos)
})

app.get('/api/productos/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const producto = productos.find(p => p.id === id)
    if (producto) {
        res.json(producto)
    } else {
        res.status(404).json({ message: 'Producto no encontrado' })
    }
})

app.post('/api/productos', (req, res) => {
    const data = req.body;

    // 1. Normalizar: Si no es array, lo convertimos en uno para procesar todo igual
    const esArray = Array.isArray(data);
    const items = esArray ? data : [data];

    try {
        const nuevosProductos = items.map((p, index) => {
            // 2. Validar campos obligatorios
            if (!p.nombre || p.precio === undefined) {
                throw new Error(`Error en el índice ${index}: Nombre y precio son requeridos`);
            }

            return {
                id: productos.length + (index + 1), // Ojo: esto puede dar IDs duplicados si borras items
                nombre: p.nombre,
                precio: p.precio,
                stock: p.stock || 0,
                categoria: p.categoria || "Sin categoría"
            };
        });

        // 3. Guardar y responder
        productos = productos.concat(nuevosProductos);
        
        // Si mandó array, respondemos array; si mandó objeto, respondemos el primer (y único) objeto
        return res.status(201).json(esArray ? nuevosProductos : nuevosProductos[0]);

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});


app.delete('/api/productos/:id', (req, res) => {    
    const id = parseInt(req.params.id)
    const index = productos.findIndex(p => p.id === id) 
    if (index !== -1) {
        productos.splice(index, 1)
        res.json({ message: 'Producto eliminado' })
    }   else {
        res.status(404).json({ message: 'Producto no encontrado' })
    }
})

app.put('/api/productos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const producto = productos.find(p => p.id === id)
    if (producto) {
        producto.nombre = req.body.nombre || producto.nombre
        producto.precio = req.body.precio || producto.precio
        res.json(producto)
    } else {
        res.status(404).json({ message: 'Producto no encontrado' })
    }   
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})  