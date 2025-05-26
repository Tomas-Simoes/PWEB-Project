const express = require('express');
const UserModel = require('../models/user')
const jwt = require('jsonwebtoken');


exports.createTempUser = async (req, res) => {
  const existingUser = await UserModel.findOne({ userCode: 23345234 });
  if (existingUser) {
    return res.status(400).json({ error: 'userCode already exists' });
  }

  await UserModel.create({
    userCode: 23345234,
    email: 'joao@example.comsc',
    username: 'joaosilva',
    password: 'senhaSegura123'
  });
}

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

  res.json({ token });
  } else res.status(401).json({ erro: 'Password incorreta'})
};

exports.logout = (req, res) => {
  res.send("Logout").status(201);
};

