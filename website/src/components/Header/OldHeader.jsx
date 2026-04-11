import { NavLink, useNavigate } from "react-router-dom";


// src/components/Header.jsx
//
// Converts classyNav jQuery plugin to React.
// Every class name is kept EXACTLY as in the original HTML/CSS.
// jQuery behavior mapped to React state:
//
//  navbarToggler click
//    → navToggler.toggleClass('active')        → navTogglerActive state
//    → classyMenu.toggleClass('menu-on')       → menuOn state
//
//  closeIcon click
//    → classyMenu.removeClass('menu-on')       → setMenuOn(false)
//    → navToggler.removeClass('active')        → setNavTogglerActive(false)
//
//  window resize breakpointCheck()
//    → width ≤ 991 → classy-nav-container gets 'breakpoint-on'
//    → width > 991 → classy-nav-container gets 'breakpoint-off'

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useLogoutUserMutation } from "../../redux/api/userApi";
import { setLoggedIn } from "../../redux/reducer/userReducer";


export default function Header() {

  // navToggler.toggleClass('active')
  const [navTogglerActive, setNavTogglerActive] = useState(false);

  // classyMenu.toggleClass('menu-on')
  const [menuOn, setMenuOn] = useState(false);
const{loggedIn} = useSelector((state) => state.user);
const navigate = useNavigate();
const dispatch = useDispatch();
  // breakpointCheck — ≤991 → breakpoint-on, >991 → breakpoint-off
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 991 : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 991);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // navbarToggler click handler
  const handleToggler = () => {
    setNavTogglerActive((v) => !v);
    setMenuOn((v) => !v);
  };

  // closeIcon click handler
  const handleClose = () => {
    setMenuOn(false);
    setNavTogglerActive(false);
  };

  const[logoutUser, {isLoading:isLogoutLoading}]= useLogoutUserMutation();

  const handleLogout = async () => {
    

    try{
      const response = await logoutUser().unwrap();
      console.log("Logout Response:", response);
      if(response?.success){
        console.log(response?.message);
         dispatch(setLoggedIn(false))
        navigate("/");
        // ✅ Clear Redux user slice completely
       
        // dispatch(setUserId(null));
        //  dispatch(setUser(null));
        //  dispatch(setUserRole(null));
         toast.success(response?.message || 'Logout successful');
        //window.location.href = "/login"; // hard redirect clears memory
    }
  } catch(err){
    console.error('Logout error:', err);
    toast.error(err?.data?.message || 'Logout failed');
  }
  // console.error('Server responded with:', error.response.data);
  //     }
    }
  return (
    <>
  
        <header class="custom-header">
  <div class="container">

    {/* <!-- Logo --> */}
    <div class="logo">
                   <NavLink to="/">
                  <img src="/assets/img/logo.png" alt="" />
                </NavLink>
    </div>

    {/* <!-- Menu --> */}
    <nav class="menu" id="menu">
      <NavLink to="/">HOME</NavLink>
      <NavLink to="/about">ABOUT US</NavLink>
      <NavLink to="/shop">SHOP</NavLink>
      <NavLink to="/faq">FAQ</NavLink>
      <NavLink to="/contact">CONTACT US</NavLink>

      <div class="auth-buttons">
        {/* <NavLink to="/login" class="login-btn">LOGIN</NavLink>
        <NavLink to="/register" class="register-btn">REGISTER</NavLink> */}
                         {loggedIn && (
                       <>
                         &nbsp;
                         <li><NavLink to="/my-profile" >Profile</NavLink></li>
                       </>
                     )}
                     {!loggedIn && (
                       <>
                         <li><NavLink to="/login"    className="login-btn">Login</NavLink></li>
                         &nbsp;
                         <li><NavLink to="/register" className="register-btn">Register</NavLink></li>
                       </>
                     )}
                     {loggedIn && (
                       <li><NavLink 
                       className="login-btn"
                       onClick={()=>handleLogout()}>
                         {isLogoutLoading ? "Logging out..." : "Logout"}
                         </NavLink></li>
                     )}
      </div>
    </nav>

    {/* <!-- Mobile Toggle --> */}
    <div class="toggle" id="toggle">
      ☰
    </div>

  </div>
   </header>
   </>
  );
}
  // <header className="header-area">

  //     {/* Top Header Area */}
  //     <div className="top-header-area">
  //       <div className="container h-100">
  //         <div className="row h-100 align-items-center">
  //           <div className="col-12 d-flex justify-content-between">

  //             {/* Logo */}
  //             <div className="logo">
  //               <NavLink to="/">
  //                 <img src="/assets/img/logo.png" alt="" />
  //               </NavLink>
  //             </div>

  //             {/* Top Contact Info */}
  //             <div className="top-contact-info d-flex align-items-center">
  //               <NavLink to="#" data-toggle="tooltip" 
  //               data-placement="bottom" title="348/103/1, N. S. C. Bose Road, Naktala, Kolkata - 700047">
  //                 <img src="/assets/img/placeholder.png" alt="" />
  //                 <span>348/103/1, N. S. C. Bose Road, Naktala, Kolkata - 700047</span>
  //               </NavLink>
  //               <NavLink to="#" data-toggle="tooltip" data-placement="bottom" title="tagwayservice@gmail.com">
  //                 <img src="/assets/img/message.png" alt="" />
  //                 <span>tagwayservice@gmail.com</span>
  //               </NavLink>
  //             </div>

  //           </div>
  //         </div>
  //       </div>
  //     </div>

  //     {/* Navbar Area */}
  //     <div className="credit-main-menu" id="sticker">

  //       {/*
  //         jQuery sets these classes on .classy-nav-container:
  //           'light'          → from defaultOpt.theme = 'light'
  //           'left'           → from defaultOpt.openMobileMenu = 'left'
  //           'breakpoint-on'  → when window.innerWidth <= 991
  //           'breakpoint-off' → when window.innerWidth > 991
  //       */}
  //       <div
  //         className={`classy-nav-container light left ${
  //           isMobile ? "breakpoint-on" : "breakpoint-off"
  //         }`}
  //       >
  //         <div className="container">
  //           <nav
  //             className="classy-navbar justify-content-between"
  //             id="creditNav"
  //           >

  //             {/* Navbar Toggler — 3 bars, shown on mobile */}
  //             <div className="classy-navbar-toggler">
  //               <span
  //                 className={`navbarToggler${navTogglerActive ? " active" : ""}`}
  //                 onClick={handleToggler}
  //                 style={{ cursor: "pointer" }}
  //               >
  //                 <span></span>
  //                 <span></span>
  //                 <span></span>
  //               </span>
  //             </div>

  //             {/* Classy Menu — gets 'menu-on' class when open */}
  //             <div className={`classy-menu${menuOn ? " menu-on" : ""}`}>

  //               {/* Close Icon */}
  //               <div className="classycloseIcon" onClick={handleClose} style={{ cursor: "pointer" }}>
  //                 <div  style={{color:"white"}} className="cross-wrap">
  //                   <span 
  //                    className="top"></span>
  //                   <span className="bottom"></span>
  //                 </div>
  //               </div>

  //               {/* Nav links */}
  //               <div className="classynav">
  //                 <ul>
  //                   <li><NavLink to="/">Home</NavLink></li>
  //                   <li><NavLink to="/about">About Us</NavLink></li>
  //                   <li><NavLink to="/shop">Shop</NavLink></li>
  //                   <li><NavLink to="/faq">Faq</NavLink></li>
  //                   <li><NavLink to="/contact">Contact Us</NavLink></li>
  //                    {loggedIn && (
  //                     <>
  //                       &nbsp;
  //                       <li><NavLink to="/my-profile" >Profile</NavLink></li>
  //                     </>
  //                   )}
  //                   {!loggedIn && (
  //                     <>
  //                       <li><NavLink to="/login"    className="btn-2">Login</NavLink></li>
  //                       &nbsp;
  //                       <li><NavLink to="/register" className="btn-3">Register</NavLink></li>
  //                     </>
  //                   )}
  //                   {loggedIn && (
  //                     <li><NavLink 
  //                     className="btn-2"
  //                     onClick={()=>handleLogout()}>
  //                       {isLogoutLoading ? "Logging out..." : "Logout"}
  //                       </NavLink></li>
  //                   )}
  //                 </ul>
  //               </div>

  //             </div>
  //             {/* Menu End */}

  //             {/* Contact */}
  //             <div className="contact">
  //               <NavLink to="#">
  //                 <img src="/assets/img/call2.png" alt="" /> +91 9830800060
  //               </NavLink>
  //             </div>

  //           </nav>
  //         </div>
  //       </div>
  //     </div>

  //   </header>