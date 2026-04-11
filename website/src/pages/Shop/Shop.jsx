import { NavLink } from "react-router-dom";


export default function Shop() {
  return (
    <>
     {/* <!-- ##### Breadcrumb Area Start ##### --> */}
    <section className="breadcrumb-area bg-img bg-overlay jarallax" 
    style={{ backgroundImage: `url(/assets/img/bg-img/13.jpg)` }}>
        <div className="container h-100">
            <div className="row h-100 align-items-center">
                <div className="col-12">
                    <div className="breadcrumb-content">
                        <h2>Shop</h2>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* <!-- ##### Breadcrumb Area End ##### --> */}

  
 {/* <!-- ##### shop Area Start ###### --> */}
   <div className="shop section-padding-100">
  <div className="container">

    <div className="section-heading text-center">
      <h2>Our Products</h2>
      <p>Choose TAGWAY products to stay safe and prepared</p>
    </div>

    <div className="shopcon">
      <div className="row align-items-center">

        {/* <!-- Product Image --> */}
        <div className="col-lg-5">
          <div className="productimg">
            <img src="/assets/img/tag.jpg" alt="TAGWAY Product"/>
          </div>
        </div>

        {/* <!-- Product Content --> */}
        <div className="col-lg-7">
          <div className="producttext">

            <h3>ID STICKER</h3>

            <p>
              It keeps your important medical information handy, helping responders contact your loved ones 
              and provide proper treatment during emergencies.
            </p>

            <NavLink to="/buy" className="shop-btn">Shop Now</NavLink>

          </div>
        </div>

      </div>
    </div>

  </div>
</div>
    </>
  )
}
