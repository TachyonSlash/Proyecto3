const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

const uri = "mongodb+srv://hectorjaz2004:LightingFurySlashMax@ingemoviles.zfmui.mongodb.net/?retryWrites=true&w=majority&appName=IngeMoviles";

const client = new MongoClient(uri);

app.use(express.json());

async function main() {
  try {
    await client.connect();
    console.log("Conectado a MongoDB");

    const database = client.db('IngeORG');
    const usersCollection = database.collection('usuarios');

    app.get('/api/data', async (req, res) => {
      try {
        const data = await usersCollection.find({}).toArray();
        res.json(data);
      } catch (error) {
        res.status(500).send(error.toString());
      }
    });

    app.post('/api/register', async (req, res) => {
      try {
        const newUser = req.body;
        const result = await usersCollection.insertOne(newUser);
        res.status(201).json(result);
      } catch (error) {
        res.status(500).send(error.toString());
      }
    });

    app.listen(port, () => {
      console.log(`Servidor escuchando en http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
  }
}

main().catch(console.error);