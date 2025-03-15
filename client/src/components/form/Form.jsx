import { useState } from 'react';
import Input from '../input/Input';
import FileInput from '../input/FileInput';
import Dropdown from '../input/Dropdown';
import Button from '../input/Button';
import { validateField } from './utility';
export default function Form() {

    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        IMEI: '',
        transaction: 'buy',
        name: '',
        dob: '',
        contact: '',
        aadhar_no: '',
    });

    const [customerPhoto, setCustomerPhoto] = useState(null);
    const [aadharFrontPhoto, setAadharFrontPhoto] = useState(null);
    const [aadharBackPhoto, setAadharBackPhoto] = useState(null);

    const [errors, setErrors] = useState({});

    async function handleSubmit(event) {
        event.preventDefault();
        // Object.keys(formData).forEach(element => {
        //     validateField(element, formData[element]);
        // });
        const formSubmitData = new FormData();
        Object.keys(formData).forEach(element => {
            formSubmitData.append(element, formData[element]);
        });
        formSubmitData.append('customer_photo', customerPhoto);
        formSubmitData.append('aadhar_front_photo', aadharFrontPhoto);
        formSubmitData.append('aadhar_back_photo', aadharBackPhoto);
        console.log(formSubmitData);
        try {
            const response = await fetch('http://localhost:3000/submit', {
                method: 'POST',
                body: formSubmitData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                alert("Form submitted successfully.");
            } else {
                alert("Form submission failed.");
            }
        } catch (e) {
            console.log('Error submitting form: ', e);
            alert('Error submitting form.', e);
        }

    }

    function handleChange(event) {
        setFormData(prev => {
            return { ...prev, [event.target.id]: event.target.value }
        })

        const error = validateField(event.target.id, event.target.value);

        setErrors(prev => {
            return { ...prev, [event.target.id]: error };
        })
    }

    return <>
        <form onSubmit={handleSubmit}>
            <div className="border-4 border-cyan-900">
                <h2>Phone details</h2>

                <Input id="brand" label="Brand" value={formData.brand} error={errors.brand} handleChange={handleChange} />
                <Input id="model" label="Model" value={formData.model} error={errors.modal} handleChange={handleChange} />
                <Input id="IMEI" label="IMEI" value={formData.IMEI} error={errors.IMEI} handleChange={handleChange} />
                <Dropdown id="transaction" label="Transaction" value={formData.transaction} handleChange={handleChange} />

                <h2>Personal details</h2>
                <Input id="name" label="Name" value={formData.name} error={errors.name} handleChange={handleChange} />
                <Input id="dob" label="Date of birth" type="date" value={formData.dob} error={errors.dob} handleChange={handleChange} />
                <Input id="contact" label="Contact no" value={formData.contact} error={errors.contact} handleChange={handleChange} />
                <FileInput id="customer_photo" label="Customer photo" error={errors.customer_photo} setPhoto={setCustomerPhoto} />

                <h2>Aadhar details</h2>
                <Input id="aadhar_no" label="Aadhar no" value={formData.aadhar_no} error={errors.aadhar_no} handleChange={handleChange} />
                <FileInput id="aadhar_front_photo" label="Aadhar front photo" value={formData.aadhar_front_photo} error={errors.aadhar_front_photo} setPhoto={setAadharFrontPhoto} />
                <FileInput id="aadhar_back_photo" label="Aadhar back photo" value={formData.aadhar_back_photo} error={errors.aadhar_back_photo} setPhoto={setAadharBackPhoto} />
            </div>


            <div className="mt-6 flex item-center justify-end gap-x-6">
                <Button type="button" label="Cancel" />
                <Button type="submit" label="Save" />
            </div>
        </form>
    </>
}