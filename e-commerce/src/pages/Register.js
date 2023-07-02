
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

  
  const Register = () => {
    const [formData, setFormData] = useState({
      username: "",
      email: "",
      password: "",
      mobile: "",
      otp: "",
    });
  
    const [errors, setErrors] = useState({
      username: "",
      email: "",
      password: "",
      mobile: "",
      otp: "",
    });
  
    const [otpSent, setOtpSent] = useState(false);
  
    const sendOtp = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/send-otp/",
          {
            email: formData.email,
          }
        );
        alert(response.data.message);
        setOtpSent(true);
      } catch (error) {
        throw new Error(`Error sending OTP: ${error.response.data.error}`);
      }
    };
  
    const verifyOtp = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/verify-otp/",
          {
            email: formData.email,
            otp: formData.otp,
          }
        );
        if (response.data.errors) {
          setErrors(response.data.errors);
          return false;
        }
        return true;
      } catch (error) {
        throw new Error(`Error verifying OTP: ${error.response.data.error}`);
      }
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      let error = null;
  
      if (name === "email" && value) {
        if (!/^[a-zA-Z0-9._]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(value)) {
          error = "Invalid email. Please enter a valid email address.";
        }
      }
  
      if (name === "password" && value) {
        if (
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(
            value
          )
        ) {
          error =
            "Invalid password. Please enter a valid password containing at least one lowercase letter, one uppercase letter, one digit, and one special character.";
        }
      }
  
      if (name === "mobile" && value) {
        if (!/^(010|011|012|015)\d{8}$/.test(value)) {
          error =
            "Invalid mobile number. Please enter a valid mobile number starting with 010, 011, 012, or 015.";
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
  
      // Perform client-side validation
      if (otpSent && !formData.otp) {
        setErrors({

          ...errors,
          otp: "OTP is required.",
        });
        return;
      }
  
      // Send OTP
      if (!otpSent) {
        try {
          await sendOtp();
        } catch (error) {
          alert(`Error sending OTP: ${error.message}`);
          return;
        }
        return;
      }
  
      // Verify OTP
      const data = {
        username:formData.username,
         email:formData.email,
         mobile: formData.mobile,
         password:formData.password ,
        

      };
      let otpValid = false;
      try {
        otpValid = await verifyOtp();
        console.log(otpValid)
        console.log(data)
        
       
    }catch (error) {
        alert(`otp failed. ${error.response.data.error}`);
      }
            
         
        try{
            const response = await axios.post(
                "http://127.0.0.1:8000/api/register/",
                data
              );
              alert("Registration successful. Please login.");
        } catch (error) {
            alert(`Registration failed. ${error.response.data.error}`);
          }  
        
      
      
      if (!otpValid) {
        return;
      }
  
    }
   
  
    return (
        <div
      className="d-flex flex-wrap"
      style={{ backgroundColor: " #F0EEE6", height: "100vh" }}
    >
      <div class="col-lg-6 col-md-12 col-sm-12">
        <div
          className="  d-flex justify-content-center"
          style={{
            height: "700px",
            top: "30px",
            left: "70px",
            width: "600px",
            borderRadius: "20px",
            position: "relative",
            backgroundColor: "white",
          }}
        >            
        <form   style={{ width: "381px" }}   className=" my-5   d-flex flex-column "

      onSubmit={handleSubmit}>
         <div className="d-grid " style={{ marginBottom: "7px" }}>
               
               <p style={{ marginBottom: "3px" }}> welcome</p>
               <h3 style={{ marginBottom: "3px" }}>let's create your account</h3>
               <p style={{ margin: "0px" }} className="text-secondary">
                 fill up your info to
               </p>
             </div>
      <div className="d-grid my-2" style={{ minHeight: "76px" }}>

        <label>Username:</label>
        <input type="text" name="username" onChange={handleChange} />
  </div>

            <div className="d-grid my-2" style={{ minHeight: "76px" }}>

        <label>Email:</label>
        <input type="email" name="email" onChange={handleChange} />
        {errors.email && <p>{errors.email}</p>}
        
        {otpSent ? (
          <>
            <label>OTP:</label>
            <input type="text" name="otp" onChange={handleChange} />
            {errors.otp && <p>{errors.otp}</p>}
          </>
        ) : (
          <button type="button"  onClick={sendOtp} className="btn bg-success my-3"style={{ width: "381px" }}  >
          Send OTP
          </button>
        )}
  </div>
    <div className="d-grid my-2" style={{ minHeight: "76px" }}>

        <label>Password:</label>
       <input type="password" name="password" onChange={handleChange} />
        {errors.password && <p>{errors.password}</p>}
  </div>
            <div className="d-grid my-2" style={{ minHeight: "76px" }}>

        <label>Mobile:</label>
        <input type="text" name="mobile" onChange={handleChange} />
        {errors.mobile && <p>{errors.mobile}</p>}
  </div>
  <button type="submit"
              className="btn bg-success my-3"
              style={{ width: "381px" }}
           >
Register
          </button>
          <p className=" my-2 text-secondary" style={{ fontSize: ".9rem" }}>
               Aleady have an account?<Link to="/login">Login</Link>{" "}
             </p>
      </form>
      </div>       </div>
      <div class="col-lg-6 col-md-12 col-sm-12 d-none d-md-block">
        <img
          style={{
            width: "570px",
            height: "630px",
            left: "30px",
            top: "70px",
            position: "relative",
            borderRadius: "10px",
          }}
          src="https://images.pexels.com/photos/15513767/pexels-photo-15513767/free-photo-of-tree-branches-on-the-background-of-the-sky.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        ></img>
      </div>
    </div>

    );
  };


export default Register;