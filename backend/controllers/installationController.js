const Installation = require('../models/installation');

exports.registerInstallation = async (req, res) => {
  try {
    const novaInstalacao = new Installation({
      installationAddress: req.body.endereco,
      nif: req.body.nif,
      phone: req.body.telefone,
      installDate: req.body.data,
      panelCount: req.body.n_paineis,
      power: req.body.potencia,
      model: req.body.marca_paineis,
      status: 'pending',
      imagePaths: req.files.map(file => 'uploads/' + file.filename),
      clientId: req.user.id
    });

    await novaInstalacao.save();
    console.log('Installation created:', novaInstalacao);

    res.status(200).json({ message: 'Installation successfully registered!' });
  } catch (err) {
    res.status(500).json({ error: 'Error registering installation.', details: err.message });
  }
};
