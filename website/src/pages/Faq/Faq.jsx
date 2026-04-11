// import { useState } from "react";
// import { NavLink } from "react-router-dom";

//     const faqData = [
//   {
//     id: 1,
//     question: "1. What is TAGWAY?",
//     answer: (
//       <>
//         TAGWAY provides various products that carry important information to help
//         save lives during emergencies.{" "}
//         <NavLink to="#">Click here</NavLink> to know more.
//       </>
//     ),
//   },
//   {
//     id: 2,
//     question: "2. How TAGWAY will help in emergency?",
//     answer:
//       "All our products have QR code carrying information such as blood group, emergency contact, etc., helping save valuable time during emergencies.",
//   },
//   {
//     id: 3,
//     question: "3. Where should I buy TAGWAY?",
//     answer:
//       "You can buy TAGWAY products online through our website. We are also working with retailers and local stores to expand availability.",
//   },
//   {
//     id: 4,
//     question: "4. Does this track user location?",
//     answer:
//       "No, TAGWAY has no electronic tracking system. However, in emergencies, someone scanning your QR can share their GPS location with your emergency contacts.",
//   },
//   {
//     id: 5,
//     question: "5. What if I don’t have a smartphone?",
//     answer:
//       "You can access emergency information through our website by entering the Tag ID printed on your product.",
//   },
//   {
//     id: 6,
//     question: "6. Can I use it for my pets?",
//     answer:
//       "Yes! Our tags are designed for pets and can easily be attached to their collars.",
//   },
//   {
//     id: 7,
//     question: "7. How do I register my tag?",
//     answer:
//       "Go to the homepage, click on login, then register. Enter your details and your account will be created.",
//   },
//   {
//     id: 8,
//     question: "8. Is my information safe?",
//     answer:
//       "Yes, we use SSL security. For payments, you will be redirected to payment gateways and none of your banking information is saved.",
//   },
//   {
//     id: 9,
//     question: "9. How much does it cost?",
//     answer: "Product prices are listed on our shop page.",
//   },
//   {
//     id: 10,
//     question: "10. I live outside India. Can TAGWAY help me?",
//     answer:
//       "Yes, you can enter emergency contact details based on your locality.",
//   },
// ];
// export default function Faq() {
//   const [activeIndex, setActiveIndex] = useState(1); // default open first

//   const toggle = (id) => {
//     setActiveIndex(activeIndex === id ? null : id);
//   };
//   return (
//     <>
//      {/* <!-- ##### Breadcrumb Area Start ##### --> */}
//     <section className="breadcrumb-area bg-img bg-overlay jarallax"
//      style={{ backgroundImage: `url(/assets/img/bg-img/13.jpg)` }}>
//         <div className="container h-100">
//             <div className="row h-100 align-items-center">
//                 <div className="col-12">
//                     <div className="breadcrumb-content">
//                         <h2>FREQUENTLY ASKED QUESTIONS</h2>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </section>
//     {/* <!-- ##### Breadcrumb Area End ##### --> */}

//   {/* <!-- ##### FAQ Area Start ##### --> */}
// <section className="faq-area section-padding-100">
//       <div className="container">
//         <div className="row justify-content-center">
//           <div className="col-12 col-lg-8">

//             <div>
//               {faqData.map((faq) => (
//                 <div className="card" key={faq.id}>
//                   <div className="card-header">
//                     <button
//                       onClick={() => toggle(faq.id)}
//                       className="btn btn-link w-100 text-left"
//                     >
//                       {faq.question}
//                     </button>
//                   </div>

//                   {activeIndex === faq.id && (
//                     <div className="collapse show">
//                       <div className="card-body">{faq.answer}</div>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* Contact Note */}
//             <div
//               style={{
//                 marginTop: "50px",
//                 textAlign: "center",
//                 color: "#666666",
//               }}
//             >
//               In case you haven't found the answer for your question please feel
//               free to Contact us, our customer support will be happy to help you.
//             </div>

