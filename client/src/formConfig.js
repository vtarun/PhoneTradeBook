export const formSections = {
    "Phone details": [
        { id: "brand", label: "Brand", type: "text" },
        { id: "model", label: "Model", type: "text" },
        { id: "IMEI", label: "IMEI", type: "text" },
        { id: "transaction", label: "Transaction", type: "dropdown" },
    ],
    "Personal details": [
        { id: "name", label: "Name", type: "text" },
        { id: "dob", label: "Date of birth", type: "date" },
        { id: "contact", label: "Contact no", type: "text" },
        { id: "customer_photo", label: "Upload customer photo", type: "file", setPhotoKey: "setCustomerPhoto" },
    ],
    "Aadhar details": [
        { id: "aadhar_no", label: "Aadhar no", type: "text" },
        { id: "aadhar_front_photo", label: "Upload Aadhar front photo", type: "file", setPhotoKey: "setAadharFrontPhoto" },
        { id: "aadhar_back_photo", label: "Upload Aadhar back photo", type: "file", setPhotoKey: "setAadharBackPhoto" },
    ],
};