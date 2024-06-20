// middleware/multer.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const createUploadDirectory = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = 'uploads/profile_pictures/';
    createUploadDirectory(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

module.exports = upload;
