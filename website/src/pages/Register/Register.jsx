// import { NavLink, useNavigate } from "react-router-dom";

// import { useForm } from "react-hook-form";
// import { useRegisterUserMutation } from "../../redux/api/userApi";
// import { toast } from "react-toastify";
// import { useState } from "react";
// export default function Register() {

//     const {

//       register,
//       handleSubmit,

//       watch,


//     } = useForm()

//     const formValues = watch();

//     const navigate = useNavigate();

//     const [registerUser, { isLoading: isRegisterLoading }] = useRegisterUserMutation()
//     console.log("Form Values:", formValues);
//      const [otpSent, setOtpSent] = useState(false);
//   const [otp, setOtp] = useState("1234"); // fake OTP
//   const [enteredOtp, setEnteredOtp] = useState("");
//   const [otpVerified, setOtpVerified] = useState(false);
//    const sendOTP = () => {
//     if (!formValues.mobile) {
//       toast.error("Enter mobile number first");
//       return;
//     }

//     // For now static OTP
//     setOtp("1234");
//     setOtpSent(true);

//     toast.success("OTP sent ");
//   };

//   // 🔥 Verify OTP
//   const verifyOTP = () => {
//     if (enteredOtp === otp) {
//       setOtpVerified(true);
//       toast.success("OTP verified");
//     } else {
//       toast.error("Invalid OTP");
//     }
//   };

//   const onSubmit = async (data) => {
//     const { mobile, password, confirmPassword } = data;

//     // ✅ Password match check
//     if (password !== confirmPassword) {
//       toast.error("Passwords do not match");
//       return;
//     }

//     // ✅ OTP check
//     if (!otpVerified) {
//       toast.error("Please verify OTP first");
//       return;
//     }

//     try {
//       const response = await registerUser({ mobile, password }).unwrap();
//       console.log("Register Response:", response);
//       if (response.success) {
//         toast.success("Registered successfully");
//         navigate("/login");
//       }

//     } catch (err) {
//       toast.error(err?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <>
//      {/* <!-- ##### Breadcrumb Area Start ##### --> */}
//     <section className="breadcrumb-area bg-img bg-overlay jarallax" 
//     style={{ backgroundImage: `url(/assets/img/bg-img/13.jpg)` }}>
//         <div className="container h-100">
//             <div className="row h-100 align-items-center">
//                 <div className="col-12">
//                     <div className="breadcrumb-content">
//                         <h2>Register</h2>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </section>
//     {/* <!-- ##### Breadcrumb Area End ##### --> */}

// <div className="login-area section-padding-100">
//   <div className="container">
//     <div className="row justify-content-center">

//       <div className="col-lg-5 col-md-7">
//         <div className="loginbox">

//           <h4>REGISTER</h4>

//           <form id="registerForm" onSubmit={handleSubmit(onSubmit)}>

//             <input type="tel" id="phone"
//              {...register("mobile")} 
//             placeholder="Enter your Phone No." required/>

//             <input type="password"
//              {...register("password")}
//              id="password" placeholder="Password" required/>

//             <input type="password" 
//               {...register("confirmPassword", { required: "Confirm Password is required" })}
//             id="confirmPassword" placeholder="Confirm Password" required/>

//             {/* <!-- OTP Send Button --> */}
//             {/* <button type="button" onclick="sendOTP()" className="otp-btn">Send OTP</button> */}
//              {/* <button type="button"  className="otp-btn">Send OTP</button>

//             <div id="otpSection" style={{ display: "none" }}>
//               <input type="text" id="otp" placeholder="Enter OTP"/>
//               <button type="button" >Verify OTP</button>
//             </div> */}
//             {!otpSent && <button type="button" onClick={sendOTP} className="otp-btn">
//                     Send OTP
//                   </button>}

//                   {/* 🔥 OTP Section */}
//                   {otpSent && (
//                     <div>
//                       <input
//                         type="text"
//                         placeholder="Enter OTP"
//                         value={enteredOtp}
//                         onChange={(e) => setEnteredOtp(e.target.value)}
//                       />

//                       <button type="button" onClick={verifyOTP}>
//                         Verify OTP
//                       </button>
//                     </div>
//                   )}

//                   {otpVerified && <button type="submit" disabled={isRegisterLoading}>
//                     {isRegisterLoading ? "Please wait..." : "SUBMIT"}
//                   </button>}


