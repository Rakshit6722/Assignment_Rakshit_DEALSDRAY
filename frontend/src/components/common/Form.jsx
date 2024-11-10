import React, { useState } from 'react';
import { createEmployee, editEmployee } from '../../api/services/employee';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Form = () => {

    const { edit } = useSelector(state => state.edit)

    const id = useParams().id

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        designation: 'HR',
        gender: 'M',
        course: 'MCA'
    });
    const [file, setFile] = useState(null);

    const handleUpdate = async (e) => {
        e.preventDefault()

        const submitFormData = new FormData();
        submitFormData.append("f_id", id)
        submitFormData.append("name", formData.name)
        submitFormData.append("email", formData.email)
        submitFormData.append("mobile", formData.mobile)
        submitFormData.append("designation", formData.designation)
        submitFormData.append("gender", formData.gender)
        submitFormData.append("course", formData.course)
        submitFormData.append("file", file)
        await editEmployee(submitFormData,navigate)

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formData)

        const submitFormData = new FormData();
        submitFormData.append("name", formData.name)
        submitFormData.append("email", formData.email)
        submitFormData.append("mobile", formData.mobile)
        submitFormData.append("designation", formData.designation)
        submitFormData.append("gender", formData.gender)
        submitFormData.append("course", formData.course)
        submitFormData.append("file", file)

        for (let [key, value] of submitFormData.entries()) {
            console.log(`${key}: ${value}`);
        }


        await createEmployee(submitFormData, navigate)

    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCourseChange = (value) => {
        setFormData(prev => ({
            ...prev,
            course: value
        }));
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        // console.log(file)
    };

    return (
        <div className="w-full max-w-md mx-auto p-6 bg-white rounded shadow">
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                {/* Mobile */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium">Mobile No</label>
                    <input
                        type="text"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                {/* Designation */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium">Designation</label>
                    <select
                        name="designation"
                        value={formData.designation}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                    >
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                    </select>
                </div>

                {/* Gender */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium">Gender</label>
                    <div className="space-x-4">
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="gender"
                                value="M"
                                checked={formData.gender === 'M'}
                                onChange={handleInputChange}
                                className="mr-2"
                            />
                            Male
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="gender"
                                value="F"
                                checked={formData.gender === 'F'}
                                onChange={handleInputChange}
                                className="mr-2"
                            />
                            Female
                        </label>
                    </div>
                </div>

                {/* Course */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium">Course</label>
                    <div className="space-y-2">
                        <label className="inline-flex items-center mr-4">
                            <input
                                type="checkbox"
                                checked={formData.course === 'MCA'}
                                onChange={() => handleCourseChange('MCA')}
                                className="mr-2"
                            />
                            MCA
                        </label>
                        <label className="inline-flex items-center mr-4">
                            <input
                                type="checkbox"
                                checked={formData.course === 'BCA'}
                                onChange={() => handleCourseChange('BCA')}
                                className="mr-2"
                            />
                            BCA
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                checked={formData.course === 'BSC'}
                                onChange={() => handleCourseChange('BSC')}
                                className="mr-2"
                            />
                            BSC
                        </label>
                    </div>
                </div>

                {/* File Upload */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium">Image Upload</label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="w-full"
                    />
                </div>

                {/* Submit Button */}
                {
                    edit ? (<>
                        <button
                            className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                            onClick={handleUpdate}
                        >
                            Update
                        </button>
                    </>) : (<>
                        <button
                            type="submit"
                            className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                        >
                            Submit
                        </button>
                    </>)
                }

            </form>
        </div>
    );
};

export default Form;