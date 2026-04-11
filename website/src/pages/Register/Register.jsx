import { NavLink, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { useRegisterUserMutation } from "../../redux/api/userApi";
import { toast } from "react-toastify";
import { useState } from "react";
export default function Register() {

    const {
    
      register,
      handleSubmit,

      watch,
      
     
    } = useForm()

    const formValues = watch();

    const navigate = useNavigate();

    const [registerUser, { isLoading: isRegisterLoading }] = useRegisterUserMutation()
    console.log("Form Values:", formValues);
     const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("1234"); // fake OTP
  const [enteredOtp, setEnteredOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
   const sendOTP = () => {
    if (!formValues.mobile) {
      toast.error("Enter mobile number first");
      return;
    }

    // For now static OTP
    setOtp("1234");
    setOtpSent(true);

    toast.success("OTP sent ");
  };

  // 🔥 Verify OTP
  const verifyOTP = () => {
    if (enteredOtp === otp) {
      setOtpVerified(true);
      toast.success("OTP verified");
    } else {
      toast.error("Invalid OTP");
    }
  };

  const onSubmit = async (data) => {
    const { mobile, password, confirmPassword } = data;

    // ✅ Password match check
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // ✅ OTP check
    if (!otpVerified) {
      toast.error("Please verify OTP first");
      return;
    }

    try {
      const response = await registerUser({ mobile, password }).unwrap();
      console.log("Register Response:", response);
      if (response.success) {
        toast.success("Registered successfully");
        navigate("/login");
      }

    } catch (err) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
     {/* <!-- ##### Breadcrumb Area Start ##### --> */}
    <section className="breadcrumb-area bg-img bg-overlay jarallax" 
    style={{ backgroundImage: `url(/assets/img/bg-img/13.jpg)` }}>
        <div className="container h-100">
            <div className="row h-100 align-items-center">
                <div className="col-12">
                    <div className="breadcrumb-content">
                        <h2>Register</h2>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* <!-- ##### Breadcrumb Area End ##### --> */}

<div className="login-area section-padding-100">
  <div className="container">
    <div className="row justify-content-center">

      <div className="col-lg-5 col-md-7">
        <div className="loginbox">

          <h4>REGISTER</h4>

          <form id="registerForm" onSubmit={handleSubmit(onSubmit)}>

            <input type="tel" id="phone"
             {...register("mobile")} 
            placeholder="Enter your Phone No." required/>

            <input type="password"
             {...register("password")}
             id="password" placeholder="Password" required/>

            <input type="password" 
              {...register("confirmPassword", { required: "Confirm Password is required" })}
            id="confirmPassword" placeholder="Confirm Password" required/>

            {/* <!-- OTP Send Button --> */}
            {/* <button type="button" onclick="sendOTP()" className="otp-btn">Send OTP</button> */}
             {/* <button type="button"  className="otp-btn">Send OTP</button>
           
            <div id="otpSection" style={{ display: "none" }}>
              <input type="text" id="otp" placeholder="Enter OTP"/>
              <button type="button" >Verify OTP</button>
            </div> */}
            {!otpSent && <button type="button" onClick={sendOTP} className="otp-btn">
                    Send OTP
                  </button>}

                  {/* 🔥 OTP Section */}
                  {otpSent && (
                    <div>
                      <input
                        type="text"
                        placeholder="Enter OTP"
                        value={enteredOtp}
                        onChange={(e) => setEnteredOtp(e.target.value)}
                      />

                      <button type="button" onClick={verifyOTP}>
                        Verify OTP
                      </button>
                    </div>
                  )}

                  {otpVerified && <button type="submit" disabled={isRegisterLoading}>
                    {isRegisterLoading ? "Please wait..." : "SUBMIT"}
                  </button>}


            {/* <button type="submit">SUBMIT</button> */}

          </form>

          <div className="login-links">
            <p>Already have an account? <NavLink to="/login">Login</NavLink></p>
          </div>

        </div>
      </div>

    </div>
  </div>
</div>
    </>
  )
}
