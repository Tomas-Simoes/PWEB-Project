const express = require('express');
const UserModel = require('../models/user')
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const email= req.body.email;
  const password = req.body.password;
  const user = await UserModel.findOne({ email });   
  const token = sessionStorage.getItem('token');

  if (token) res.json({token}).status(200);

  if (!user) return res.status(404).json({ erro: 'User não encontrado' });

  if(password == user.password) {
    const token = jwt.sign({ 
      id: user.id,
      email: user.email 
    }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.json({ token }).status(200);
  } else res.status(401).json({ erro: 'Password incorreta'})
};

exports.logout = (req, res) => {
  res.send("Logout").status(201);
};

