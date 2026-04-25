// import { useAddContactUsMutation } from "../../redux/api/userApi"


// export default function Contact() {
//  const {
    
//       register,
//       handleSubmit,

//       watch,
      
     
//     } = useForm()

//     const formValues = watch();
//   const[addContactUs, {isLoading:isContactUsLoading}] = useAddContactUsMutation()
//   return (
//     <>
//     {/* <!-- ##### Breadcrumb Area Start ##### --> */}
//     <section className="breadcrumb-area bg-img bg-overlay jarallax" 
//     style={{ backgroundImage: `url(/assets/img/bg-img/13.jpg)` }}>
//         <div className="container h-100">
//             <div className="row h-100 align-items-center">
//                 <div className="col-12">
//                     <div className="breadcrumb-content">
//                         <h2>Contact us</h2>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </section>
//     {/* <!-- ##### Breadcrumb Area End ##### --> */}

//   <div className="contact section-padding-100">
//   <div className="container">
//     <div className="contactcon">
//       <div className="row align-items-center">

//         {/* <!-- Left Side --> */}
//         <div className="col-lg-5">
//           <div className="leftcontact">
//             <h4>GET IN TOUCH</h4>
//             <ul>
//               <li>
//                 <i className="fa fa-map-marker"></i>
//                 348/103/1, N.S.C Bose Road, Kolkata - 700047
//               </li>
//               <li>
//                 <i className="fa fa-envelope"></i>
//                 tagwayservice@gmail.com
//               </li>
//               <li>
//                 <i className="fa fa-phone"></i>
//                 +91 9830800060
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* <!-- Right Side --> */}
//         <div className="col-lg-7">
//           <div className="contactright">
//             <form>
//               <div className="row">

//                 <div className="col-lg-6">
//                   <input type="text" 
//                   {...register("name")}
//                   placeholder="Enter Name" required/>
//                 </div>

//                 <div 
                
//                 className="col-lg-6">
//                   <input type="email" 
//                   {...register("email")}
//                   placeholder="Enter Email" required/>
//                 </div>

//                 <div className="col-lg-12">
//                   <input type="tel"
//                   {...register("phone")} placeholder="Enter Phone Number" required/>
//                 </div>

//                 <div className="col-lg-12">
//                   <textarea placeholder="Enter Message"></textarea>
//                 </div>

//               </div>

//               <button 
//               onClick={handleSubmitContactUs}
//               type="submit">SEND MESSAGE</button>

//             </form>
//           </div>
//         </div>

//       </div>
//     </div>
//   </div>
// </div>
//     </>
//   )
// }
import { useForm } from "react-hook-form";
import { useAddContactUsMutation } from "../../redux/api/userApi"; // adjust path
import { toast } from "react-toastify";

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [addContactUs, { isLoading }] = useAddContactUsMutation();

  // ✅ Submit Handler
  const handleSubmitContactUs = async (data) => {
    try {
      await addContactUs(data).unwrap();
      toast.success("Message sent successfully");
      reset(); // clear form
    } catch (error) {
      console.error(error);
     toast.error("Failed to send message");
    }
  };

  return (
    <>
      {/* Breadcrumb */}
      <section
        className="breadcrumb-area bg-img bg-overlay jarallax"
        style={{ backgroundImage: `url(/assets/img/bg-img/13.jpg)` }}
      >
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12">
              <div className="breadcrumb-content">
                <h2>Contact us</h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <div className="contact section-padding-100">
        <div className="container">
          <div className="contactcon">
            <div className="row align-items-center">

              {/* Left */}
              <div className="col-lg-5">
                <div className="leftcontact">
                  <h4>GET IN TOUCH</h4>
                  <ul>
                    <li>
                      <i className="fa fa-map-marker"></i>
                      348/103/1, N.S.C Bose Road, Kolkata - 700047
                    </li>
                    <li>
                      <i className="fa fa-envelope"></i>
                      tagwayservice@gmail.com
                    </li>
                    <li>
                      <i className="fa fa-phone"></i>
                      +91 9830800060
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right */}
              <div className="col-lg-7">
                <div className="contactright">
                  
                  {/* ✅ FORM SUBMIT FIX */}
                  <form onSubmit={handleSubmit(handleSubmitContactUs)}>
                    <div className="row">

                      <div className="col-lg-6">
                        <input
                          type="text"
                          {...register("name", { required: true })}
                          placeholder="Enter Name"
                        />
                      </div>

                      <div className="col-lg-6">
                        <input
                          type="email"
                          {...register("email", { required: true })}
                          placeholder="Enter Email"
                        />
                      </div>

                      {/* <div className="col-lg-12">
                        <input
                          type="tel"
                          {...register("ph", { required: true })}
                          placeholder="Enter Phone Number"
                        />
                      </div> */}
                      <div className="col-lg-12">
                    <input
                      type="tel"
                      name="ph"
                      maxLength={10}
                      placeholder="Enter your Phone No."

                      {...register("ph", {
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

                    {errors.ph && (
                      <p style={{ color: "red", fontSize: "13px", marginTop: "5px" }}>
                        {errors.ph.message}
                      </p>
                    )}
                  </div>

                      <div className="col-lg-12">
                        <textarea
                          {...register("message", { required: true })}
                          placeholder="Enter Message"
                        ></textarea>
                      </div>

                    </div>

                    {/* ✅ BUTTON WITH LOADER */}
                    <button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                          ></span>
                          Sending...
                        </>
                      ) : (
                        "SEND MESSAGE"
                      )}
                    </button>

                  </form>

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}