const express = require("express")


exports.createCertificate = async (req, res) => {
    const {clientId, clientName, certificate} = req.body;


    try {

    } catch (error) {
        console.log("Error creating certificate"); 
        return res.status(500).json( {erro : "Error creating certificate"} )
    }
}