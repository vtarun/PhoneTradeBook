const express = require('express');
const PDFDocument = require('pdfkit');
const fs = require('fs');

// Store image paths
const customerPhoto = 'uploads/profile.png';
const aadharFrontPhoto = 'uploads/aadhar_front.png';
const aadharBackPhoto = 'uploads/aadhar_back.png';

// Create PDF with images
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
  .text(`Name: Vivek Tarun`, 190, topMargin + 5)
  .moveTo(190, topMargin + 25).lineTo(550, topMargin + 25).stroke()
  .text(`DOB: 12-12-1999`, 190, topMargin + 30)
  .moveTo(190, topMargin + 50).lineTo(550, topMargin + 50).stroke()
  .text(`Contact: 234567890`, 190, topMargin + 55)
  .moveTo(190, topMargin + 75).lineTo(550, topMargin + 75).stroke()
  .text(`Aadhar No: 1234567812345678`, 190, topMargin + 80)
  .moveTo(190, topMargin + 100).lineTo(550, topMargin + 100).stroke()
  .text(`Brand: Samsung`, 190, topMargin + 105)
  .moveTo(190, topMargin + 125).lineTo(550, topMargin + 125).stroke()
  .text(`Model: AESD4236125`, 190, topMargin + 130)
  .moveTo(190, topMargin + 150).lineTo(550, topMargin + 150).stroke()
  .text(`IMEI: ER2342342432`, 190, topMargin + 155)
  .moveTo(190, topMargin + 175).lineTo(550, topMargin + 175).stroke()
  .text(`Transaction: BUY`, 190, topMargin + 180)
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