

export default function Shipping() {
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
    {/* <!-- ##### Breadcrumb Area End ##### --> */}

  
 {/* <!-- ##### shop Area Start ###### --> */}
  <div className="buy-area section-padding-100">
  <div className="container">
    <div className="row">

      {/* <!-- LEFT SIDE --> */}
      <div className="col-lg-8">
        <div className="payment-box">

          <h4>Checkout</h4>

          {/* <!-- Contact Info --> */}
          <table className="info-table">
            <tr>
              <td>Contact :</td>
              <td>+91 1234 567 895</td>
            </tr>
            <tr>
              <td>Ship To :</td>
              <td>Kolkata, WB - 700047, India</td>
            </tr>
          </table>

          {/* <!-- Shipping --> */}
          <div className="section">
            <h5>Shipping Method</h5>
            <p>Shipping within 24 hours - <b>₹59.00</b></p>
          </div>

          {/* <!-- Payment --> */}
          <div className="section">
            <h5>Payment Method</h5>
            <p>All transactions are secure and encrypted.</p>
            <img src="/assets/img/pay.jpg" alt="Payment Methods"/>
          </div>

          {/* <!-- Billing --> */}
          <div className="section">
            <h5>Billing Address</h5>
            <label className="checkbox">
              <input type="checkbox" checked/>
              Same as shipping address
            </label>
          </div>

          {/* <!-- Button --> */}
          <button className="probtn">Complete Order</button>

        </div>
      </div>

      {/* <!-- RIGHT SIDE --> */}
      <div className="col-lg-4">
        <div className="summary-box">

          <form className="discount-form">
            <input type="text" placeholder="Discount Code"/>
            <button type="submit">Apply</button>
          </form>

          {/* <!-- Price --> */}
          <div className="price-box">

            <div className="row">
              <div className="col-6">Subtotal</div>
              <div className="col-6 text-right">₹200.00</div>
            </div>

            <div className="row">
              <div className="col-6">Shipping</div>
              <div className="col-6 text-right">₹60.00</div>
            </div>

            <hr />

            <div className="row total">
              <div className="col-6">
                <strong>Total</strong><br/>
                <small>Including taxes</small>
              </div>
              <div className="col-6 text-right">
                <h4>₹260.00</h4>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  </div>
</div>
    {/* <!-- ##### shop Area End ###### --> */}
    </>
  )
}
