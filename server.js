const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors'); // Importa el middleware cors
const app = express();
const port = 3001;

app.use(express.json());

// Habilita CORS para permitir acceso desde http://localhost:3000
app.use(cors());

app.post('/sendToWebhook', async (req, res) => {
  const url = 'https://hooks.zapier.com/hooks/catch/6872019/oahrt5g/';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.get('/', async (req, res) => {
  res.status(200).json({status: "welcome"});
})

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
