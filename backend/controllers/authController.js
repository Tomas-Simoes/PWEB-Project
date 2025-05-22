const express = require('express');
const UserModel = require('../models/user')

exports.login = async (req, res) => {
  const {email, password} = parseInt(req.params.codigo);
  const user = await UserModel.findOne({ email });   

  if (!user) return res.status(404).json({ erro: 'User não encontrado' });

  if(password == user.password) {
    // JWT TOKEN
  } else res.status(401).json({ erro: 'Password incorreta'})
};

exports.logout = (req, res) => {
  res.send("Logout").status(201);
};

