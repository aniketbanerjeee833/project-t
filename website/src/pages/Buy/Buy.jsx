import { useNavigate } from "react-router-dom";




export default function Buy() {
  const navigate=useNavigate();
  return (
    <>
     {/* <!-- ##### Breadcrumb Area Start ##### --> */}
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
    {/* <!-- ##### Breadcrumb Area End ##### --> */}

  
 {/* <!-- ##### shop Area Start ###### --> */}
  <div className="shipping-area section-padding-100">
  <div className="container">
    <div className="row">

      {/* <!-- LEFT SIDE --> */}
      <div className="col-lg-8 offset-lg-2">
        <div className="profilebox">

          <h4>Shipping Address</h4>

          <form onSubmit={(e)=>{
            e.preventDefault();
            navigate("/shipping");
          }}>

            <div className="row">

              {/* <!-- Name --> */}
              <div className="col-md-6">
                <input type="text" placeholder="Full Name" required/>
              </div>

              {/* <!-- Phone --> */}
              <div className="col-md-6">
                <input type="tel" placeholder="Phone Number" required/>
              </div>

              {/* <!-- Company --> */}
              <div className="col-md-12">
                <input type="text" placeholder="Company (Optional)" />
              </div>

              {/* <!-- Address --> */}
              <div className="col-md-12">
                <input type="text" placeholder="Address" required/>
              </div>

              {/* <!-- Apartment --> */}
              <div className="col-md-12">
                <input type="text" placeholder="Apartment, Suite (Optional)"/>
              </div>

              {/* <!-- City --> */}
              <div className="col-md-6">
                <input type="text" placeholder="City" required/>
              </div>

              {/* <!-- State --> */}
              <div className="col-md-6">
                <input type="text" placeholder="State" required/>
              </div>

              {/* <!-- PIN --> */}
              <div className="col-md-6">
                <input type="text" placeholder="PIN Code" required/>
              </div>

            </div>
          
            <button className="probtn"
           
            >Continue to Shipping</button>

          </form>

        </div>
      </div>

      {/* <!-- RIGHT SIDE --> */}
      

    </div>
  </div>
</div>
    {/* <!-- ##### shop Area End ###### --> */}
    </>
  )
}
