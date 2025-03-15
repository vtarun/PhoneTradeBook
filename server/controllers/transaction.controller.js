const path = require('path');
const PDFDocument = require('pdfkit');
const fs = require('fs');

const Transaction = require('../models/transaction.model');

module.exports.submitForm = async (req, res) => {
    try {
      // Extract form data
      const {
        brand,
        model,
        IMEI,
        transaction,
        name,
        dob,
        contact,
        aadhar_no,
      } = req.body;
  
      // Store image paths
      const customerPhoto = req.files.customer_photo ? req.files.customer_photo[0].path : 'No customer photo';
      const aadharFrontPhoto = req.files.aadhar_front_photo ? req.files.aadhar_front_photo[0].path : 'No Aadhar front photo';
      const aadharBackPhoto = req.files.aadhar_back_photo ? req.files.aadhar_back_photo[0].path : 'No Aadhar back photo';
  
      const pdfDoc = new PDFDocument();
      const pdfPath = `uploads/new_images.pdf`;
  
      pdfDoc.pipe(fs.createWriteStream(pdfPath));
  
      // Draw table borders with top margin
      const topMargin = 60;
      pdfDoc.rect(30, topMargin, 550, 225).stroke(); // Outer border
      pdfDoc.rect(30, topMargin, 150, 225).stroke(); // Left column border
  
      // Calculate the center position for the customer photo
      const photoWidth = 140;
      const photoHeight = 190;
      const divWidth = 150;
      const divHeight = 200;
      const photoX = 30 + (divWidth - photoWidth) / 2;
      const photoY = topMargin + (divHeight - photoHeight) / 2;
  
      // Add profile photo centered within its div
      pdfDoc.image(customerPhoto, photoX, photoY, { fit: [photoWidth, photoHeight] });
  
      pdfDoc.fontSize(20)
        .text(`Customer Details`, 190, 20)
        .moveTo(190, 37).lineTo(342, 37).stroke();
  
      // Add form data to the PDF in a table-like structure
      pdfDoc.fontSize(16)
        .text(`Name: ${name}`, 190, topMargin + 5)
        .moveTo(190, topMargin + 25).lineTo(550, topMargin + 25).stroke()
        .text(`DOB: ${dob}`, 190, topMargin + 30)
        .moveTo(190, topMargin + 50).lineTo(550, topMargin + 50).stroke()
        .text(`Contact: ${contact}`, 190, topMargin + 55)
        .moveTo(190, topMargin + 75).lineTo(550, topMargin + 75).stroke()
        .text(`Aadhar No: ${aadhar_no}`, 190, topMargin + 80)
        .moveTo(190, topMargin + 100).lineTo(550, topMargin + 100).stroke()
        .text(`Brand: ${brand}`, 190, topMargin + 105)
        .moveTo(190, topMargin + 125).lineTo(550, topMargin + 125).stroke()
        .text(`Model: ${model}`, 190, topMargin + 130)
        .moveTo(190, topMargin + 150).lineTo(550, topMargin + 150).stroke()
        .text(`IMEI: ${IMEI}`, 190, topMargin + 155)
        .moveTo(190, topMargin + 175).lineTo(550, topMargin + 175).stroke()
        .text(`Transaction: ${transaction}`, 190, topMargin + 180)
        .moveTo(190, topMargin + 200).lineTo(550, topMargin + 200).stroke()
        .text(`Date of transaction: ${new Date().toLocaleDateString()}`, 190, topMargin + 205)
        .moveTo(190, topMargin + 225).lineTo(550, topMargin + 225).stroke();
  
      // Add Aadhar front and back photos side by side with the same width as personal details
      const imageWidth = 265;
      const imageHeight = 200;
      const imageSpacing = 20;
      const totalWidth = imageWidth * 2 + imageSpacing;
      const startX = (pdfDoc.page.width - totalWidth) / 2;
  
      pdfDoc.image(aadharFrontPhoto, startX, topMargin + 250, { fit: [imageWidth, imageHeight] }).rect(startX, topMargin + 250, imageWidth, imageHeight).stroke();
      pdfDoc.image(aadharBackPhoto, startX + imageWidth + imageSpacing, topMargin + 250, { fit: [imageWidth, imageHeight] }).rect(startX + imageWidth + imageSpacing, topMargin + 250, imageWidth, imageHeight).stroke();
  
      pdfDoc.end();

      await Transaction.create({
        brand,
        model,
        IMEI,
        transaction,
        name,
        dob,
        contact,
        aadhar_no,
        pdfPath
      });
  
      res.status(200).json({ message: 'Form submitted successfully'});
    } catch (error) {
      console.error('Error submitting form:', error);
      res.status(500).json({ message: 'Failed to submit form' });
    }
};

module.exports.getTansaction = async (req, res) => {

};