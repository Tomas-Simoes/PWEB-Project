const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();
const authRoutes = require('./routes/authRoutes');
const installationRoutes = require('./routes/installationRoutes')
const certificationRoutes = require('./routes/certificationRoutes')
const mongoose = require('mongoose')
const path = require('path');

const PORT = 3000;

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '..', 'frontend', 'public')));

app.use('/src', express.static(path.join(__dirname, '..', 'frontend', 'src')));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/clientPage', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public/clientPage.html'));
});

app.use('/auth', authRoutes);
app.use('/panels', installationRoutes);
app.use('/certifications', certificationRoutes);


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