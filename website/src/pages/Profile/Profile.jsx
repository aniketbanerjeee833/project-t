
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useCreateProfileMutation } from "../../redux/api/profileApi";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";


export default function Profile() {
  //const [gender, setGender] = useState("");
  const navigate = useNavigate();
  const { loggedInUser } = useSelector((state) => state.user);
  console.log(loggedInUser)

  const [createProfile, { isLoading: isCreateProfileLoading }] = useCreateProfileMutation()


  const [searchParams] = useSearchParams();

  const profileType = searchParams.get("profile");

  console.log("Profile Type:", profileType);
  const {

    register,
    handleSubmit,

    watch,
    formState: { errors },


  } = useForm()

  const formValues = watch();

  const onSubmit = async (data) => {
    console.log("Form Data:", data);

    if (profileType === "HUMAN" && !data.email) {
      toast.error("Email is required");
      return;
    }

    if (!data.terms) {
      toast.error("You must accept Terms & Conditions");
      return;
    }

    try {
      const formData = new FormData();

      // ✅ always send name
      formData.append("name", data.name || "");
      formData.append("emergency_contact_mail", data.emergency_contact_mail || "");

      formData.append("emergency_contact_number", data.emergency_contact_number || "");

      // 🔥 CONDITIONAL FIELDS

      if (profileType === "HUMAN") {
        formData.append("email", data.email || "");
        formData.append("dob", data.dob || "");
        formData.append("gender", data.gender || "");
        formData.append("city", data.city || "");
        formData.append("state", data.state || "");
        formData.append("pin", data.pin || "");

      } else if (profileType === "PET") {
        // email empty, others normal
        formData.append("email", "");
        formData.append("dob", data.dob || "");
        formData.append("gender", data.gender || "");
        formData.append("city", data.city || "");
        formData.append("state", data.state || "");
        formData.append("pin", data.pin || "");

      } else if (profileType === "OTHER") {
        // only name + image
        formData.append("email", "");
        formData.append("dob", "");
        formData.append("gender", "");
        formData.append("city", "");
        formData.append("state", "");
        formData.append("pin", "");
      }

      // ✅ important fields
      formData.append("profile", profileType);
      formData.append("register_id", loggedInUser?.id);

      // ✅ file
      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      const response = await createProfile(formData).unwrap();
      console.log("Profile Creation Response:", response);
      toast.success("Profile created successfully");
      navigate("/my-profile");

    } catch (err) {
      console.error("Profile Creation Error:", err);
      toast.error(err?.data?.message || "Something went wrong");
    }
  };
  // const onSubmit = async (data) => {
  //   console.log("Form Data:", data);

  //   if (profileType==="HUMAN" && !data.email) {
  //     toast.error("Email is required");
  //     return;
  //   }

  //   if (!data.terms) {
  //     toast.error("You must accept Terms & Conditions");
  //     return;
  //   }

  //   try {
  //     const formData = new FormData();

  //     // ✅ append all fields
  //     formData.append("name", data.name);
  //      formData.append("email", data.email);
  //     formData.append("dob", data.dob);
  //     formData.append("gender", data.gender);
  //     formData.append("city", data.city);
  //     formData.append("state", data.state);
  //     formData.append("pin", data.pin);

  //     // ✅ important fields
  //     formData.append("profile", profileType);
  //     formData.append("register_id", loggedInUser?.id);

  //     // ✅ file (MOST IMPORTANT)
  //     if (data.image && data.image[0]) {
  //       formData.append("image", data.image[0]);
  //     }

  //     console.log("Sending FormData...", formData);

  //     const response = await createProfile(formData).unwrap();

  //     console.log("Profile Creation Response:", response);

  //     toast.success("Profile created successfully");

  //     navigate("/my-profile");

  //   } catch (err) {
  //     console.error("Profile Creation Error:", err);
  //     toast.error(err?.data?.message || "Something went wrong");
  //   }
  // };
  console.log("Form Values:", formValues);
  return (
    <>
      {/* <!-- ##### Breadcrumb Area Start ##### --> */}
      <section className="breadcrumb-area bg-img bg-overlay jarallax"
        style={{ backgroundImage: `url(/assets/img/bg-img/13.jpg)` }}
      >
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12">
              <div className="breadcrumb-content">
                <h2>Information</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- ##### Breadcrumb Area End ##### --> */}


      {/* <!-- ##### profile Area Start ##### --> */}
      <div className="profile-info-area section-padding-100">
        <div className="container">
          <div className="row justify-content-center">

            <div className="col-lg-8">
              <div className="profilebox">

                <h4>PROFILE INFORMATION</h4>

                {/* <form>

            <div className="row">

              
              <div className="col-md-12">
                <input type="file" placeholder="Upload Your Photo :"/>
              </div>

              
              <div className="col-md-12">
                <input type="text" placeholder="Enter your Name"/>
              </div>

             
              <div className="col-md-12">
                <input type="email" placeholder="Enter your Email ID" required/>
              </div>

             
              <div className="col-md-12">
                <input type="text" placeholder="dd-mm-yyyy"/>
              </div>

             
              {/* <div className="col-md-12">
                <select>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div> 
               <div className="col-md-12">
      <select 
        value={gender} 
        onChange={(e) => setGender(e.target.value)}
      >
        
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>

      {/* <p>Selected: {gender}</p> 
    </div>

             
              <div className="col-md-12">
                <input type="text" placeholder="Enter your City"/>
              </div>

             
              <div className="col-md-12">
                <input type="text" placeholder="Enter your state"/>
              </div>

              
              <div className="col-md-12">
                <input type="text" placeholder="Enter your PIN"/>
              </div>

             
              <div className="col-md-12 terms">
                <label 
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                    <input style={{ width: "16px", height: "16px", margin:"1px 0 0 0 !important",
                    marginBottom:"0px" }} 
                    type="checkbox" required/>
                    <span>I accept the Terms of Use</span>
                </label>
              </div>

            </div>

            <button className="probtn">SUBMIT</button>

          </form> */}

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">

                    {/* Upload */}
                    <div className="col-md-12">
                      <input
                        type="file"
                        placeholder="Upload Your Photo :"
                        {...register("image")}
                      />
                    </div>

                    {/* Name */}
                    <div className="col-md-12">
                      <input
                        type="text"
                        placeholder="Enter your Name"
                        {...register("name")}
                      />
                    </div>

                    {/* Email */}
                    {profileType === "HUMAN" && <div className="col-md-12">
                      <input
                        type="email"
                        placeholder="Enter your Email ID"
                        {...register("email")}
                        required
                      />
                    </div>}

                    {/* DOB */}
                    {(profileType === "HUMAN" || profileType === "PET") && <div
                      style={{ color: "white" }}
                      className="col-md-12">
                      <input
                        type="date"
                        placeholder="dd-mm-yyyy"
                        {...register("dob")}
                      />
                    </div>}

                    {/* Gender */}
                    {(profileType === "HUMAN" || profileType === "PET") && <div className="col-md-12">
                      <select {...register("gender")}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        {profileType === "HUMAN" && <option value="Other">Other</option>}
                      </select>
                    </div>}

                    {/* City */}
                    {(profileType === "HUMAN" || profileType === "PET") && <div className="col-md-12">
                      <input
                        type="text"
                        placeholder="Enter your City"
                        {...register("city")}
                      />
                    </div>}

                    {/* State */}
                    {(profileType === "HUMAN" || profileType === "PET") && <div className="col-md-12">
                      <input
                        type="text"
                        placeholder="Enter your state"
                        {...register("state")}
                      />
                    </div>}

                    {/* PIN */}
                    {(profileType === "HUMAN" || profileType === "PET") && <div className="col-md-12">
                      <input
                        type="tel"
                        maxLength={6}
                        placeholder="Enter your PIN"
                        {...register("pin",{
                          required: "PIN is required",
                          pattern: {
                            value: /^[0-9]{6}$/,
                            message: "Enter a valid 6-digit PIN",
                          },
                        })}
                      />
                        {errors.pin && (
                        <p style={{ color: "red", fontSize: "13px", marginTop: "5px" }}>
                          {errors.pin.message}
                        </p>
                      )}
                    </div>}
                    <div className="col-md-12">
                      <input
                        type="email"
                        placeholder="Enter your Emergency Contact Mail"
                        {...register("emergency_contact_mail")}
                        required
                      />
                    </div>
                    {/* <div className="col-md-12">
                      {/* <input
            type="tel"
            maxLength={10}
            placeholder="Enter your Emergency Contact Number"
            {...register("emergency_contact_number")}
            required
          /> 
                      <input
                        type="tel"
                        maxLength={10}
                        placeholder="Enter your Emergency Contact Number"
                        {...register("emergency_contact_number", {
                          required: "Emergency contact number is required",
                          pattern: {
                            value: /^[6-9]\d{9}$/,
                            message: "Enter a valid 10-digit mobile number",
                          },
                        })}
                      />
                    </div> */}
                    <div className="col-md-12">
                      <input
                        type="tel"
                        maxLength={10}
                        placeholder="Enter your Emergency Contact Number"
                        {...register("emergency_contact_number", {
                          required: "Emergency contact number is required",
                          pattern: {
                            value: /^[6-9]\d{9}$/,
                            message: "Enter a valid 10-digit mobile number",
                          },
                        })}
                          onInput={(e) => {
                        e.target.value = e.target.value.replace(/\D/g, ""); // 🔥 remove non-digits
                      }}
                      />

                      {errors.emergency_contact_number && (
                        <p style={{ color: "red", fontSize: "13px", marginTop: "5px" }}>
                          {errors.emergency_contact_number.message}
                        </p>
                      )}
                    </div>

                    {/* Terms */}
                    <div className="col-md-12 terms">
                      <label
                        style={{ display: "flex", alignItems: "center", gap: "8px" }}
                      >
                        <input
                          style={{
                            width: "16px",
                            height: "16px",
                            margin: "1px 0 0 0",
                            marginBottom: "0px"
                          }}
                          type="checkbox"
                          {...register("terms")}
                          required
                        />
                        <span>I accept the Terms of Use</span>
                      </label>
                    </div>

                  </div>

                  <button className="probtn"
                    disabled={isCreateProfileLoading}
                  >
                    {isCreateProfileLoading ? "SUBMITTING..." : "SUBMIT"}
                  </button>
                </form>

              </div>
            </div>

          </div>
        </div>
      </div>
      {/* <!-- ##### profile Area End ##### --> */}
    </>
  )
}
