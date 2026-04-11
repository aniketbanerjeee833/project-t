import { NavLink } from "react-router-dom";


export default function Forgot() {
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

          <form id="forgotForm">

            {/* <!-- Phone --> */}
            <input type="tel" id="phone" placeholder="Enter your Phone No." required/>

            {/* <!-- Send OTP --> */}
            <button type="button" className="otp-btn" onclick="sendOTP()">Send OTP</button>

            {/* <!-- OTP Section --> */}
            <div id="otpSection" style={{display:"none"}}>
              <input type="text" id="otp" placeholder="Enter OTP"/>
              
              <button type="button" onclick="verifyOTP()">Verify OTP</button>
            </div>

            {/* <!-- New Password (after OTP verify) --> */}
            <div id="resetSection" style={{display:"none"}}>
              <input type="password" placeholder="New Password"/>
              <input type="password" placeholder="Confirm Password"/>
              
              <button type="submit">RESET PASSWORD</button>
            </div>

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
