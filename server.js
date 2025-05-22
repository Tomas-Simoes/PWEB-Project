const express = require('express');
const morgan = require('morgan'); // middleware to log requests
const dotenv = require('dotenv'); // load enviroment variables 
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use(express.static('public'));
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Server loaded');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server Running : ${PORT}`);
});
