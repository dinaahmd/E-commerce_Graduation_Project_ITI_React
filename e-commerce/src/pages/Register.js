import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
        <div className='d-flex flex-wrap'style={{backgroundColor:" #F0EEE6" ,height:"100vh"}}>
                    <div class="col-lg-6 col-md-12 col-sm-12">
                <div className='  d-flex justify-content-center' style={{ height:"700px",top:"30px",left:"70px",width:"600px", borderRadius:"20px",position:"relative",backgroundColor:"white"}}>
            <form  className=' my-5   d-flex flex-column 'style={{width:"381px"}} onSubmit={handleSubmit}>
              <div  className='d-grid 'style={{marginBottom:"7px" }}> <p style={{marginBottom:"3px" }}>  welcome</p>
               <h3 style={{marginBottom:"3px" }}>let's create your account</h3>
                <p style={{margin:"0px" }}className='text-secondary' >fill up your info to </p>
                </div>
                <div className='d-grid my-2' style={{minHeight: "76px"}}>
                <label htmlFor="username">Name</label>
                <input type="text"id="username" name="username" value={formData.username} onChange={handleChange} placeholder="username" required />
                </div>
                <div className='d-grid my-2' style={{minHeight: "76px"}}>
    
                <label htmlFor="email">Email</label>
               
                <input type="email"id="email" name="email" value={formData.email} onChange={handleChange} placeholder="email" required />
                {errors.email && <p className='d-grid my-2 text-danger' style={{fontSize:".8rem"}}>{errors.email}</p>}
                </div>
                <div className='d-grid my-2' style={{minHeight: "76px"}}>
                <label htmlFor="password">Password</label>
               
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="password" required />
                {errors.password && <p className='d-grid my-2 text-danger' style={{fontSize:".8rem"}}>{errors.password}</p>}
                </div>
                <div className='d-grid my-2' style={{minHeight: "76px"}}>
                
                <label htmlFor="mobile">Phone</label>
               
                <input type="text" id="mobile"name="mobile" value={formData.mobile} onChange={handleChange} placeholder="mobile" required />
                {errors.mobile && <p className='d-grid my-2 text-danger' style={{fontSize:".8rem"}}>{errors.mobile}</p>}
                </div>
                <button type="submit" className='btn bg-success my-3' style={{width:"381px"}}>Register</button>
               <p className=' my-2 text-secondary' style={{fontSize:".9rem"}}>Aleady have an account?<Link to="/login" >Login</Link> </p>
            </form>
            </div>
            
            </div>
            <div class="col-lg-6 col-md-12 col-sm-12 d-none d-md-block">
            <img style={{width:"570px",height:"630px",left:"30px" ,top:"70px",position:"relative",borderRadius:"10px"}} src='https://images.pexels.com/photos/15513767/pexels-photo-15513767/free-photo-of-tree-branches-on-the-background-of-the-sky.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'>
                </img>
            </div>
    
            </div>
        );
    };

export default Register;