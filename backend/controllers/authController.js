const express = require('express');
const UserModel = require('../models/user')
const jwt = require('jsonwebtoken');



exports.login = async (req, res) => {
  const email= req.body.email;
  const password = req.body.password;
  const user = await UserModel.findOne({ email });   

  if (!user) return res.status(404).json({ erro: 'User não encontrado' });

  if(password == user.password) {
    const token = jwt.sign({ 
      id: user.id,
      email: user.email 
    }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  sessionStorage.setItem('token', token);
  res.json({ token });
  } else res.status(401).json({ erro: 'Password incorreta'})
};

exports.logout = (req, res) => {
  res.send("Logout").status(201);
};