//           </div>
//         </div>
//       </div>
//     </section>
// {/* <!-- ##### FAQ Area End ##### --> */}
//     </>
//   )
// }
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function FAQ() {
  const [activeId, setActiveId] = useState("faq1"); // default open

  const toggle = (id) => {
    setActiveId((prev) => (prev === id ? "" : id));
  };

  return (
  <>
      <section className="breadcrumb-area bg-img bg-overlay jarallax" 
    style={{ backgroundImage: `url(/assets/img/bg-img/13.jpg)` }}>
      
        <div className="container h-100">
            <div className="row h-100 align-items-center">
                <div className="col-12">
                    <div className="breadcrumb-content">
                        <h2>FREQUENTLY ASKED QUESTIONS</h2>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section className="faq-area section-padding-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">

            <div id="faqAccordion">

              {/* 1 */}
              <div className="card">
                <div className="card-header">
                  <NavLink to="#" onClick={() => toggle("faq1")}>
                    1. What is TAGWAY?
                  </NavLink>
                </div>
                <div className={`collapse ${activeId === "faq1" ? "show" : ""}`}>
                  <div className="card-body">
                    TAGWAY provides various products that carry important
                    information to help save lives during emergencies.
                    <NavLink to="#"> Click here</NavLink> to know more.
                  </div>
                </div>
              </div>

              {/* 2 */}
              <div className="card">
                <div className="card-header">
                  <NavLink to="#" onClick={() => toggle("faq2")}>
                    2. How TAGWAY will help in emergency?
                  </NavLink>
                </div>
                <div className={`collapse ${activeId === "faq2" ? "show" : ""}`}>
                  <div className="card-body">
                    All our products have QR code carrying information such as
                    blood group, emergency contact, etc., helping save valuable
                    time during emergencies.
                  </div>
                </div>
              </div>

              {/* 3 */}
              <div className="card">
                <div className="card-header">
                  <NavLink to="#" onClick={() => toggle("faq3")}>
                    3. Where should I buy TAGWAY?
                  </NavLink>
                </div>
                <div className={`collapse ${activeId === "faq3" ? "show" : ""}`}>
                  <div className="card-body">
                    You can buy TAGWAY products online through our website. We
                    are also working with retailers and local stores to expand
                    availability.
                  </div>
                </div>
              </div>

              {/* 4 */}
              <div className="card">
                <div className="card-header">
                  <NavLink to="#" onClick={() => toggle("faq4")}>
                    4. Does this track user location?
                  </NavLink>
                </div>
                <div className={`collapse ${activeId === "faq4" ? "show" : ""}`}>
                  <div className="card-body">
                    No, TAGWAY has no electronic tracking system. However, in
                    emergencies, someone scanning your QR can share their GPS
                    location with your emergency contacts.
                  </div>
                </div>
              </div>

              {/* 5 */}
              <div className="card">
                <div className="card-header">
                  <NavLink to="#" onClick={() => toggle("faq5")}>
                    5. What if I don’t have smartphone?
                  </NavLink>
                </div>
                <div className={`collapse ${activeId === "faq5" ? "show" : ""}`}>
                  <div className="card-body">
                    You can access emergency information through our website by
                    entering the Tag ID printed on your product.
                  </div>
                </div>
              </div>

              {/* 6 */}
              <div className="card">
                <div className="card-header">
                  <NavLink to="#" onClick={() => toggle("faq6")}>
                    6. Can I use it for my pets?
                  </NavLink>
                </div>
                <div className={`collapse ${activeId === "faq6" ? "show" : ""}`}>
                  <div className="card-body">
                    Yes! Our tags are designed for pets and can easily be
                    attached to their collars.
                  </div>
                </div>
              </div>

              {/* 7 */}
              <div className="card">
                <div className="card-header">
                  <NavLink to="#" onClick={() => toggle("faq7")}>
                    7. How do I register my tag?
                  </NavLink>
                </div>
                <div className={`collapse ${activeId === "faq7" ? "show" : ""}`}>
                  <div className="card-body">
                    Go to the homepage, click on login, then register. Enter your
                    details and your account will be created.
                  </div>
                </div>
              </div>

              {/* 8 */}
              <div className="card">
                <div className="card-header">
                  <NavLink to="#" onClick={() => toggle("faq8")}>
                    8. Is my information safe?
                  </NavLink>
                </div>
                <div className={`collapse ${activeId === "faq8" ? "show" : ""}`}>
                  <div className="card-body">
                    Yes we are using SSL security. For payments you will be
                    redirected to payment gateways and none of your banking
                    information is saved.
                  </div>
                </div>
              </div>

              {/* 9 */}
              <div className="card">
                <div className="card-header">
                  <NavLink to="#" onClick={() => toggle("faq9")}>
                    9. How much does it cost?
                  </NavLink>
                </div>
                <div className={`collapse ${activeId === "faq9" ? "show" : ""}`}>
                  <div className="card-body">
                    Product prices are listed on our shop page.
                  </div>
                </div>
              </div>

              {/* 10 */}
              <div className="card">
                <div className="card-header">
                  <NavLink to="#" onClick={() => toggle("faq10")}>
                    10. I live outside India. Can TAGWAY help me?
                  </NavLink>
                </div>
                <div className={`collapse ${activeId === "faq10" ? "show" : ""}`}>
                  <div className="card-body">
                    Yes, you can enter emergency contact details based on your locality.
                  </div>
                </div>
              </div>

            </div>

            {/* Contact Note */}
            <div style={{ marginTop: "50px", textAlign: "center", color: "#666666" }}>
              In case you haven't found the answer for your question please feel
              free to Contact us, our customer support will be happy to help you.
            </div>

          </div>
        </div>
      </div>
    </section>
    </>
  );
}