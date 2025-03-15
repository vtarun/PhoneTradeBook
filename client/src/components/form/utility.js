export function validateField(name, value){
    let error;
    switch(name){
        case 'brand':
            if(!value) error = 'Brand value is required';
            break; 
        case 'model':
            if(!value) error = 'Model value is required';
            break; 
        case 'IMEI':
            if(!value) error = 'IMEI is required';
            break; 
        case 'transaction':
            if(!value) error = 'Transaction is required';
            break;
        case 'name':
            if(!value) error = 'Name is required';
            else if (!/^[a-zA-Z\s]+$/.test(value)) {
                error = 'Name must contain only alphabets and spaces';
            }
            break; 
        case 'dob':
            if(!value) error = 'Date of birth is required';
            else if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
                error = 'Date of Birth must be in DD-MM-YYYY format';
            }
            break; 
        case 'contact':
            if(!value) error = 'Contact is required';
            else if (!/^\d{10}$/.test(value)) {
                error = 'Phone number must be 10 digits';
            }
            break; 
        case 'customer_photo':
            if(!value) error = 'Customer photo is required';
            break;
        case 'aadhar_no':
            if(!value) error = 'Aadhar is required';
            else if (!/^\d{16}$/.test(value)) {
                error = 'Aadhar no must be 16 digits';
            }
            break; 
        case 'aadhar_front_photo':
            if(!value) error = 'Aadhar front photo is required';
            break;
        case 'aadhar_back_photo':
            if(!value) error = 'Aadhar back photo is required';
            break;
    }

    return error;
}
