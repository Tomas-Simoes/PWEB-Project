const express = require('express');

exports.login = (req, res) => {
    const userMail = req.body.email;
    const userPassword = req.body.password;

    res.send("Login").status(201);
};

exports.logout = (req, res) => {
  res.send("Logout").status(201);
};

