import { NavLink, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "./Home.css";
import { toast } from "react-toastify";
import { useState } from "react";
import { useGetAllCustomerSayQuery, useGetAllSliderImagesQuery, useGetAllTagTextQuery, useGetAllWorks2Query, useGetAllWorksQuery } from "../../redux/api/homeWebsiteApi";

export default function Home() {

  const navigate = useNavigate();
  const[tagId, setTagId] = useState("");

  const { data: tagTextData } = useGetAllTagTextQuery();
const { data: worksData } = useGetAllWorksQuery();
const { data: works2Data } = useGetAllWorks2Query();
const { data: customerSayData } = useGetAllCustomerSayQuery();
const { data: sliderData } = useGetAllSliderImagesQuery();
  const handleViewProfileByTagId = () => {
    if(!tagId){
      toast.error("Please enter a tag id");
      return;
    }
    navigate(`/profile-details-tag/${tagId}`);
  };
    return (
        <>
            {/* <!-- ##### Hero Area Start ##### --> */}
   <div className="hero-area">
  <Swiper
    modules={[Autoplay, Pagination, Navigation]}
    loop={true}
    autoplay={{
      delay: 4000,
      disableOnInteraction: false,
    }}
    pagination={{ clickable: true }}
    //navigation={true}   // ✅ ENABLE THIS
    style={{ height: "600px" }}
    className="hero-slideshow"
  >

    
    {/* <SwiperSlide>
      <div className="single-slide bg-img" style={{ minHeight: "600px" }}>
        
        <div
          className="slide-bg-img bg-img bg-overlay"
          style={{
            backgroundImage: "url(/assets/img/slider1.jpg)",
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        ></div>

        <div className="container h-100">
          <div className="row h-100 align-items-center justify-content-center">
            <div className="col-12 col-lg-9">
              <div className="welcome-text text-center">
                <h2>FIX IT <span>OR</span> SEDATE IT</h2>
                <p>
                  In case of an emergency situation tagway provides important
                  information through QR scanning.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </SwiperSlide>

   
    <SwiperSlide>
      <div className="single-slide bg-img" style={{ minHeight: "600px" }}>
        
        <div
          className="slide-bg-img bg-img bg-overlay"
          style={{
            backgroundImage: "url(/assets/img/slider2.jpg)",
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        ></div>

        <div className="container h-100">
          <div className="row h-100 align-items-center justify-content-center">
            <div className="col-12 col-lg-9">
              <div className="welcome-text text-center">
                <h2>FIX IT <span>OR</span> SEDATE IT</h2>
                <p>
                  In case of an emergency situation tagway provides important
                  information through QR scanning to save as many lives or products as possible.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </SwiperSlide> */}

    {sliderData?.data?.map((item, index) => (
        <SwiperSlide key={index}>
          <div className="single-slide bg-img" style={{ minHeight: "600px" }}>
            
            <div
              className="slide-bg-img bg-img bg-overlay"
              style={{
                  backgroundImage: `url(http://localhost:4000/uploads/${item.image})`,
                position: "absolute",
                width: "100%",
                height: "100%",
              }}
            ></div>

            <div className="container h-100">
              <div className="row h-100 align-items-center justify-content-center">
                <div className="col-12 col-lg-9">
                  <div className="welcome-text text-center">
                    <h2>FIX IT <span>OR</span> SEDATE IT</h2>
                    <p>
                      In case of an emergency situation tagway provides important
                      information through QR scanning to save as many lives or products as possible.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </SwiperSlide>
      ))}

  </Swiper>
</div>
<section className="login-futuristic">
  <div className="container">

    <div className="login-glass">

      {/* <!-- LEFT --> */}
      <div className="login-text">
        <h2>FIRST LOGIN</h2>
        <p>Scan. Identify. Save Lives.</p>
      </div>

      {/* <!-- RIGHT --> */}
      <form className="login-form-future">

        <div className="input-group">
          <i style={{marginTop:"14px"}}
          className="fa fa-id-card"></i>
          <input 
          onChange={(e)=>setTagId(e.target.value)}
          type="text" placeholder="Enter Your TAG ID" required/>
        </div>

        <button onClick={handleViewProfileByTagId}
         type="button">
          VIEW DATA <i className="fa fa-arrow-right"></i>
        </button>

      </form>

    </div>

  </div>
</section>
            {/* <!-- ##### Hero Area End ##### --> */}

             {/* <!-- ##### Features Area Start ###### --> */}
    {/* <section className="features-area section-padding-100-0">
        <div className="container">
            <div className="row align-items-end">
                <div className="col-12 col-sm-6 col-lg-3">
                    <div className="single-features-area mb-100 wow fadeInUp" data-wow-delay="100ms">
                        {/* <!-- Section Heading --> 
                        <div className="section-heading">
                            <div className="line"></div>
                            <p>Welcome to Our Website</p>
                            <h2>WHY TAGWAY</h2>
                        </div>
                        <h6>User friendly 
                            and helpful technology through TAGWAY that provides most needful information to get faster communication to find-out.</h6>
                        {/* <!-- <a href="#" className="btn credit-btn mt-50">Discover</a> --> 
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-lg-3">
                    <div className="single-features-area mb-100 wow fadeInUp" data-wow-delay="300ms">
                        <img src="/assets/img/bg-img/2.jpg" alt=""/>
                        <h5>ONE STEP PROCESS</h5>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-lg-3">
                    <div className="single-features-area mb-100 wow fadeInUp" data-wow-delay="500ms">
                        <img src="/assets/img/bg-img/3.jpg" alt=""/>
                        <h5>PROFILE SPEAK</h5>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-lg-3">
                    <div className="single-features-area mb-100 wow fadeInUp" data-wow-delay="700ms">
                        <img src="/assets/img/bg-img/4.jpg" alt=""/>
                        <h5>TRUSTED AND SECURE</h5>
                    </div>
                </div>
            </div>
        </div>
    </section> */}
      <section className="features-modern">
  <div className="container">

    {/* <!-- Heading --> */}
    <div className="text-center mb-5">
      <h2 className="main-title">WHY TAGWAY</h2>
      <p className="sub-title">
        User friendly and helpful technology through TAGWAY that provides most needful information to get faster communication to find-out.
      </p>
    </div>

    {/* <!-- Cards --> */}
    <div className="row">

     
      {/* <div className="col-md-4">
        <div className="feature-card">
          <div className="icon">⚡</div>
          <h5>ONE STEP PROCESS</h5>
          <p>Any time and anywhere through QR scan you will get faster connect to get important information within few seconds.</p>
        </div>
      </div>

      
      <div className="col-md-4">
        <div className="feature-card">
          <div className="icon">👤</div>
          <h5>PROFILE SPEAK</h5>
          <p>In your absence, TAGWAY will reach with all the information to understand who you are and where to contact.</p>
        </div>
      </div>

      
      <div className="col-md-4">
        <div className="feature-card">
          <div className="icon">🔒</div>
          <h5>TRUSTED & SECURE</h5>
          <p>In this life saving application you can store all of your medical history, medication, doctor and insurance details.</p>
        </div>
      </div> */}
      {tagTextData?.data?.map((item) => (
        <div key={item?.id}
        className="col-md-4">
        <div className="feature-card">
          {/* <div className="icon">{item.icon}</div> */}
          <h5>{item?.title}</h5>
          <p>{item?.text}</p>
        </div>
      </div>
      ))}

    </div>

  </div>
</section>
    {/* <!-- ##### Features Area End ###### --> */}

     {/* <!-- ##### Call To Action Start ###### --> */}

     <section className="cta-area d-flex flex-wrap">

      {/* Cta Thumbnail */}
      <div
        className="cta-thumbnail bg-img jarallax"
        style={{ backgroundImage: "url(/assets/img/bg-img/5.jpg)" }}
      ></div>

      {/* Cta Content */}
      <div className="cta-content">

        {/* Section Heading */}
        <div className="section-heading white">
          <div className="line"></div>
          <h2>Access Points To Preview Your Profile</h2>
          <p>
            It makes fast and easy for First Responders to access your profile
          </p>
        </div>

        <h6>
          There are two options to access your profile in case of an emergency.
          You can either scan the QR code or visit the website. To scan the QR
          code, you can use apps like Google Lens, Paytm, your mobile camera, or
          any QR code scanner app. Alternatively, you can visit the website at
          www.tagway.co.in and enter your unique ID and PIN to access the profile
          information quickly and easily.
        </h6>

        <div className="d-flex flex-wrap mt-50">

          {/* Single Skills Area */}
          {/* 
          <div className="single-skils-area mb-70 mr-5">
            <div id="circle" className="circle" data-value="0.90">
              <div className="skills-text">
                <span>90%</span>
              </div>
            </div>
            <p>Energy</p>
          </div> 
          */}

          {/* Single Skills Area */}
          {/* 
          <div className="single-skils-area mb-70 mr-5">
            <div id="circle2" className="circle" data-value="0.75">
              <div className="skills-text">
                <span>75%</span>
              </div>
            </div>
            <p>power</p>
          </div> 
          */}

          {/* Single Skills Area */}
          {/* 
          <div className="single-skils-area mb-70">
            <div id="circle3" className="circle" data-value="0.97">
              <div className="skills-text">
                <span>97%</span>
              </div>
            </div>
            <p>resource</p>
          </div> 
          */}

        </div>

        {/* 
        <a href="#" className="btn credit-btn box-shadow btn-2">
          Read More
        </a> 
        */}

      </div>
    </section>
    {/* <section className="cta-area d-flex flex-wrap">
        {/* <!-- Cta Thumbnail --> 
        <div className="cta-thumbnail bg-img jarallax" 
        style={{ backgroundImage: `url(/assets/img/bg-img/13a.jpg)` }}
        >
            {/* <img src="/assets/img/bg-img/5.jpg" alt="" /> 


        </div>

        {/* <!-- Cta Content --> 
        <div className="cta-content">
           
            <div className="section-heading white">
                <div className="line"></div>
                <h2>Access Points To Preview Your Profile</h2>
                <p>It makes fast and easy for First Responders to access your profile</p>
            </div>
            <h6>There are two options to access your profile in case of an emergency. You can either scan the QR code or visit the website. To scan the QR code, you can use apps like Google Lens, Paytm, your mobile camera, or any QR code scanner app. Alternatively, you can visit the website at www.tagway.co.in
 and enter your unique ID and PIN to access the profile information quickly and easily.</h6>
            {/* <div className="d-flex flex-wrap mt-50">
                {/* <!-- Single Skills Area --> 
                <div className="single-skils-area mb-70 mr-5">
                    <div id="circle" className="circle" data-value="0.90">
                        <div className="skills-text">
                            <span>90%</span>
                        </div>
                    </div>
                    <p>Energy</p>
                </div>

               
                <div className="single-skils-area mb-70 mr-5">
                    <div id="circle2" className="circle" data-value="0.75">
                        <div className="skills-text">
                            <span>75%</span>
                        </div>
                    </div>
                    <p>power</p>
                </div>

             
                <div className="single-skils-area mb-70">
                    <div id="circle3" className="circle" data-value="0.97">
                        <div className="skills-text">
                            <span>97%</span>
                        </div>
                    </div>
                    <p>resource</p>
                </div>
            </div> */}
            {/* <div className="d-flex flex-wrap mt-50">

  {/* Energy 
  <div className="single-skils-area mb-70 mr-5 text-center">
    <svg width="120" height="120">
      <circle
        cx="60"
        cy="60"
        r="50"
        
        strokeWidth="8"
        fill="none"
      />
      <circle
        cx="60"
        cy="60"
        r="50"
        stroke="white"
        strokeWidth="8"
        fill="none"
        strokeDasharray={2 * Math.PI * 50}
        strokeDashoffset={2 * Math.PI * 50 * (1 - 0.9)}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 1s ease" }}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="16"
        fontWeight="bold"
        fill="white"
      >
        90%
      </text>
    </svg>
    <p>Easy Access</p>
  </div>

  {/* Power 
  <div className="single-skils-area mb-70 mr-5 text-center">
    <svg width="120" height="120">
      <circle cx="60" cy="60" r="50"  strokeWidth="8" fill="none" />
      <circle
        cx="60"
        cy="60"
        r="50"
        stroke="white"
        strokeWidth="8"
        fill="none"
        strokeDasharray={2 * Math.PI * 50}
        strokeDashoffset={2 * Math.PI * 50 * (1 - 0.75)}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 1s ease" }}
      />
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize="16" fill="white"
      fontWeight="bold">
        85%
      </text>
    </svg>
    <p>Smart Technology</p>
  </div>

  {/* Resource
  <div className="single-skils-area mb-70 text-center">
    <svg width="120" height="120">
      <circle cx="60" cy="60" r="50"  strokeWidth="8" fill="none" />
      <circle
        cx="60"
        cy="60"
        r="50"
        stroke="white"
        strokeWidth="8"
        fill="none"
        strokeDasharray={2 * Math.PI * 50}
        strokeDashoffset={2 * Math.PI * 50 * (1 - 0.97)}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 1s ease" }}
      />
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize="16" fill="white"
      fontWeight="bold">
        97%
      </text>
    </svg>
    <p>Quick Response</p>
  </div>

</div> 
            {/* <NavLink to="/#" className="btn credit-btn box-shadow btn-2">Read More</NavLink> 
        </div>
    </section> */}
    {/* <!-- ##### Call To Action End ###### --> */}

      {/* <!-- ##### Services Area Start ###### --> */}


<section className="services-area section-padding-100">
      <div className="container">

        <div className="row justify-content-center">
          
          <div className="col-lg-6">

            {/* Heading */}
            <div className="text-center mb-5">
              <h2 style={{ color: "red" }}>HOW IT WORKS</h2>

              <h5 style={{ color: "limegreen", fontWeight: 600 }}>
                Easy to Use – Easy to Edit – Easy to Access – Easy to Find
              </h5>

              {/* <p style={{ marginTop: "15px" }}>
                TAGWAY is a user friendly and helpful technology through QR scan
                you will get faster connect to get important information within a
                few seconds.
              </p> */}
              {worksData?.data?.map((work, index) => {
                return (
                  <p key={index}
                  style={{ marginTop: "15px" }}>
                    {work?.text}
                  </p>
                );
              })}
            </div>

            {/* Points */}
            <div className="row">

              {/* <div className="col-md-6 mb-3">
                <div className="single-service-area d-flex align-items-start">
                  <div
                    className="icon mr-3"
                    style={{ color: "limegreen" }}
                  >
                    <i className="fa fa-check-circle"></i>
                  </div>
                  <div className="text">
                    <p>Easy to access through QR Tag.</p>
                  </div>
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <div className="single-service-area d-flex align-items-start">
                  <div
                    className="icon mr-3"
                    style={{ color: "limegreen" }}
                  >
                    <i className="fa fa-check-circle"></i>
                  </div>
                  <div className="text">
                    <p>
                      Easy to edit your profile from any where any time.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <div className="single-service-area d-flex align-items-start">
                  <div
                    className="icon mr-3"
                    style={{ color: "limegreen" }}
                  >
                    <i className="fa fa-check-circle"></i>
                  </div>
                  <div className="text">
                    <p>Easy to manage your medical information.</p>
                  </div>
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <div className="single-service-area d-flex align-items-start">
                  <div
                    className="icon mr-3"
                    style={{ color: "limegreen" }}
                  >
                    <i className="fa fa-check-circle"></i>
                  </div>
                  <div className="text">
                    <p>Easy to find your information.</p>
                  </div>
                </div>
              </div> */}

              {works2Data?.data?.map((work2) => {
                return (
                  <div key={work2?.id}
                  className="col-md-6 mb-3">
                    <div className="single-service-area d-flex align-items-start">
                      <div
                        className="icon mr-3"
                        style={{ color: "limegreen" }}
                      >
                        <i className="fa fa-check-circle"></i>
                      </div>
                      <div className="text">
                        <p>{work2?.text}</p>
                      </div>
                    </div>
                  </div>
                );
              })}

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="col-lg-6" style={{ position: "relative", minHeight: "400px" }}>

            {/* Background Image */}
            <div
              style={{
                backgroundImage: "url('/assets/img/video-bg.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100%",
                width: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 1,
              }}
            ></div>

            {/* Overlay */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0,0,0,0.6)",
                zIndex: 2,
              }}
            ></div>

            {/* Content */}
            <div
              className="container h-100 textbox"
              style={{ position: "relative", zIndex: 3 }}
            >
              <div className="row h-100 align-items-center justify-content-center text-center">
                <div className="col-12">

                  <h3
                    className="text"
                    style={{ color: "#fff", marginBottom: "15px" }}
                  >
                    How to Use TAGWAY
                  </h3>

                  <a
                    href="https://youtu.be/budVxjULDmw"
                    className="video-btn"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fa fa-play"></i>
                  </a>

                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
{/* <section className="services-area section-padding-100">
    <div className="container">

        <div className="row justify-content-center">
            <div className="col-lg-10">

                {/* <!-- Heading --> 
                <div className="text-center mb-5">
                    <h2     style={{color:"red"}}>HOW IT WORKS</h2>
                    <h5 style={{color:"white", fontWeight:"600"}}>
                        Easy to Use - Easy to Edit - Easy to Access - Easy to Find
                    </h5>
                    <p style={{marginTop:"15px"}}>
                        TAGWAY is a user friendly and helpful technology through QR scan you will get faster connect to get important information within a few seconds.
                    </p>
                </div>

                {/* <!-- Points --> 
                <div className="row">

                    <div className="col-md-6 mb-3">
                        <div className="single-service-area d-flex align-items-start">
                            <div className="icon mr-3" style={{color:"limegreen"}}>
                                <i className="fa fa-check-circle"></i>
                            </div>
                            <div className="text">
                                <p>Easy to access through QR Tag.</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 mb-3">
                        <div className="single-service-area d-flex align-items-start">
                            <div className="icon mr-3" style={{color:"limegreen"}}>
                                <i className="fa fa-check-circle"></i>
                            </div>
                            <div className="text">
                                <p>Easy to edit your profile from any where any time.</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 mb-3">
                        <div className="single-service-area d-flex align-items-start">
                            <div className="icon mr-3" style={{color:"limegreen"}}>
                                <i className="fa fa-check-circle"></i>
                            </div>
                            <div className="text">
                                <p>Easy to manage your medical information.</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 mb-3">
                        <div className="single-service-area d-flex align-items-start">
                            <div className="icon mr-3" style={{color:"limegreen"}}>
                                <i className="fa fa-check-circle"></i>
                            </div>
                            <div className="text">
                                <p>Easy to find your information.</p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>

    </div>
</section> */}

{/* <!-- ##### Video Section Start ##### --> */}
{/* style="position:relative; height:280px; overflow:hidden;" */}
{/* <section className="video-area" style={{position:"relative",height:"280px",overflow:"hidden"}} >
    
    {/* <!-- Background Image --> */}
    {/* <div style="
        background-image:url('img/video-bg.png');
        background-size:cover;
        background-position:center;
        height:100%;
        width:100%;
        position:absolute;
        top:0;
        left:0;
        z-index:1;
    "></div> 
    <div style={{
        backgroundImage: `url(/assets/img/video-bg.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100%",
        width: "100%",
        position: "absolute",
        top: "0",
        left: "0",
        zIndex: "1",
    }}></div>

    {/* <!-- Overlay -->
    {/* <div style="
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background:rgba(0,0,0,0.6);
        z-index:2;
    "></div> 
    <div style={{
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.6)",
        zIndex: "2",
    }}></div>

    {/* <!-- Content --> *
    <div className="container h-100" style={{position:"relative",zIndex:"3"}}>
        <div className="row h-100 align-items-center justify-content-center text-center">
            <div className="col-12">
    {/* style="color:#fff; margin-bottom:15px;" 
                <h3 style={{color:"#fff", marginBottom:"15px"}}>How to Use TAGWAY</h3>

                {/* <!-- Play Button --> 
                {/* href="https://youtu.be/budVxjULDmw" 
                <NavLink to="https://youtu.be/budVxjULDmw" className="video-btn" target="_blank">
                    <i className="fa fa-play"></i>
                </NavLink>

            </div>
        </div>
    </div>
</section> */}
{/* <!-- ##### Video Section End ##### --> */}
    {/* <!-- ##### Services Area End ###### --> */}

    {/* <!-- ##### Newsletter Area Start ###### --> */}
     {/* <section className="testimonial-area section-padding-100 bg-gray">
      <div className="container">

        {/* Heading 
        <div className="row">
          <div className="col-12">
            <div className="section-heading text-center mb-70">
              <div className="line"></div>
              <h2 style={{ color: "red" }}>
                WHAT OUR CUSTOMERS ARE SAYING
              </h2>
            </div>
          </div>
        </div>

        {/* Slider 
        <div className="row">
          <div className="col-12">
            <div className="testimonial-slides owl-carousel">

              {/* Single 
              <div className="single-testimonial-area text-center px-3">
                <div
                  className="p-4"
                  style={{ border: "1px solid #eee", borderRadius: "10px" }}
                >
                  <i
                    className="fa fa-quote-left mb-3"
                    style={{ color: "limegreen", fontSize: "22px" }}
                  ></i>
                  <p>
                    TAGWAY has been such a life saver for me. I have several
                    chronic illnesses and now I can always keep my information
                    with me.
                  </p>
                  <h5 className="mt-3 mb-0">Sangita Dey</h5>
                  <span style={{ color: "red" }}>Doctor</span>
                </div>
              </div>

              {/* Single 
              <div className="single-testimonial-area text-center px-3">
                <div
                  className="p-4"
                  style={{ border: "1px solid #eee", borderRadius: "10px" }}
                >
                  <i
                    className="fa fa-quote-left mb-3"
                    style={{ color: "limegreen", fontSize: "22px" }}
                  ></i>
                  <p>
                    I've been a diabetic for years and TAGWAY makes me feel much
                    safer. Amazing and helpful product.
                  </p>
                  <h5 className="mt-3 mb-0">Subham Das</h5>
                  <span style={{ color: "red" }}>Lawyer</span>
                </div>
              </div>

              {/* Single 
              <div className="single-testimonial-area text-center px-3">
                <div
                  className="p-4"
                  style={{ border: "1px solid #eee", borderRadius: "10px" }}
                >
                  <i
                    className="fa fa-quote-left mb-3"
                    style={{ color: "limegreen", fontSize: "22px" }}
                  ></i>
                  <p>
                    Very easy to use and super useful in emergencies. Everyone
                    should have this.
                  </p>
                  <h5 className="mt-3 mb-0">Rahul Sen</h5>
                  <span style={{ color: "red" }}>User</span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section> */}
    <section className="testimonial-area section-padding-100 bg-gray">
      <div className="container">

        {/* Heading */}
        <div className="row">
          <div className="col-12">
            <div className="section-heading text-center mb-70">
              <div className="line"></div>
              <h2 style={{ color: "red" }}>
                WHAT OUR CUSTOMERS ARE SAYING
              </h2>
            </div>
          </div>
        </div>

        {/* Slider */}
        <div className="row">
          <div className="col-12">

            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              loop={true}
              autoplay={{ delay: 2500 }}
              // pagination={{ clickable: true }}
              breakpoints={{
                768: { slidesPerView: 2 },
                992: { slidesPerView: 2 },
              }}
            >

              {/* Single */}
              {/* <SwiperSlide>
                <div className="single-testimonial-area text-center px-3">
                  <div
                    className="p-4"
                    style={{ border: "1px solid #eee", borderRadius: "10px" }}
                  >
                    <i
                      className="fa fa-quote-left mb-3"
                      style={{ color: "limegreen", fontSize: "22px" }}
                    ></i>
                    <p>
                      TAGWAY has been such a life saver for me. I have several
                      chronic illnesses and now I can always keep my information
                      with me.
                    </p>
                    <h5 className="mt-3 mb-0">Sangita Dey</h5>
                    <span style={{ color: "red" }}>Doctor</span>
                  </div>
                </div>
              </SwiperSlide>

          
              <SwiperSlide>
                <div className="single-testimonial-area text-center px-3">
                  <div
                    className="p-4"
                    style={{ border: "1px solid #eee", borderRadius: "10px" }}
                  >
                    <i
                      className="fa fa-quote-left mb-3"
                      style={{ color: "limegreen", fontSize: "22px" }}
                    ></i>
                    <p>
                      I've been a diabetic for years and TAGWAY makes me feel
                      much safer. Amazing and helpful product.
                    </p>
                    <h5 className="mt-3 mb-0">Subham Das</h5>
                    <span style={{ color: "red" }}>Lawyer</span>
                  </div>
                </div>
              </SwiperSlide>

             
              <SwiperSlide>
                <div className="single-testimonial-area text-center px-3">
                  <div
                    className="p-4"
                    style={{ border: "1px solid #eee", borderRadius: "10px" }}
                  >
                    <i
                      className="fa fa-quote-left mb-3"
                      style={{ color: "limegreen", fontSize: "22px" }}
                    ></i>
                    <p>
                      Very easy to use and super useful in emergencies. Everyone
                      should have this.
                    </p>
                    <h5 className="mt-3 mb-0">Rahul Sen</h5>
                    <span style={{ color: "red" }}>User</span>
                  </div>
                </div>
              </SwiperSlide> */}
              {customerSayData?.data?.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="single-testimonial-area text-center px-3">
                    <div
                      className="p-4"
                      style={{ border: "1px solid #eee", borderRadius: "10px" }}
                    >
                      <i
                        className="fa fa-quote-left mb-3"
                        style={{ color: "limegreen", fontSize: "22px" }}
                      ></i>
                      <p>{item?.text}</p>
                      <h5 className="mt-3 mb-0">{item?.title}</h5>
                      <span style={{ color: "red" }}>{item?.post}</span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}

            </Swiper>

          </div>
        </div>

      </div>
    </section>
 {/* <!-- ##### Newsletter Area End ###### --> */}
        </>
    )
}
