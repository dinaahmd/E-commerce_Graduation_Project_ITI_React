import { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        mobile: '',
    });

    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
        mobile: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        let error = null;

        if (name === 'email' && value) {
            if (!/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(value)) {
                error = 'Invalid email. Please enter a valid email address.';
            }
        }

        if (name === 'password' && value) {
            if (!/^(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[!@#\$%\^&\*])(?=.{8,})/.test(value)) {
                error = 'Invalid password. Please enter a valid password containing at least one lowercase letter, one uppercase letter, one digit, and one special character.';
            }
        }

        if (name === 'mobile' && value) {
            if (!/^(010|011|012|015)\d{8}$/.test(value)) {
                error = 'Invalid mobile number. Please enter a valid mobile number starting with 010, 011, 012, or 015.';
            }
        }

        setFormData({
            ...formData,
            [name]: value,
        });

        setErrors({
            ...errors,
            [name]: error,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register/', formData);
            alert('Registration successful. Please login.');
        } catch (error) {
            alert(`Registration failed. ${error.response.data.error}`);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="username" required />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="email" required />
            {errors.email && <p>{errors.email}</p>}
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="password" required />
            {errors.password && <p>{errors.password}</p>}
            <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="mobile" required />
            {errors.mobile && <p>{errors.mobile}</p>}
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;