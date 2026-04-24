

// export default function Shipping() {
//   return (
//     <>
//         <section className="breadcrumb-area bg-img bg-overlay jarallax" 
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
//   <div className="buy-area section-padding-100">
//   <div className="container">
//     <div className="row">

//       {/* <!-- LEFT SIDE --> */}
//       <div className="col-lg-8">
//         <div className="payment-box">

//           <h4>Checkout</h4>

//           {/* <!-- Contact Info --> */}
//           <table className="info-table">
//             <tr>
//               <td>Contact :</td>
//               <td>+91 1234 567 895</td>
//             </tr>
//             <tr>
//               <td>Ship To :</td>
//               <td>Kolkata, WB - 700047, India</td>
//             </tr>
//           </table>

//           {/* <!-- Shipping --> */}
//           <div className="section">
//             <h5>Shipping Method</h5>
//             <p>Shipping within 24 hours - <b>₹59.00</b></p>
//           </div>

//           {/* <!-- Payment --> */}
//           <div className="section">
//             <h5>Payment Method</h5>
//             <p>All transactions are secure and encrypted.</p>
//             <img src="/assets/img/pay.jpg" alt="Payment Methods"/>
//           </div>

//           {/* <!-- Billing --> */}
//           <div className="section">
//             <h5>Billing Address</h5>
//             <label className="checkbox">
//               <input type="checkbox" checked/>
//               Same as shipping address
//             </label>
//           </div>

//           {/* <!-- Button --> */}
//           <button className="probtn">Complete Order</button>

//         </div>
//       </div>

//       {/* <!-- RIGHT SIDE --> */}
//       <div className="col-lg-4">
//         <div className="summary-box">

//           <form className="discount-form">
//             <input type="text" placeholder="Discount Code"/>
//             <button type="submit">Apply</button>
//           </form>

//           {/* <!-- Price --> */}
//           <div className="price-box">

//             <div className="row">
//               <div className="col-6">Subtotal</div>
//               <div className="col-6 text-right">₹200.00</div>
//             </div>

//             <div className="row">
//               <div className="col-6">Shipping</div>
//               <div className="col-6 text-right">₹60.00</div>
//             </div>

//             <hr />

//             <div className="row total">
//               <div className="col-6">
//                 <strong>Total</strong><br/>
//                 <small>Including taxes</small>
//               </div>
//               <div className="col-6 text-right">
//                 <h4>₹260.00</h4>
//               </div>
//             </div>

//           </div>

//         </div>
//       </div>

//     </div>
//   </div>
// </div>
//     {/* <!-- ##### shop Area End ###### --> */}
//     </>
//   )
// }

import { useNavigate, useParams } from "react-router-dom";
import { useAddPurchaseMutation,  useGetAllProductsQuery,  useGetShippingByInIdQuery } from "../../redux/api/shopApi";
import { toast } from "react-toastify";

