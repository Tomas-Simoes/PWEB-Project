const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png'];
  allowed.includes(file.mimetype)
    ? cb(null, true)
    : cb(new Error('Only JPEG/PNG images are allowed.'), false);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
});

const handleUpload = (req, res, next) => {
  upload.array('imagens[]')(req, res, function (err) {
    if (err) return res.status(400).json({ erro: err.message });
    next();
  });
};

const checkRole = (req, res, next) => {
  console.log(req.user.role)
  if (!req.user || req.user.role !== 'client') {
    return res.status(403).json({ erro: 'Only clients can register installations.' });
  }
  next();
};

module.exports = { handleUpload, checkRole };
