const express = require('express');

exports.login = (req, res) => {
    console.log(req.body.email);
    res.send("Login").status(201);
};

exports.logout = (req, res) => {
  res.send("Logout").status(201);
};

