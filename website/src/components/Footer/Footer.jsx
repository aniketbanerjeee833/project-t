import { NavLink } from "react-router-dom";


export default function Footer() {
  return (
//      <footer className="footer-area section-padding-100-0">
//         {/* <!-- <div className="container">
//             <div className="row">

              
//                 <div className="col-12 col-sm-6 col-lg-3">
//                     <div className="single-footer-widget mb-100">
//                         <h5 className="widget-title">About Us</h5>
                        
//                         <nav>
//                             <ul>
//                                 <li><NavLink href="#">Homepage</NavLink></li>
//                                 <li><NavLink href="#">About Us</NavLink></li>
//                                 <li><NavLink href="#">Services &amp; Offers</NavLink></li>
//                                 <li><NavLink href="#">Portfolio Presentation</NavLink></li>
//                                 <li><NavLink href="#">The News</NavLink></li>
//                             </ul>
//                         </nav>
//                     </div>
//                 </div>

//                 <div className="col-12 col-sm-6 col-lg-3">
//                     <div className="single-footer-widget mb-100">
//                         <h5 className="widget-title">Solutions</h5>
                       
//                         <nav>
//                             <ul>
//                                 <li><NavLink href="#">Our Websites</NavLink></li>
//                                 <li><NavLink href="#">Trading &amp; Commerce</NavLink></li>
//                                 <li><NavLink href="#">Banking &amp; Private Equity</NavLink></li>
//                                 <li><NavLink href="#">Industrial &amp; Factory</NavLink></li>
//                                 <li><NavLink href="#">Financial Solutions</NavLink></li>
//                             </ul>
//                         </nav>
//                     </div>
//                 </div>

//                 <div className="col-12 col-sm-6 col-lg-3">
//                     <div className="single-footer-widget mb-100">
//                         <h5 className="widget-title">Our Websites</h5>
                
//                         <nav>
//                             <ul>
//                                 <li><NavLink href="#">Our Websites</NavLink></li>
//                                 <li><NavLink href="#">Trading &amp; Commerce</NavLink></li>
//                                 <li><NavLink href="#">Banking &amp; Private Equity</NavLink></li>
//                                 <li><NavLink href="#">Industrial &amp; Factory</NavLink></li>
//                                 <li><NavLink href="#">Financial Solutions</NavLink></li>
//                             </ul>
//                         </nav>
//                     </div>
//                 </div>

  
//                 <div className="col-12 col-sm-6 col-lg-3">
//                     <div className="single-footer-widget mb-100">
//                         <h5 className="widget-title">Latest News</h5>

                
//                         <div className="single-latest-news-area d-flex align-items-center">
//                             <div className="news-thumbnail">
//                                 <img src="img/bg-img/7.jpg" alt="">
//                             </div>
//                             <div className="news-content">
//                                 <NavLink href="#">How to get the best Website?</NavLink>
//                                 <div className="news-meta">
//                                     <NavLink href="#" className="post-author"><img src="img/pencil.png" alt=""> Jane Smith</NavLink>
//                                     <NavLink href="#" className="post-date"><img src="img/calendar.png" alt=""> April 26</NavLink>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="single-latest-news-area d-flex align-items-center">
//                             <div className="news-thumbnail">
//                                 <img src="img/bg-img/8.jpg" alt="">
//                             </div>
//                             <div className="news-content">
//                                 <NavLink href="#">A new way to get NavLink Website</NavLink>
//                                 <div className="news-meta">
//                                     <NavLink href="#" className="post-author"><img src="img/pencil.png" alt=""> Jane Smith</NavLink>
//                                     <NavLink href="#" className="post-date"><img src="img/calendar.png" alt=""> April 26</NavLink>
//                                 </div>
//                             </div>
//                         </div>

                       
//                         <div className="single-latest-news-area d-flex align-items-center">
//                             <div className="news-thumbnail">
//                                 <img src="img/bg-img/9.jpg" alt="">
//                             </div>
//                             <div className="news-content">
//                                 <NavLink href="#">Finance you home</NavLink>
//                                 <div className="news-meta">
//                                     <NavLink href="#" className="post-author"><img src="img/pencil.png" alt=""> Jane Smith</NavLink>
//                                     <NavLink href="#" className="post-date"><img src="img/calendar.png" alt=""> April 26</NavLink>
//                                 </div>
//                             </div>
//                         </div>

//                     </div>
//                 </div>
//             </div>
//         </div> --> */}

//         {/* <!-- Copywrite Area --> */}
//         <div className="copywrite-area">
//             <div className="container">
//                 <div className="row">
//                     <div className="col-12">
//                         <div className="copywrite-content d-flex flex-wrap justify-content-between align-items-center">
//                             {/* <!-- Footer Logo --> */}
//                             <NavLink to="/" className="footer-logo">
//                                 <img src="/assets/img/logo.png" alt=""/></NavLink>
// {/* 
//                             <!-- Copywrite Text --> */}
//                             {/* <p class="copywrite-text"><a href="#">
// Copyright &copy;<script>document.write(new Date().getFullYear());
//     </script> All rights reserved | TagWay by <a href="#" target="_blank">Techpromind</a></p> */}
//                             <p className="copywrite-text">
//                                 {/* <NavLink to="#" target="_blank">Techpromind</NavLink>  */}
//                                Copyright &copy; {new Date().getFullYear()}
//                                  All rights reserved | TagWay by
//                                    <NavLink to="#" target="_blank">Techpromind</NavLink>
//                                     {/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
// Copyright &copy;<script>document.write(new Date().getFullYear());
//     </script> All rights reserved | TagWay by <NavLink href="#" target="_blank">Techpromind</NavLink>
// <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
// </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </footer>

    <footer className="footer-clean">
      <div className="container">

        <div className="row">

          {/* LEFT */}
          <div className="col-md-4">
            <div className="footer-box">
              <img
                src="/assets/img/logo.png"
                alt="TAGWAY"
                className="footer-logo"
              />
              <p className="tagline">
                <span style={{ color: "limegreen" }}>
                  Easy to Use - Easy to Edit - Easy to Access
                </span>
                <br />
                User friendly and helpful technology through TAGWAY that provides
                most needful information to get faster communication to find-out.
              </p>
            </div>
          </div>

          {/* CENTER */}
          <div className="col-md-3 text-center">
            <div className="footer-box">
              <h4>QUICK LINKS</h4>

              <NavLink to="/shop">Shop</NavLink>
              <NavLink to="/faq">FAQ</NavLink>
              <NavLink to="/contact">Contact us</NavLink>

            </div>
          </div>

          {/* RIGHT */}
          <div className="col-md-5">
            <div className="footer-box">
              <h4>CONTACT</h4>

              <p>
                <i className="fa-solid fa-location-dot"></i>{" "}
                348/103/1, N. S. C. Bose Road, Naktala, Kolkata - 700047
              </p>

              <p>
                <i className="fa-solid fa-envelope"></i>{" "}
                tagwayservice@gmail.com
              </p>

              <p>
                <i className="fa-solid fa-phone"></i>{" "}
                +91 9830800060
              </p>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="footer-bottom text-center">
          <p>
            © {new Date().getFullYear()} TAGWAY | All Rights Reserved. Designed
            & Developed by{" "}
            <a href="#" target="_blank" rel="noreferrer">
              Techpromind
            </a>
          </p>
        </div>

      </div>
    </footer>

  )
}
