import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate, } from "react-router-dom";
import { toast } from "react-toastify";
import { useChangePasswordMutation, useSendOTPMutation, useVerifyOTPMutation } from "../../redux/api/userApi";



export default function Forgot() {
  const { register, handleSubmit, watch } = useForm();
  const formValues = watch();
  const navigate = useNavigate();

  // ── state ──────────────────────────────────────────────────────────────────
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState("");
   const[showNewPassword, setShowNewPassword] = useState(false);
    const[showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [sendOTPApi, { isLoading: isSendingOTP }] = useSendOTPMutation();
  const [verifyOTPApi, { isLoading: isVerifyingOTP }] = useVerifyOTPMutation();

  const [changePassword, { isLoading: isChangingPassword }] = useChangePasswordMutation();

  // ── send OTP ───────────────────────────────────────────────────────────────
  const sendOTP = async () => {
    if (!formValues.mobile) {
      toast.error("Enter mobile number first");
      return;
    }

    try {
      const res = await sendOTPApi({ mobile: formValues.mobile,type: "forgot" }).unwrap();
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

  const onSubmit = async (data) => {
    const { mobile, newPassword, confirmPassword } = data;

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!otpVerified) {
      toast.error("Please verify OTP first");
      return;
    }

    try {
      const response = await changePassword({ mobile, newPassword }).unwrap();
      if (response.success) {
        toast.success("Password changed successfully");
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
                <h2>Forgot Password</h2>
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

                <h4>FORGOT PASSWORD</h4>

                <form id="forgotForm" onSubmit={handleSubmit(onSubmit)}>

                  {/* <!-- Phone --> */}
                  <input
                    type="tel"
                    {...register("mobile")}
                    id="phone"
                    placeholder="Enter your Phone No."
                    required
                    disabled={otpSent}
                  />
                  {/* <!-- Send OTP --> */}
                  {!otpSent && <button type="button" className="otp-btn"
                    disabled={isSendingOTP}
                    onClick={sendOTP}>
                    {isSendingOTP ? "Sending..." : "Send OTP"}
                  </button>}

                  {/* <!-- OTP Section --> */}
                  {/* <div id="otpSection" style={{display:"none"}}>
              <input type="text" id="otp" onChange={(e) => setEnteredOtp(e.target.value)}  placeholder="Enter OTP"/>
              
              <button type="button" 
              disabled={isVerifyingOTP }
              onClick={verifyOTP}>
               {isVerifyingOTP ? "Verifying..." : "Verify OTP"}
                </button>
            </div> */}
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
                    </div>
                  )}
                  {/* <div id="resetSection" style={{display:"none"}}></div> */}
                  {/* <!-- New Password (after OTP verify) --> */}
                  {otpVerified && <div>
                    {/* <input type="password"
                      {...register("newPassword")} placeholder="New Password" /> */}
                       <div className="form-group" style={{ textAlign: "left",color:"#919191" }}>
                    <input
                      type={showNewPassword ? "text" : "password"}
                      placeholder="New Password"
                     {...register("newPassword")}
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
                        checked={showNewPassword}
                        onChange={() => setShowNewPassword(prev => !prev)}
                        style={{ marginRight: "6px", width: "6%",marginBottom:"0px",cursor:"pointer" }}
                      />
                      Show Password
                    </label>
                  </div>

                    {/* <input type="password"
                      {...register("confirmPassword")}
                      placeholder="Confirm Password" /> */}
                       <div className="form-group" style={{ textAlign: "left",color:"#919191" }}>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm New Password"
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
                        style={{ marginRight: "6px", width: "6%",marginBottom:"0px",cursor:"pointer" }}
                      />
                      Show Confirm Password
                    </label>
                  </div>

                    <button type="submit" disabled={isChangingPassword}>
                      {isChangingPassword ? "Please wait..." : "RESET PASSWORD"}</button>
                  </div>}

                </form>

                <div className="login-links">
                  <p>Need to login? <NavLink to="/login">Login</NavLink></p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
