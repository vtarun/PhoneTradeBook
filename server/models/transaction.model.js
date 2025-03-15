const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    brand : {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    IMEI: {
        type: String,
        required: true
    },
    transaction: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    aadhar_no: {
        type: String,
        required: true
    },
    pdfPath: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Transaction', transactionSchema);
