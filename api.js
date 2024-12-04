const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const app = express();
const port = 3000;

const uri = "mongodb+srv://hectorjaz2004:LightingFurySlashMax@ingemoviles.zfmui.mongodb.net/?retryWrites=true&w=majority&appName=IngeMoviles";

const client = new MongoClient(uri);

app.use(cors()); 
app.use(express.json());

async function main() {
  try {
    await client.connect();
    console.log("Conectado a MongoDB");

    const database = client.db('IngeORG');
    const usersCollection = database.collection('usuarios');
    const productsCollection = database.collection('productos'); 

    const initialProducts = [
      { nombre: 'Ingetroca', cantidad: 5 },
      { nombre: 'Ingeitalia', cantidad: 8 },
      { nombre: 'Ingechevy', cantidad: 10 },
      { nombre: 'Ingebus', cantidad: 3 }
    ];

    for (const product of initialProducts) {
      const existingProduct = await productsCollection.findOne({ nombre: product.nombre });
      if (!existingProduct) {
        await productsCollection.insertOne(product);
        console.log(`Producto ${product.nombre} insertado`);
      } else {
        console.log(`Producto ${product.nombre} ya existe`);
      }
    }

    app.get('/api/data', async (req, res) => {
      try {
        const data = await usersCollection.find({}).toArray();
        res.json(data);
      } catch (error) {
        res.status(500).json({ message: error.toString() });
      }
    });

    app.post('/api/register', async (req, res) => {
      try {
        const newUser = req.body;

        const existingUser = await usersCollection.findOne({ email: newUser.email });
        if (existingUser) {
          return res.status(400).json({ message: 'El correo ya está registrado' });
        }

        const result = await usersCollection.insertOne(newUser);
        res.status(201).json(result);
      } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: error.toString() });
      }
    });

    app.post('/api/login', async (req, res) => {
      try {
        const { email, password } = req.body;

        const user = await usersCollection.findOne({ email, password });
        if (!user) {
          return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
        }

        res.status(200).json({ message: 'Inicio de sesión exitoso' });
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: error.toString() });
      }
    });

    app.post('/api/products', async (req, res) => {
      try {
        const newProduct = req.body;

        if (!newProduct.nombre || !newProduct.cantidad) {
          return res.status(400).json({ message: 'Nombre y cantidad son requeridos' });
        }

        const result = await productsCollection.insertOne(newProduct);
        res.status(201).json(result);
      } catch (error) {
        console.error('Error al agregar producto:', error);
        res.status(500).json({ message: error.toString() });
      }
    });

    app.get('/api/product/:nombre', async (req, res) => {
      try {
        const nombre = req.params.nombre;
        const product = await productsCollection.findOne({ nombre });
    
        if (!product) {
          return res.status(404).json({ message: 'Producto no encontrado' });
        }
    
        res.status(200).json(product);
      } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).json({ message: error.toString() });
      }
    });

    app.patch('/api/product/:nombre', async (req, res) => {
      try {
        const nombre = req.params.nombre;
        const { cantidad } = req.body;
    
        const result = await productsCollection.updateOne(
          { nombre },
          { $inc: { cantidad: cantidad } }
        );
    
        if (result.matchedCount === 0) {
          return res.status(404).json({ message: 'Producto no encontrado' });
        }
    
        res.status(200).json({ message: 'Cantidad actualizada' });
      } catch (error) {
        console.error('Error al actualizar la cantidad del producto:', error);
        res.status(500).json({ message: error.toString() });
      }
    });

    app.listen(port, () => {
      console.log(`Servidor escuchando en http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
  }
}

main().catch(console.error);