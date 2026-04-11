

export default function About() {
  return (
    <>
     {/* <!-- ##### Breadcrumb Area Start ##### --> */}
    <section className="breadcrumb-area bg-img bg-overlay jarallax" 
    // style={{ backgroundImage: `url(/assets/img/bg-img/13.jpg)` }}
    style={{ backgroundImage: `url(/assets/img/bg-img/13.jpg)` }}
    >
        {/* <img src="/assets/img/bg-img/13.jpg" alt="" /> */}
        <div className="container h-100">
            <div className="row h-100 align-items-center">
                <div className="col-12">
                    <div className="breadcrumb-content">
                        <h2>About us</h2>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* <!-- ##### Breadcrumb Area End ##### --> */}

  
 {/* <!-- ##### About Area Start ###### --> */}
    <section className="about-area section-padding-100-0">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-12 col-md-6">
                    <div className="about-content mb-100">
                        {/* <!-- Section Heading --> */}
                        <div className="section-heading">
                            <div className="line"></div>
                            <h2>About our company</h2>
                        </div>
                        <h6 className="mb-4">We, Techpromind are an IT based renowned company of Kolkata, it has launched a new project TAGWAY, an application. With continuous practice and update on evolving technology in the area of web designing and development, We realize the importance of your project and that is why we take care of your project sincerely & strong-handedly and even take care about your life.</h6>
                        <p className="mb-0">Our soul and our Humanity refer to caring for helping others whenever and wherever possible. It means helping others at times when they need that help the most. So TAGWAY is faster application to help people to protect life. We believe the more we connect, the more powerful we all are. Our vision is to share a world where everyone can find everything that matters.</p>
                        
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="about-thumbnail mb-100">
                        <img src="/assets/img/bg-img/14.jpg" alt=""/>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* <!-- ##### About Area End ###### --> */}
    </>

  )
}
