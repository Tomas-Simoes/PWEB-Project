const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;
const REFRESH_INTERVAL_SECONDS = 10; // change this as needed

app.use(cors());

let clients = [];

// Sample client names
const clientNames = [
    'João Silva',
    'Maria Santos',
    'Carlos Oliveira',
    'Ana Costa',
    'Pedro Martins',
    'Beatriz Almeida'
];

// Helper to generate random float between min and max
function getRandomFloat(min, max) {
    return +(Math.random() * (max - min) + min).toFixed(2);
}

// Generate new random client data
function generateClientData() {
    clients = clientNames.map(name => ({
        name,
        dailyProduction: getRandomFloat(10, 30)
    }));
    console.log(`Client data updated at ${new Date().toLocaleTimeString()}`);
}

// Initial data + interval
generateClientData();
setInterval(generateClientData, REFRESH_INTERVAL_SECONDS * 1000);

// API endpoint to return current client data
app.get('/clients', (req, res) => {
    res.json(clients);
});

app.listen(PORT, () => {
    console.log(`✅ API running at http://localhost:${PORT}`);
});
