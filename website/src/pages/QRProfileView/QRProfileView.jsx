import { useParams } from "react-router-dom";
import { useGetEmergencyContactEmailQuery, useGetIndividualProfileByQRCodeQuery, useSendLocationToMailMutation } from "../../redux/api/profileApi";
import { toast } from "react-toastify";


export default function QRProfileView() {

  const { encodedCode } = useParams();
  console.log("Encoded QR code from URL:", encodedCode);

  // decode base64 → 6-digit code
  const code = encodedCode ? atob(encodedCode) : null;
  console.log("Decoded ID:", code);

  const{data:emergencyContactMail}=useGetEmergencyContactEmailQuery(code,{skip: !code});
  const mailToSend=emergencyContactMail?.email;
  console.log("mail to send",mailToSend);
  const { data, isLoading, isError } = useGetIndividualProfileByQRCodeQuery(code, { skip: !code });

  const individualProfile = data?.data;
  console.log(data)
  const[sendLocationToMail,{isLoading:sendLocationToMailLoading}]=useSendLocationToMailMutation();
  const formatDOB = (dob) => {
    if (!dob) return "-";
    if (dob.startsWith("1899") || dob.startsWith("1900") || dob === "0000-00-00") return "-";
    return dob.split("T")[0];
  };

  const hasPersonalData = individualProfile?.name || individualProfile?.phone || individualProfile?.dob || individualProfile?.gender;
  const hasAddress      = individualProfile?.address || individualProfile?.city || individualProfile?.state || individualProfile?.pin;

  const allergyData     = data?.data?.allergy           || [];
  const medicationData  = data?.data?.medication        || [];
  const insuranceData   = data?.data?.insurance         || [];
  const conditionData   = data?.data?.condition         || [];
  const emergencyData   = data?.data?.emergency_contact || [];
  const vetDetailData   = data?.data?.insurance         || [];
  const instructionData = data?.data?.condition         || [];

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (isError || !individualProfile) {
    return (
      <div className="container mt-5 text-center">
        <h3 style={{color:"black"}}
        className="text-danger">Profile not found</h3>
        <p style={{color:"black"}}
        className="text-muted">This QR code is not linked to any profile yet Or Qr Code has expired.</p>
      </div>
    );
  }
 const getAge = (dob) => {
    if (!dob) return "";

    const birthDate = new Date(dob);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    return `${years} years, ${months} months, ${days} days`;
  };


  // const capitalize = (str) =>
  // str ? str.charAt(0).toUpperCase() + str.slice(1) : "";


//   const handleSendLocation = () => {
//   navigator.geolocation.getCurrentPosition((position) => {
//     const { latitude, longitude } = position.coords;

//     const locationLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

//     // ✅ Open map instantly
//     window.open(locationLink, "_blank");
//   });
// };
const handleSendLocation = () => {


  if (!navigator.geolocation) {
    alert("Geolocation not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;

      const locationLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

      try {
        // ✅ Call backend API
        const res = await sendLocationToMail({
          email: mailToSend,
          locationLink,
        }).unwrap();

        if (res.success) {
          toast.success("Location sent successfully!");
          // alert("Location sent successfully 📩");

          // optional: open map for user
          // window.open(locationLink, "_blank");
        }
      } catch (err) {
        console.error(err);
       toast.error("Unable to send location");
      }
    },
    (error) => {
      console.error(error);
      alert("Unable to fetch location");
    }
  );
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
                <h2>Profile Details</h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Area */}
      <div className="editpage section-padding-100">
        <div className="container">
          <div className="row">

            {/* LEFT */}
            <div className="col-lg-4 mb-4">
              <div className="editimg text-center p-4" style={{ border: "1px solid #eee", borderRadius: "10px" }}>
                {/* <img
                  src={`http://localhost:4000/uploads/${individualProfile?.image}`}
                  alt="profile"
                  style={{ width: "120px", height: "120px", borderRadius: "50%", objectFit: "cover" }}
                //   onError={(e) => { e.target.src = "/assets/img/profile.jpg"; }}
                /> */}
                   <img
              src={
               individualProfile?.image
                  ? `http://localhost:4000/uploads/${individualProfile?.image}`
                  : "/assets/img/logo.png"
               
              }
              alt="profile"
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
            />
                {/* <h4 className="mt-3">{individualProfile?.name}</h4>
                <p>from {individualProfile?.city || "city"}, {individualProfile?.state || "state"}, INDIA</p> */}

                {/* QR code display */}
                {/* {data?.data?.qr?.image && (
                  <div className="mt-3">
                    <img
                      src={`http://localhost:4000/uploads/admin/${data.data.qr.image}`}
                      alt="QR Code"
                      style={{ width: "120px", height: "120px", objectFit: "contain" }}
                    />
                    <p className="text-muted small mt-1">Code: {data.data.qr.code}</p>
                  </div>
                )} */}
                 <h4 className="mt-3">{individualProfile?.name}</h4>

                  {/* <p>
                    Your age: {getAge(individualProfile?.dob)},{" "}
                    {capitalize(individualProfile?.city)},{" "}
                    {capitalize(individualProfile?.state)}
                  </p> */}
                    {individualProfile?.profile !=="OTHER" && (
                    <p>
                      Your age: {getAge(individualProfile?.dob)}
                      {/* {capitalize(individualProfile?.city)}
                      {capitalize(individualProfile?.state)} */}
                    </p>
                  )}
                 {/* <button className="btn btn-dark btn-sm" disabled>
                        <i className="fa fa-link"></i>
                         Send GPS Location
                      </button> */}
                       <button
                       onClick={handleSendLocation}
                       disabled={sendLocationToMailLoading}
                        className="btn btn-dark btn-sm" >
                        <i className="fa fa-link"></i>
                         {sendLocationToMailLoading?"Sending...":"Send GPS Location"}
                      </button>
              </div>
            </div>

            {/* RIGHT */}
            <div className="col-lg-8">

              {/* ── PERSONAL ── */}
              {hasPersonalData && (
                <div className="personaledit p-3 mb-4" style={{ border: "1px solid #eee", borderRadius: "10px" }}>
                  <h5 style={{ backgroundColor: "red", padding: "10px", color: "white" }}>
                    {individualProfile?.profile === "HUMAN" ? "PERSONAL INFORMATION" :
                     individualProfile?.profile === "PET"   ? "PET INFORMATION" : "INFORMATION"}
                  </h5>
                  <div className="table-responsive">
                    <table className="table">
                      <tbody>
                        <tr><th>Name:</th><td>{individualProfile?.name || "-"}</td></tr>

                        {individualProfile?.profile === "HUMAN" && (<>
                          <tr><th>Email:</th><td>{individualProfile?.email || "-"}</td></tr>
                          <tr><th>Personal Number:</th><td>{individualProfile?.phone || "-"}</td></tr>
                          <tr><th>Birth Date:</th><td>{formatDOB(individualProfile?.dob)}</td></tr>
                          <tr><th>Gender:</th><td>{individualProfile?.gender || "-"}</td></tr>
                          <tr><th>Hair Color:</th><td>{individualProfile?.hair_color || "-"}</td></tr>
                          <tr><th>Eye Color:</th><td>{individualProfile?.eye_color || "-"}</td></tr>
                          <tr><th>Height:</th><td>{individualProfile?.height || "-"}</td></tr>
                          <tr><th>Weight:</th><td>{individualProfile?.weight || "-"}</td></tr>
                          <tr><th>Identification Mark:</th><td>{individualProfile?.identity || "-"}</td></tr>
                          <tr><th>Blood Group:</th><td>{individualProfile?.blood_group || "-"}</td></tr>
                        </>)}

                        {individualProfile?.profile === "PET" && (<>
                          <tr><th>Birth Date:</th><td>{formatDOB(individualProfile?.dob)}</td></tr>
                          <tr><th>Gender:</th><td>{individualProfile?.gender || "-"}</td></tr>
                          <tr><th>Hair Color:</th><td>{individualProfile?.hair_color || "-"}</td></tr>
                          <tr><th>Eye Color:</th><td>{individualProfile?.eye_color || "-"}</td></tr>
                          <tr><th>Height:</th><td>{individualProfile?.height || "-"}</td></tr>
                          <tr><th>Weight:</th><td>{individualProfile?.weight || "-"}</td></tr>
                          <tr><th>Identification Mark:</th><td>{individualProfile?.identity || "-"}</td></tr>
                          <tr><th>Blood Group:</th><td>{individualProfile?.blood_group || "-"}</td></tr>
                          <tr><th>Breed:</th><td>{individualProfile?.breed || "-"}</td></tr>
                        </>)}

                        {individualProfile?.profile === "OTHER" && (<>
                          <tr><th>Phone Number:</th><td>{individualProfile?.phone || "-"}</td></tr>
                          <tr><th>Notes:</th><td>{individualProfile?.identity || "-"}</td></tr>
                        </>)}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ── EMERGENCY CONTACTS (HUMAN) ── */}
              {individualProfile?.profile === "HUMAN" && emergencyData.length > 0 && (
                <div className="personaledit p-3 mb-4" style={{ border: "1px solid #eee", borderRadius: "10px" }}>
                  <h5 style={{ backgroundColor: "red", padding: "10px", color: "white" }}>EMERGENCY CONTACTS</h5>
                  {emergencyData.map((row) => (
                    <div key={row.id} className="table-responsive">
                      <table className="table">
                        <tbody>
                          <tr><th>Mobile:</th><td>{row.mobile || "-"}</td></tr>
                            <tr><th>Email:</th><td>{row.email  || "-"}</td></tr>
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              )}

              {/* ── PET OWNERS (PET) ── */}
              {individualProfile?.profile === "PET" && emergencyData.length > 0 && (
                <div className="personaledit p-3 mb-4" style={{ border: "1px solid #eee", borderRadius: "10px" }}>
                  <h5 style={{ backgroundColor: "red", padding: "10px", color: "white" }}>PET OWNERS</h5>
                  {emergencyData.map((row) => (
                    <div key={row.id} className="table-responsive">
                      <table className="table">
                        <tbody>
                          <tr><th>Name:</th><td>{row.name || "-"}</td></tr>
                          <tr><th>Relationship:</th><td>{row.relation || "-"}</td></tr>
                          <tr><th>Mobile:</th><td>{row.mobile || "-"}</td></tr>
                          <tr><th>Email:</th><td>{row.email || "-"}</td></tr>
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              )}

              {/* ── EMERGENCY CONTACTS (OTHER) ── */}
              {individualProfile?.profile === "OTHER" && emergencyData.length > 0 && (
                <div className="personaledit p-3 mb-4" style={{ border: "1px solid #eee", borderRadius: "10px" }}>
                  <h5 style={{ backgroundColor: "red", padding: "10px", color: "white" }}>EMERGENCY CONTACTS</h5>
                  {emergencyData.map((row) => (
                    <div key={row.id} className="table-responsive">
                      <table className="table">
                        <tbody>
                          <tr><th>Mobile:</th><td>{row.mobile || "-"}</td></tr>
                          <tr><th>Email:</th><td>{row.email  || "-"}</td></tr>
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              )}

              {/* ── ADDRESS ── */}
              {(individualProfile?.profile === "HUMAN" || individualProfile?.profile === "PET") && hasAddress && (
                <div className="personaledit p-3 mb-4" style={{ border: "1px solid #eee", borderRadius: "10px" }}>
                  <h5 style={{ backgroundColor: "red", padding: "10px", color: "white" }}>ADDRESS</h5>
                  <div className="table-responsive">
                    <table className="table">
                      <tbody>
                        <tr><th>Address:</th><td>{individualProfile?.address || "-"}</td></tr>
                        <tr><th>City:</th><td>{individualProfile?.city    || "-"}</td></tr>
                        <tr><th>State:</th><td>{individualProfile?.state   || "-"}</td></tr>
                        <tr><th>Pin:</th><td>{individualProfile?.pin     || "-"}</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ── ALLERGIES ── */}
              {(individualProfile?.profile === "HUMAN" || individualProfile?.profile === "PET") && allergyData.length > 0 && (
                <div className="personaledit p-3 mb-4" style={{ border: "1px solid #eee", borderRadius: "10px" }}>
                  <h5 style={{ backgroundColor: "red", padding: "10px", color: "white" }}>ALLERGIES</h5>
                  {allergyData.map((row) => (
                    <div key={row.id} className="table-responsive">
                      <table className="table">
                        <tbody>
                          <tr><th>Name:</th><td>{row.allergy_name  || "-"}</td></tr>
                          <tr><th>Notes:</th><td>{row.allergy_notes || "-"}</td></tr>
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              )}

              {/* ── MEDICATION ── */}
              {(individualProfile?.profile === "HUMAN" || individualProfile?.profile === "PET") && medicationData.length > 0 && (
                <div className="personaledit p-3 mb-4" style={{ border: "1px solid #eee", borderRadius: "10px" }}>
                  <h5 style={{ backgroundColor: "red", padding: "10px", color: "white" }}>MEDICATION</h5>
                  {medicationData.map((row) => (
                    <div key={row.id} className="table-responsive">
                      <table className="table">
                        <tbody>
                          <tr><th>Medicine Name:</th><td>{row.medicine_name  || "-"}</td></tr>
                          <tr><th>Notes:</th><td>{row.medicine_notes || "-"}</td></tr>
                          <tr><th>Dosage:</th><td>{row.dosage         || "-"}</td></tr>
                          <tr><th>Dosage Unit:</th><td>{row.dosage_unit    || "-"}</td></tr>
                          <tr><th>Frequency:</th><td>{row.frequency      || "-"}</td></tr>
                          <tr><th>Frequency Time:</th><td>{row.frequency_time || "-"}</td></tr>
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              )}

              {/* ── HEALTH INSURANCE (HUMAN only) ── */}
              {individualProfile?.profile === "HUMAN" && insuranceData.length > 0 && (
                <div className="personaledit p-3 mb-4" style={{ border: "1px solid #eee", borderRadius: "10px" }}>
                  <h5 style={{ backgroundColor: "red", padding: "10px", color: "white" }}>HEALTH INSURANCE</h5>
                  {insuranceData.map((row) => (
                    <div key={row.id} className="table-responsive">
                      <table className="table">
                        <tbody>
                          <tr><th>Insurance Name:</th><td>{row.insurance_name  || "-"}</td></tr>
                          <tr><th>Insurance Notes:</th><td>{row.insurance_notes || "-"}</td></tr>
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              )}

              {/* ── VITAL MEDICAL CONDITIONS (HUMAN only) ── */}
              {individualProfile?.profile === "HUMAN" && conditionData.length > 0 && (
                <div className="personaledit p-3 mb-4" style={{ border: "1px solid #eee", borderRadius: "10px" }}>
                  <h5 style={{ backgroundColor: "red", padding: "10px", color: "white" }}>VITAL MEDICAL CONDITIONS</h5>
                  {conditionData.map((row) => (
                    <div key={row.id} className="table-responsive">
                      <table className="table">
                        <tbody>
                          <tr><th>Condition Name:</th><td>{row.condition_name  || "-"}</td></tr>
                          <tr><th>Notes:</th><td>{row.condition_notes || "-"}</td></tr>
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              )}

              {/* ── VET DETAILS (PET only) ── */}
              {individualProfile?.profile === "PET" && vetDetailData.length > 0 && (
                <div className="personaledit p-3 mb-4" style={{ border: "1px solid #eee", borderRadius: "10px" }}>
                  <h5 style={{ backgroundColor: "red", padding: "10px", color: "white" }}>VET DETAILS</h5>
                  {vetDetailData.map((row) => (
                    <div key={row.id} className="table-responsive">
                      <table className="table">
                        <tbody>
                          <tr><th>Name:</th><td>{row.insurance_name  || "-"}</td></tr>
                          <tr><th>Address:</th><td>{row.insurance_notes || "-"}</td></tr>
                          <tr><th>Phone:</th><td>{row.insurance_phone || "-"}</td></tr>
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              )}

              {/* ── INSTRUCTIONS (PET only) ── */}
              {individualProfile?.profile === "PET" && instructionData.length > 0 && (
                <div className="personaledit p-3 mb-4" style={{ border: "1px solid #eee", borderRadius: "10px" }}>
                  <h5 style={{ backgroundColor: "red", padding: "10px", color: "white" }}>INSTRUCTIONS</h5>
                  {instructionData.map((row) => (
                    <div key={row.id} className="table-responsive">
                      <table className="table">
                        <tbody>
                          <tr><th>Title:</th><td>{row.condition_name  || "-"}</td></tr>
                          <tr><th>Notes:</th><td>{row.condition_notes || "-"}</td></tr>
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}