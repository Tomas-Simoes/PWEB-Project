const express = require("express")

exports.registerInstallation = async (req, res) => {
    const { clientId, tecData, loc} = req.body;

    try {
        // verificar se o cliente existe na db

        // AQUI  - verificar cliente 

        // se exister na db criar a instalacao 

        // AQUI - adicionar a table 

        // return res.status(201).json(newInstall)
        
    } catch(error) {
        console.log("Error registering a new instalation: ", error);
        return res.status(500).json({ erro: "Error registering a new instalation."})
    }
}