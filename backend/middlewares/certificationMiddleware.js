const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/certifications'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only .pdf files are allowed'), false);
  }
};

const uploadCert = multer({ storage, fileFilter });

const handleCertUpload = (req, res, next) => {
  uploadCert.single('certificado')(req, res, function (err) {
    if (err) return res.status(400).json({ error: err.message });
    next();
  });
};

const checkTechRole = (req, res, next) => {
  if (!req.user || req.user.role !== 'tech') {
    return res.status(403).json({ error: 'Only technicians can do this.' });
  }
  next();
};

module.exports = { handleCertUpload, checkTechRole };