export default function Shipping() {
  const navigate = useNavigate();
  const { id, id2 } = useParams();

  // decode base64
  const inId = atob(id);
  const idUser = atob(id2);

  console.log(inId, idUser);
  // const [sameAddress, setSameAddress] = useState(true);
  const { data: shippingData, isLoading: shippingLoading } = useGetShippingByInIdQuery(inId, { skip: !inId });

  console.log(shippingData, shippingLoading);
  const shipping = shippingData?.data;
  console.log(shipping);

  // const [discountCode, setDiscountCode] = useState("");
  // const [discountApplied, setDiscountApplied] = useState(0);
  // const { data: shippingPriceData } = useGetAllShippingPricesQuery();
  // const { data: discountData } = useGetAllDiscountsQuery();
  const { data: productsData } = useGetAllProductsQuery();
  const product = productsData?.data?.[0];
  console.log( productsData);
  // first product

  // const [discountCode, setDiscountCode] = useState("");
  // const [appliedDiscount, setAppliedDiscount] = useState(0);
  // const [isApplied, setIsApplied] = useState(false);
  const subtotal = Number(product?.price); // replace with real cart/product price
  // const appliedDiscount=0;
  // const shippingFee = Number(shippingPriceData?.data?.price || 59);
  // const shippingFee = 0;
  // const discountAmount = (subtotal * appliedDiscount) / 100;

  // const total = (subtotal  - discountAmount).toFixed(2);
  const total = (subtotal).toFixed(2);
  // const handleApplyDiscount = () => {
  //   if (!discountCode.trim()) {
  //     toast.error("Please enter a discount code");
  //     return;
  //   }

  //   if (isApplied) {
  //     toast.error("Discount already applied");
  //     return;
  //   }

  //   const found = discountData?.data?.find(
  //     (d) => d.code.toLowerCase() === discountCode.toLowerCase()
  //   );

  //   if (!found) {
  //     toast.error("Invalid discount code");
  //     return;
  //   }

  //   setAppliedDiscount(Number(found.discount));
  //   setIsApplied(true);
  //   toast.success(`Discount ${found.discount}% applied`);
  // };
  //const productPrice = Number(product?.price || 0);
  //const subtotal     = productPrice;
  //const discount     = (subtotal * discountApplied) / 100;
  //const total        = (subtotal + shippingFee - discount).toFixed(2);

  //const discountAmount = (subtotal * appliedDiscount) / 100;
  const [addPurchase, { isLoading: isPurchasing }] = useAddPurchaseMutation();

  const handlePlaceOrder = async () => {
    if (!shipping) return;
    try {
      const res = await addPurchase({
        name: shipping.name,
        phone: shipping.phone,
        address: shipping.address,
        price:   total,
      }).unwrap();

      if (res.success) {
        toast.success("Order placed successfully!");
        navigate("/shop");
      }
    } catch (err) {
      toast.error(err?.data?.message || "Order failed");
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
                <h2>SHIPPING INFORMATION</h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main */}
      <div className="buy-area section-padding-100">
        <div className="container">
          <div className="row">

            {/* LEFT SIDE */}
            <div className="col-lg-8">
              <div className="payment-box">

                <h4>Checkout</h4>

                {/* ✅ FIXED TABLE */}
                {/* <table className="info-table">
                  <tbody>
                    <tr>
                      <td>Contact :</td>
                      <td>+91 1234 567 895</td>
                    </tr>
                    <tr>
                      <td>Ship To :</td>
                      <td>Kolkata, WB - 700047, India</td>
                    </tr>
                  </tbody>
                </table> */}
                <table className="info-table">
                  <tbody>
                    {/* Contact */}
                    <tr>
                      <td>Contact :</td>
                      <td>
                        {shippingLoading
                          ? "Loading..."
                          : shipping?.phone
                            ? `+91 ${shipping.phone}`
                            : "-"}
                      </td>
                    </tr>

                    {/* Shipping Person */}
                    <tr>
                      <td>Shipping Person :</td>
                      <td>
                        {shippingLoading
                          ? "Loading..."
                          : shipping?.name || "-"}
                      </td>
                    </tr>

                    {/* Address */}
                    <tr>
                      <td>Ship To :</td>
                      <td>
                        {shippingLoading ? (
                          "Loading..."
                        ) : shipping ? (
                          <>
                            <div>{shipping.address}</div>
                            <div>
                              {shipping.city}, {shipping.state} - {shipping.pin}
                            </div>
                            <div>India</div>
                          </>
                        ) : (
                          "-"
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* Shipping */}
                <div className="section">
                  {/* <h5>Shipping Method</h5> */}
                  <h5>We will contact You within 48 hours</h5>
                  {/* <p>
                    {/* Shipping within 24 hours - <b>₹59.00</b>
                    We will contact You within 48 hours
                  </p> */}
                </div>

                {/* Payment */}
                {/* <div className="section">
                  <h5>Payment Method</h5>
                  <p>All transactions are secure and encrypted.</p>
                  <img src="/assets/img/pay.jpg" alt="Payment Methods" />
                </div> */}

                {/* Billing */}
                {/* <div className="section">
                  <h5>Billing Address</h5>

                  <label className="checkbox">
                    <input
                      type="checkbox"
                      checked={sameAddress}
                      onChange={() => setSameAddress(!sameAddress)}
                    />
                    Same as shipping address
                  </label>
                </div> */}

                {/* <button className="probtn">Complete Order</button> */}
                <button
                  className="probtn w-100"
                  onClick={handlePlaceOrder}
                  disabled={isPurchasing || !shipping}
                >
                  {isPurchasing ? "Placing Order..." : "Place Order"}
                </button>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="col-lg-4">
              <div className="summary-box">

                {/* Discount */}
                {/* <form className="discount-form" onSubmit={(e) => e.preventDefault()}>
                  <input type="text" placeholder="Discount Code" />
                  <button type="submit">Apply</button>
                </form> */}
                {/* <form
                  className="discount-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleApplyDiscount();
                  }}
                >
                  <input
                    type="text"
                    placeholder="Discount Code"
                    value={discountCode}
                    onChange={(e) => {
                      const value = e.target.value;
                      setDiscountCode(value);

                      if (isApplied) {
                        setIsApplied(false);
                        setAppliedDiscount(0);
                      }
                    }}
                  />

                  <button type="submit" disabled={!discountCode || isApplied}>
                    {isApplied ? "Applied" : "Apply"}
                  </button>
                </form> */}

                {/* Price */}
                {/* <div className="price-box">

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
                      <strong>Total</strong><br />
                      <small>Including taxes</small>
                    </div>
                    <div className="col-6 text-right">
                      <h4>₹260.00</h4>
                    </div>
                  </div>

                </div> */}
                <div className="price-box">

                  <div className="row">
                    <div className="col-6">Subtotal</div>
                    <div className="col-6 text-right">₹{subtotal}</div>
                  </div>

                  {/* <div className="row">
                    <div className="col-6">Shipping</div>
                    <div className="col-6 text-right">₹{shippingFee}</div>
                  </div> */}

                  {/* ✅ SHOW DISCOUNT */}
                  {/* {appliedDiscount > 0 && (
                    <div className="row text-success">
                      <div className="col-6">Discount ({appliedDiscount}%)</div>
                      <div className="col-6 text-right">- ₹{discountAmount}</div>
                    </div>
                  )} */}

                  <hr />

                  <div className="row total">
                    <div className="col-6">
                      <strong>Total</strong><br />
                      <small>Including taxes</small>
                    </div>
                    <div className="col-6 text-right">
                      <h4>₹{total}</h4>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}