

export default function Contact() {
  return (
    <>
    {/* <!-- ##### Breadcrumb Area Start ##### --> */}
    <section className="breadcrumb-area bg-img bg-overlay jarallax" 
    style={{ backgroundImage: `url(/assets/img/bg-img/13.jpg)` }}>
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
    {/* <!-- ##### Breadcrumb Area End ##### --> */}

  <div className="contact section-padding-100">
  <div className="container">
    <div className="contactcon">
      <div className="row align-items-center">

        {/* <!-- Left Side --> */}
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

        {/* <!-- Right Side --> */}
        <div className="col-lg-7">
          <div className="contactright">
            <form>
              <div className="row">

                <div className="col-lg-6">
                  <input type="text" placeholder="Enter Name" required/>
                </div>

                <div className="col-lg-6">
                  <input type="email" placeholder="Enter Email" required/>
                </div>

                <div className="col-lg-12">
                  <input type="tel" placeholder="Enter Phone Number" required/>
                </div>

                <div className="col-lg-12">
                  <textarea placeholder="Enter Message"></textarea>
                </div>

              </div>

              <button type="submit">SEND MESSAGE</button>

            </form>
          </div>
        </div>

      </div>
    </div>
  </div>
</div>
    </>
  )
}
