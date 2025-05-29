const express = require('express');
const UserModel = require('../models/user');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('Login attempt for:', email); // Debug

    
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ erro: 'User não encontrado' });
    }

    if (password === user.password) {
      const payload = {
        id: user.id,
        email: user.email,
        role: user.role
      };
      
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      return res.status(200).json({ 
        token,
        role: user.role
      });
    } else {
      return res.status(401).json({ erro: 'Password incorreta' });
    }
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ erro: 'Erro interno do servidor' });
  }
};

exports.logout = (req, res) => {
  return res.status(200).json({ message: 'Logout realizado com sucesso' });
};
