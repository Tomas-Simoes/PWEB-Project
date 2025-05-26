const express = require('express');
const morgan = require('morgan'); // middleware to log requests
const dotenv = require('dotenv'); // load enviroment variables 
const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose')
const cors = require('cors')

const PORT = 3000
const app = express();

dotenv.config();
app.use(cors())
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use(express.static('../frontend'));
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Server loaded');
});

try {
  mongoose.connect("mongodb+srv://tomas20simoes:2EmJGfg9NywYsCEq@lab-node-03.xkde5ma.mongodb.net/?retryWrites=true&w=majority&appName=lab-node-03")
    .then(() => {
      console.log('Conectado ao MongoDB');
    
      app.listen(PORT, () => {
        console.log(`Server Running : ${PORT}`);
      });
  })
} catch(err) {
  console.error('Erro ao conectar ao MongoDB:', err);
}