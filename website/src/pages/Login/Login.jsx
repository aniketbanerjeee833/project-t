import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../redux/api/userApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLoggedIn, setLoggedInUser } from "../../redux/reducer/userReducer";
import { useState } from "react";


export default function Login() {


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {

    register,
    handleSubmit,

    watch,


  } = useForm()

  const formValues = watch();

  console.log("Form Values:", formValues);

  const [loginUser, { isLoading: isLoginLoading }] = useLoginUserMutation()
  const [showPassword, setShowPassword] = useState(false);
  const onSubmit = async (data) => {
    const { mobile, password } = data;
    try {
      const response = await loginUser({ mobile, password }).unwrap();
      console.log("Login Response:", response);
      if (response.success) {
        toast.success("Logged in successfully");
        dispatch(setLoggedIn(true));
        dispatch(setLoggedInUser(response?.user));
        navigate("/my-profile");
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
                <h2>Login</h2>
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

                <h4>LOGIN</h4>

                 <form onSubmit={handleSubmit(onSubmit)}
  style={{ textAlign: "left", width: "100%" }}>

                  <input type="tel" name="number" placeholder="Enter your Phone No."
                    {...register("mobile")}
                    required />

                  {/* <input type="password" name="password" placeholder="Password" 
            {...register("password")}
            required/> */}
                  <div className="form-group" style={{ textAlign: "left",color:"#919191" }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
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
                        style={{ marginRight: "6px", width: "6%",marginBottom:"0px",cursor:"pointer" }}
                      />
                      Show Password
                    </label>
                  </div>

                  <button type="submit"
                    disabled={isLoginLoading}>

                    {isLoginLoading ? "LOGGING IN..." : "LOGIN"}
                  </button>

                </form>

                <div className="login-links">
                  <NavLink to="/forgot">Forgot Password?</NavLink>
                  <p>Don't have an account? <NavLink to="/register">Register</NavLink></p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
