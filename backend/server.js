const express = require('express');
const morgan = require('morgan'); // middleware to log requests
const dotenv = require('dotenv'); // load enviroment variables 
const authRoutes = require('./routes/authRoutes');
const solarRoutes = require('./routes/installationRoutes')
const mongoose = require('mongoose')
dotenv.config();
const PORT = 3000;

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('../frontend/public'));

app.use('/auth', authRoutes);
app.use('/solarPanels', solarRoutes);


app.get('/', (req, res) => {
  res.send('Server loaded');
});

mongoose.connect('mongodb+srv://pweb:pass123@cluster0.aeijj70.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('Conectado ao MongoDB');

    app.listen(PORT, () => {
      console.log(`Server Running : ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err);
  });