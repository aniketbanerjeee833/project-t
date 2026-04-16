// import { useNavigate } from "react-router-dom";




// export default function Buy() {
//   const navigate=useNavigate();


//   return (
//     <>
//      {/* <!-- ##### Breadcrumb Area Start ##### --> */}
//     <section className="breadcrumb-area bg-img bg-overlay jarallax" 
//     style={{ backgroundImage: `url(/assets/img/bg-img/13.jpg)` }}>
//         <div className="container h-100">
//             <div className="row h-100 align-items-center">
//                 <div className="col-12">
//                     <div className="breadcrumb-content">
//                         <h2>SHIPPING INFORMATION</h2>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </section>
//     {/* <!-- ##### Breadcrumb Area End ##### --> */}

  
//  {/* <!-- ##### shop Area Start ###### --> */}
//   <div className="shipping-area section-padding-100">
//   <div className="container">
//     <div className="row">

//       {/* <!-- LEFT SIDE --> */}
//       <div className="col-lg-8 offset-lg-2">
//         <div className="profilebox">

//           <h4>Shipping Address</h4>

//           <form onSubmit={(e)=>{
//             e.preventDefault();
//             navigate("/shipping");
//           }}>

//             <div className="row">

//               {/* <!-- Name --> */}
//               <div className="col-md-6">
//                 <input type="text" placeholder="Full Name" required/>
//               </div>

//               {/* <!-- Phone --> */}
//               <div className="col-md-6">
//                 <input type="tel" placeholder="Phone Number" required/>
//               </div>

//               {/* <!-- Company --> */}
//               <div className="col-md-12">
//                 <input type="text" placeholder="Company (Optional)" />
//               </div>

//               {/* <!-- Address --> */}
//               <div className="col-md-12">
//                 <input type="text" placeholder="Address" required/>
//               </div>

//               {/* <!-- Apartment --> */}
//               <div className="col-md-12">
//                 <input type="text" placeholder="Apartment, Suite (Optional)"/>
//               </div>

//               {/* <!-- City --> */}
//               <div className="col-md-6">
//                 <input type="text" placeholder="City" required/>
//               </div>

//               {/* <!-- State --> */}
//               <div className="col-md-6">
//                 <input type="text" placeholder="State" required/>
//               </div>

//               {/* <!-- PIN --> */}
//               <div className="col-md-6">
//                 <input type="text" placeholder="PIN Code" required/>
//               </div>

//             </div>
          
//             <button className="probtn"
           
//             >Continue to Shipping</button>

//           </form>

//         </div>
//       </div>

//       {/* <!-- RIGHT SIDE --> */}
      

//     </div>
//   </div>
// </div>
//     {/* <!-- ##### shop Area End ###### --> */}
//     </>
//   )
// }
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddShippingMutation } from "../../redux/api/shopApi";
import { toast } from "react-toastify";

export default function Buy() {
  const navigate = useNavigate();
  const [addShipping, { isLoading }] = useAddShippingMutation();

  const [form, setForm] = useState({
    name: "", phone: "", company: "",
    address: "", apartment: "", city: "", state: "", pin: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addShipping(form).unwrap();
      if (res.success) {
        // encode exactly like the PHP pattern: id=base64(in_id) & id2=base64(shipping_id)
        const encodedInId  = btoa(String(res.data.in_id));   // id param
        const encodedId    = btoa(String(res.data.id));       // id2 param
        toast.success("Shipping saved!");
        // navigate(`/shipping?id=${encodedInId}&id2=${encodedId}`);
        navigate(`/shipping/${encodedInId}/${encodedId}`);
      }
    } catch (err) {
      toast.error(err?.data?.message || "Failed to save shipping");
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
                <h2>SHIPPING INFORMATION</h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="shipping-area section-padding-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="profilebox">
                <h4>Shipping Address</h4>

                <form onSubmit={handleSubmit}>
                  <div className="row">

                    <div className="col-md-6">
                      <input name="name" value={form.name} onChange={handleChange}
                        type="text" placeholder="Full Name" required />
                    </div>

                    <div className="col-md-6">
                      <input name="phone" value={form.phone} onChange={handleChange}
                        type="tel" placeholder="Phone Number" required />
                    </div>

                    <div className="col-md-12">
                      <input name="company" value={form.company} onChange={handleChange}
                        type="text" placeholder="Company (Optional)" />
                    </div>

                    <div className="col-md-12">
                      <input name="address" value={form.address} onChange={handleChange}
                        type="text" placeholder="Address" required />
                    </div>

                    <div className="col-md-12">
                      <input name="apartment" value={form.apartment} onChange={handleChange}
                        type="text" placeholder="Apartment, Suite (Optional)" />
                    </div>

                    <div className="col-md-6">
                      <input name="city" value={form.city} onChange={handleChange}
                        type="text" placeholder="City" required />
                    </div>

                    <div className="col-md-6">
                      <input name="state" value={form.state} onChange={handleChange}
                        type="text" placeholder="State" required />
                    </div>

                    <div className="col-md-6">
                      <input name="pin" value={form.pin} onChange={handleChange}
                        type="text" placeholder="PIN Code" required />
                    </div>

                  </div>

                  <button className="probtn" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Continue to Shipping"}
                  </button>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
