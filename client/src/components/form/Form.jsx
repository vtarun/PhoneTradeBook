import { useState } from 'react';
import Input from '../input/Input';
import FileInput from '../input/FileInput';
import Dropdown from '../input/Dropdown';
import Button from '../input/Button';
import { validateField } from './utility';
import { formSections } from './formConfig';
import Navbar from './Navbar';

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

    const setPhotoHandlers = {
        setCustomerPhoto,
        setAadharFrontPhoto,
        setAadharBackPhoto,
    };

    async function handleSubmit(event) {
        event.preventDefault();

        const formSubmitData = new FormData();
        Object.keys(formData).forEach(key => {
            formSubmitData.append(key, formData[key]);
        });
        formSubmitData.append('customer_photo', customerPhoto);
        formSubmitData.append('aadhar_front_photo', aadharFrontPhoto);
        formSubmitData.append('aadhar_back_photo', aadharBackPhoto);

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
            console.error('Error submitting form:', e);
            alert('Error submitting form.');
        }
    }

    function handleChange(event) {
        const { id, value } = event.target;
        setFormData(prev => ({ ...prev, [id]: value }));

        const error = validateField(id, value);
        setErrors(prev => ({ ...prev, [id]: error }));
    }

    return (
        <>
        <div className='w-full md:w-2/3 mx-auto'>
            <form onSubmit={handleSubmit} className='flex flex-col justify-center'>
                {Object.entries(formSections).map(([sectionTitle, fields]) => (
                    <div key={sectionTitle} className="p-4 rounded-md">
                        <h2 className="text-3xl font-bold text-white md:w-[85.6%] border-b-2 pb-2">{sectionTitle}</h2>
                        <section className='flex flex-wrap gap-1'>
                            {fields.map(field => {
                                if (field.type === "text" || field.type === "date") {
                                    return (
                                        <Input
                                            key={field.id}
                                            id={field.id}
                                            label={field.label}
                                            type={field.type}
                                            value={formData[field.id]}
                                            error={errors[field.id]}
                                            handleChange={handleChange}
                                        />
                                    );
                                } else if (field.type === "dropdown") {
                                    return (
                                        <Dropdown
                                            key={field.id}
                                            id={field.id}
                                            label={field.label}
                                            value={formData[field.id]}
                                            handleChange={handleChange}
                                        />
                                    );
                                } else if (field.type === "file") {
                                    const setPhoto = setPhotoHandlers[field.setPhotoKey];
                                    return (
                                        <FileInput
                                            key={field.id}
                                            id={field.id}
                                            label={field.label}
                                            error={errors[field.id]}
                                            setPhoto={setPhoto}
                                        />
                                    );
                                }
                                return null;
                            })}
                        </section>
                    </div>
                ))}

                <div className="mt-6 md:w-[86%] flex flex-1 gap-x-6 justify-end pr-4 mb-10" >
                    <Button type="reset" label="Cancel" />
                    <Button type="submit" label="Save" />
                </div>
            </form>
        </div>
        </>
    );
}