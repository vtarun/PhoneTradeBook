require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const app = express();

const { submitForm, getTansaction } = require('./controllers/transaction.controller');

const {PORT = 3000, MONGO_URI } = process.env;


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('common'));  // Logging
app.use(helmet());  // Security
app.use(cors());

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save images to the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" +file.originalname); // Unique filename
  },
});

const upload = multer({ storage: storage });

// Simple route
app.get('/search/:IMEI', getTansaction);

// Route to handle form submission
app.post('/submit', upload.fields([
  { name: 'customer_photo', maxCount: 1 }, // Field name for the first image
  { name: 'aadhar_front_photo', maxCount: 1 }, // Field name for the second image
  { name: 'aadhar_back_photo', maxCount: 1 }  // Field name for the third image
]), submitForm);

// Static route to serve uploaded files
app.use('/uploads', express.static('uploads'));


// Database connection and server start
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');

    // Start the server only after DB connection is established
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);  // Exit process with failure
  });

// Graceful shutdown
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed');
    process.exit(0);
  });
});
