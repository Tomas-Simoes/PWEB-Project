const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 4000;

app.use(cors());

function generateRandomClientData(clientNames) {
    return clientNames.map(name => ({
        name,
        daily: Math.floor(Math.random() * 101),
    }));
}

// Endpoint to get production data
app.get('/clients', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:3000/client-names');
        const clientNames = response.data;

        const data = generateRandomClientData(clientNames);
        res.json(data);
    } catch (err) {
        console.error('Failed to fetch client names:', err.message);
        res.status(500).json({ error: 'Could not fetch client names' });
    }
});

app.listen(PORT, () => {
    console.log(`Random data API listening on http://localhost:${PORT}`);
});