//             {/* <button type="submit">SUBMIT</button> */}

//           </form>

//           <div className="login-links">
//             <p>Already have an account? <NavLink to="/login">Login</NavLink></p>
//           </div>

//         </div>
//       </div>

//     </div>
//   </div>
// </div>
//     </>
//   )
// }


import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useRegisterUserMutation,
  useSendOTPMutation,
  useVerifyOTPMutation,
} from "../../redux/api/userApi";
import { useGetAllRegisterImageQuery } from "../../redux/api/homeWebsiteApi";

export default function Register() {

  const { register, handleSubmit, watch, trigger, formState: { errors } } = useForm();
  const formValues = watch();
  const navigate = useNavigate();

  // ── state ──────────────────────────────────────────────────────────────────
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // ── mutations ──────────────────────────────────────────────────────────────
  const [registerUser, { isLoading: isRegisterLoading }] = useRegisterUserMutation();
  const [sendOTPApi, { isLoading: isSendingOTP }] = useSendOTPMutation();
  const [verifyOTPApi, { isLoading: isVerifyingOTP }] = useVerifyOTPMutation();
  const { data: allRegisterImages } = useGetAllRegisterImageQuery();

  const data = allRegisterImages?.data || [];


  // ── send OTP ───────────────────────────────────────────────────────────────

  // const sendOTP = async () => {
  //   if (!formValues.mobile) {
  //     toast.error("Enter mobile number first");
  //     return;
  //   }

  //   try {
  //     const res = await sendOTPApi({ mobile: formValues.mobile,   type: "register" }).unwrap();
  //     if (res.success) {
  //       setOtpSent(true);
  //       toast.success(res.message || "OTP sent successfully");
  //     }
  //   } catch (err) {
  //     toast.error(err?.data?.message || "Failed to send OTP");
  //   }
  // };
  const sendOTP = async () => {
    const isValid = await trigger("mobile"); // 🔥 validate field

    if (!isValid) return; // stop if invalid
    const isName = await trigger("name"); // 🔥 validate field

    if (!isName) return; // stop if invalid


    try {
      const res = await sendOTPApi({
        mobile: formValues.mobile,
        type: "register"
      }).unwrap();

      if (res.success) {
        setOtpSent(true);
        toast.success(res.message || "OTP sent successfully");
      }
    } catch (err) {
      toast.error(err?.data?.message || "Failed to send OTP");
    }
  };

  // ── verify OTP ─────────────────────────────────────────────────────────────
  const verifyOTP = async () => {
    if (!enteredOtp) {
      toast.error("Please enter the OTP");
      return;
    }

    try {
      const res = await verifyOTPApi({
        mobile: formValues.mobile,
        otp: enteredOtp,
      }).unwrap();

      if (res.success) {
        setOtpVerified(true);
        toast.success(res.message || "OTP verified successfully");
      }
    } catch (err) {
      toast.error(err?.data?.message || "Invalid OTP");
    }
  };

  // ── submit ─────────────────────────────────────────────────────────────────
  const onSubmit = async (data) => {
    const { name, mobile, password, confirmPassword } = data;
    if (!name) {
      toast.error("Name is required");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!otpVerified) {
      toast.error("Please verify OTP first");
      return;
    }

    try {
      const response = await registerUser({ name, mobile, password }).unwrap();
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

      <div className="login-area section-padding-100">
        <div className="container-fluid">
          <div
            // style={{gap:"5px"}}
            className="row">
            <div className="col-lg-3 col-md-3">
              {data[0] && (
                <img
                  src={`http://localhost:4000/uploads/${data[0].image}`}
                  alt="left"
                  style={{ width: "100%", height: "100%" }}
                />
              )}
            </div>

            <div className="col-lg-1 col-md-1" ></div>
            <div className="col-lg-4 col-md-4">
              <div className="loginbox">

                <h4>REGISTER</h4>

                <form id="registerForm" onSubmit={handleSubmit(onSubmit)}>

                  {/* Mobile */}
                  {/* <input
                    type="tel"
                    {...register("mobile")}
                    placeholder="Enter your Phone No."
                    required
                  /> */}
                  <div>
                    <input
                      type="text"
                      name="name"

                      placeholder="Enter your Name"

                      {...register("name", {
                        required: "Name is required",
                      })}


                    />
                    {errors.name && (
                      <p style={{ color: "red", fontSize: "13px", marginTop: "5px" }}>
                        {errors.name.message}
                      </p>
                    )}

                  </div>
                  <div>
                    <input
                      type="tel"
                      name="mobile"
                      maxLength={10}
                      placeholder="Enter your Phone No."

                      {...register("mobile", {
                        required: "Mobile number is required",
                        pattern: {
                          value: /^[6-9]\d{9}$/,
                          message: "Enter a valid 10-digit mobile number",
                        },
                      })}

                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/\D/g, ""); // 🔥 remove non-digits
                      }}
                    />
                    {errors.mobile && (
                      <p style={{ color: "red", fontSize: "13px", marginTop: "5px" }}>
                        {errors.mobile.message}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  {/* <input
                    type="password"
                    {...register("password")}
                    placeholder="Password"
                    required
                  /> */}
                  <div className="form-group" style={{ textAlign: "left", color: "#919191" }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      {...register("password")}
                      required
                      style={{ width: "100%" }}
                    />

                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "6px",
                        fontSize: "14px",
                        cursor: "pointer",

                      }}
                    >
                      <input

                        type="checkbox"
                        checked={showPassword}
                        onChange={() => setShowPassword(prev => !prev)}
                        style={{ marginRight: "6px", width: "6%", marginBottom: "0px", cursor: "pointer" }}
                      />
                      Show  Password
                    </label>
                  </div>

                  {/* Confirm Password */}
                  {/* <input
                    type="password"
                    {...register("confirmPassword", { required: true })}
                    placeholder="Confirm Password"
                    required
                  /> */}
                  <div className="form-group" style={{ textAlign: "left", color: "#919191" }}>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Password"
                      {...register("confirmPassword")}
                      required
                      style={{ width: "100%" }}
                    />

                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "6px",
                        fontSize: "14px",
                        cursor: "pointer",

                      }}
                    >
                      <input

                        type="checkbox"
                        checked={showConfirmPassword}
                        onChange={() => setShowConfirmPassword(prev => !prev)}
                        style={{ marginRight: "6px", width: "6%", marginBottom: "0px", cursor: "pointer" }}
                      />
                      Show Confirm Password
                    </label>
                  </div>
                  {/* ── Send OTP button — show only before OTP sent ── */}
                  {!otpSent && (
                    <button
                      type="button"
                      onClick={sendOTP}
                      disabled={isSendingOTP}
                      className="otp-btn"
                    >
                      {isSendingOTP ? "Sending..." : "Send OTP"}
                    </button>
                  )}

                  {/* ── OTP input + verify — show after OTP sent, before verified ── */}
                  {otpSent && !otpVerified && (
                    <div>
                      <input
                        type="text"
                        placeholder="Enter OTP"
                        value={enteredOtp}
                        onChange={(e) => setEnteredOtp(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={verifyOTP}
                        disabled={isVerifyingOTP}
                      >
                        {isVerifyingOTP ? "Verifying..." : "Verify OTP"}
                      </button>

                      {/* Resend OTP */}
                      {/* <button
                        type="button"
                        onClick={sendOTP}
                        disabled={isSendingOTP}
                        className="otp-btn"
                        style={{ marginTop: "8px" }}
                      >
                        {isSendingOTP ? "Sending..." : "Resend OTP"}
                      </button> */}
                    </div>
                  )}

                  {/* ── OTP verified badge ── */}
                  {otpVerified && (
                    <p style={{ color: "green", fontSize: "13px", marginBottom: "8px" }}>
                      ✅ Mobile number verified
                    </p>
                  )}

                  {/* ── Submit — only after OTP verified ── */}
                  {otpVerified && (
                    <button type="submit" disabled={isRegisterLoading}>
                      {isRegisterLoading ? "Please wait..." : "SUBMIT"}
                    </button>
                  )}

                </form>

                <div className="login-links">
                  <p>Already have an account? <NavLink to="/login">Login</NavLink></p>
                </div>

              </div>
            </div>
            <div className="col-lg-1 col-md-1"></div>
            <div className="col-lg-3 col-md-3">
              {data[1] && (
                <img
                  src={`http://localhost:4000/uploads/${data[1].image}`}
                  alt="right"
                  style={{ width: "100%", height: "100%" }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}