// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <section id="center">
//         <div className="hero">
//           <img src={heroImg} className="base" width="170" height="179" alt="" />
//           <img src={reactLogo} className="framework" alt="React logo" />
//           <img src={viteLogo} className="vite" alt="Vite logo" />
//         </div>
//         <div>
//           <h1>Get started</h1>
//           <p>
//             Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
//           </p>
//         </div>
//         <button
//           className="counter"
//           onClick={() => setCount((count) => count + 1)}
//         >
//           Count is {count}
//         </button>
//       </section>

//       <div className="ticks"></div>

//       <section id="next-steps">
//         <div id="docs">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#documentation-icon"></use>
//           </svg>
//           <h2>Documentation</h2>
//           <p>Your questions, answered</p>
//           <ul>
//             <li>
//               <a href="https://vite.dev/" target="_blank">
//                 <img className="logo" src={viteLogo} alt="" />
//                 Explore Vite
//               </a>
//             </li>
//             <li>
//               <a href="https://react.dev/" target="_blank">
//                 <img className="button-icon" src={reactLogo} alt="" />
//                 Learn more
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div id="social">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#social-icon"></use>
//           </svg>
//           <h2>Connect with us</h2>
//           <p>Join the Vite community</p>
//           <ul>
//             <li>
//               <a href="https://github.com/vitejs/vite" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#github-icon"></use>
//                 </svg>
//                 GitHub
//               </a>
//             </li>
//             <li>
//               <a href="https://chat.vite.dev/" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#discord-icon"></use>
//                 </svg>
//                 Discord
//               </a>
//             </li>
//             <li>
//               <a href="https://x.com/vite_js" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#x-icon"></use>
//                 </svg>
//                 X.com
//               </a>
//             </li>
//             <li>
//               <a href="https://bsky.app/profile/vite.dev" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#bluesky-icon"></use>
//                 </svg>
//                 Bluesky
//               </a>
//             </li>
//           </ul>
//         </div>
//       </section>

//       <div className="ticks"></div>
//       <section id="spacer"></section>
//     </>
//   )
// }

// export default App
import { BrowserRouter, Routes, Route } from "react-router-dom";
import  { Suspense, lazy } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Layout from "./components/Layout/Layout.jsx";
import Spinner from "./components/Layout/Spinner.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



// ✅ Correct lazy imports
const Home = lazy(() => import("./pages/Home/Home.jsx"));
const About = lazy(() => import("./pages/About/About.jsx"));
const Contact = lazy(() => import("./pages/Contact/Contact.jsx"));
const Faq = lazy(() => import("./pages/Faq/Faq.jsx"));
const Login = lazy(() => import("./pages/Login/Login.jsx"));
const Forgot = lazy(() => import("./pages/Forgot/Forgot.jsx"));
const Register = lazy(() => import("./pages/Register/Register.jsx"));
const Shop = lazy(() => import("./pages/Shop/Shop.jsx"));
const Buy = lazy(() => import("./pages/Buy/Buy.jsx"));
const Shipping = lazy(() => import("./pages/Shipping/Shipping.jsx"));
const MyProfile = lazy(() => import("./pages/MyProfile/MyProfile.jsx"));
const Profile = lazy(() => import("./pages/Profile/Profile.jsx"));
const EditProfile = lazy(() => import("./pages/EditProfile/EditProfile.jsx"));
const ViewProfile = lazy(() => import("./pages/ViewProfile/ViewProfile.jsx"));
const QRProfileView = lazy(() => import("./pages/QRProfileView/QRProfileView.jsx"));
function App() {
  return (
    <BrowserRouter>
      {/* ✅ Suspense REQUIRED */}
          <Suspense fallback={<Spinner  />}>
      {/* <Suspense fallback={<div>Loading...</div>}> */}
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/buy" element={<Buy />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/edit-profile/:id" element={<EditProfile/>} />
            <Route path="/profile/:encodedId" element={<ViewProfile/>} />
            <Route path="/profile-details-qr/:encodedCode" element={<QRProfileView />} />
            {/* <Route path="*" element={<h1>404 Not Found</h1>} /> Catch-all route for unmatched paths */}

          </Route>
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;