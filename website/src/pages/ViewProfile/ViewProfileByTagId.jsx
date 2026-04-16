import { useParams } from "react-router-dom";
import {  useGetIndividualProfileByTagIdQuery } from "../../redux/api/profileApi";

export default function ViewProfileByTagId() {

  // const [searchParams] = useSearchParams();
  // const encodedId = searchParams.get("profile_id");
    const { tagId } = useParams();
  
  
    // decode base64 → 6-digit code
    //const code = encodedCode ? atob(encodedCode) : null;
//   const id = encodedId ? atob(encodedId) : null;
    console.log(" ID:",tagId );
  const { data: profile } = useGetIndividualProfileByTagIdQuery(tagId, { skip: !tagId });

  const individualProfile = profile?.data;
  console.log("Individual Profile:", individualProfile);

  const formatDOB = (dob) => {
    if (!dob) return "0000-00-00";
    if (dob.startsWith("1899") || dob.startsWith("1900")) return "0000-00-00";
    return dob.split("T")[0];
  };

  const hasPersonalData =
    individualProfile?.name ||
    individualProfile?.phone ||
    individualProfile?.dob ||
    individualProfile?.gender;

  const hasAddress =
    individualProfile?.address ||
    individualProfile?.city ||
    individualProfile?.state ||
    individualProfile?.pin;

  const allergyData     = profile?.data?.allergy           || [];
  const medicationData  = profile?.data?.medication        || [];
  const insuranceData   = profile?.data?.insurance         || [];
  const conditionData   = profile?.data?.condition         || [];
  const emergencyData   = profile?.data?.emergency_contact || [];
  const vetDetailData   = profile?.data?.insurance         || [];
  const instructionData = profile?.data?.condition         || [];
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
  const capitalize = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
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
                <h2>View Profile</h2>
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
              <div
                className="editimg text-center p-4"
                style={{ border: "1px solid #eee", borderRadius: "10px" }}
              >
                <img
                src={`http://localhost:4000/uploads/${individualProfile?.image}`}
                //   src="/assets/img/profile.jpg"
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                <h4 className="mt-3">{individualProfile?.name}</h4>

                  {/* <p>
                    Your age: {getAge(individualProfile?.dob)},{" "}
                    {capitalize(individualProfile?.city)},{" "}
                    {capitalize(individualProfile?.state)}
                  </p> */}
                  {individualProfile?.profile !=="OTHER" && (
                    <p>
                      Your age: {getAge(individualProfile?.dob)} {capitalize(individualProfile?.city)}
                      {capitalize(individualProfile?.state)}
                    </p>
                  )}
                {/* <h4 className="mt-3">{individualProfile?.name}</h4>
                <p>from {individualProfile?.city || "city"}, {individualProfile?.state || "state"}, INDIA</p> */}
              </div>
            </div>

            {/* RIGHT */}
            <div className="col-lg-8">

              {/* ── PERSONAL ── */}
              {hasPersonalData && (
                <div className="personaledit p-3 mb-4" style={{ border: "1px solid #eee", borderRadius: "10px" }}>
                   <h5 style={{backgroundColor: "red", padding: "10px", color: "white"}}>
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
                          {/* <tr><th>Personal Number:</th><td>{individualProfile?.phone || "-"}</td></tr> */}
                          <tr><th>Birth Date:</th><td>{formatDOB(individualProfile?.dob)}</td></tr>
                          <tr><th>Gender:</th><td>{individualProfile?.gender || "-"}</td></tr>
                          <tr><th>Hair Color:</th><td>{individualProfile?.hair_color || "-"}</td></tr>
                          <tr><th>Eye Color:</th><td>{individualProfile?.eye_color || "-"}</td></tr>
                          <tr><th>Height:</th><td>{individualProfile?.height || "-"}</td></tr>
                          <tr><th>Weight:</th><td>{individualProfile?.weight || "-"}</td></tr>
                          <tr><th>Identification Mark:</th><td>{individualProfile?.identity || "-"}</td></tr>
                          <tr><th>Blood Group:</th><td>{individualProfile?.blood_group || "-"}</td></tr>
                          <tr><th>Breed:</th><td>{individualProfile?.email || "-"}</td></tr>
                        </>)}

                        {individualProfile?.profile === "OTHER" && (<>
                          <tr><th>Phone Number:</th><td>{individualProfile?.phone || "-"}</td></tr>
                          <tr><th>Notes:</th><td>{individualProfile?.notes || "-"}</td></tr>
                        </>)}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ── EMERGENCY CONTACTS (HUMAN) ── */}
              {individualProfile?.profile === "HUMAN" &&  (
                <div className="personaledit p-3 mb-4" style={{ border: "1px solid #eee", borderRadius: "10px" }}>
                   <h5 style={{backgroundColor: "red", padding: "10px", color: "white"}}>EMERGENCY CONTACTS</h5>
                  {emergencyData?.length > 0 && emergencyData?.map((row) => (
                    <div key={row.id} className="table-responsive">
                      <table className="table">
                        <tbody>
                          <tr><th>Mobile:</th><td>{row.mobile || "-"}</td></tr>
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              )}

              {/* ── PET OWNERS (PET) ── */}
              {individualProfile?.profile === "PET" &&  (
                <div className="personaledit p-3 mb-4" style={{ border: "1px solid #eee", borderRadius: "10px" }}>
                   <h5 style={{backgroundColor: "red", padding: "10px", color: "white"}}>PET OWNERS</h5>
                  {emergencyData?.length > 0 && emergencyData?.map((row) => (
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
              {individualProfile?.profile === "OTHER" &&  (
                <div className="personaledit p-3 mb-4" style={{ border: "1px solid #eee", borderRadius: "10px" }}>
                   <h5 style={{backgroundColor: "red", padding: "10px", color: "white"}}>EMERGENCY CONTACTS</h5>
                  {emergencyData?.length > 0 && emergencyData?.map((row) => (
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
                   <h5 style={{backgroundColor: "red", padding: "10px", color: "white"}}>ADDRESS</h5>
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
              {(individualProfile?.profile === "HUMAN" || individualProfile?.profile === "PET") && 
               (
                <div className="personaledit p-3 mb-4" style={{ border: "1px solid #eee", borderRadius: "10px" }}>
                   <h5 style={{backgroundColor: "red", padding: "10px", color: "white"}}>ALLERGIES</h5>
                  {allergyData?.length > 0 && allergyData?.map((row) => (
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
              {(individualProfile?.profile === "HUMAN" || individualProfile?.profile === "PET") && 
               (
                <div className="personaledit p-3 mb-4" style={{ border: "1px solid #eee", borderRadius: "10px" }}>
                   <h5 style={{backgroundColor: "red", padding: "10px", color: "white"}}>MEDICATION</h5>
                  {medicationData?.length > 0 && medicationData?.map((row) => (
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
              {individualProfile?.profile === "HUMAN" &&  (
                <div className="personaledit p-3 mb-4" style={{ border: "1px solid #eee", borderRadius: "10px" }}>
                   <h5 style={{backgroundColor: "red", padding: "10px", color: "white"}}>HEALTH INSURANCE</h5>
                  {insuranceData?.length > 0 && insuranceData?.map((row) => (
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
              {individualProfile?.profile === "HUMAN" &&  (
                <div className="personaledit p-3 mb-4" style={{ border: "1px solid #eee", borderRadius: "10px" }}>
                   <h5 style={{backgroundColor: "red", padding: "10px", color: "white"}}>VITAL MEDICAL CONDITIONS</h5>
                  {conditionData?.length > 0 && conditionData?.map((row) => (
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
              {individualProfile?.profile === "PET" &&  (
                <div className="personaledit p-3 mb-4" style={{ border: "1px solid #eee", borderRadius: "10px" }}>
                   <h5 style={{backgroundColor: "red", padding: "10px", color: "white"}}>VET DETAILS</h5>
                  {vetDetailData?.length > 0 && vetDetailData?.map((row) => (
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
              {individualProfile?.profile === "PET" &&  (
                <div className="personaledit p-3 mb-4" style={{ border: "1px solid #eee", borderRadius: "10px" }}>
                   <h5 style={{backgroundColor: "red", padding: "10px", color: "white"}}>INSTRUCTIONS</h5>
                  {instructionData?.length > 0 && instructionData?.map((row) => (
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
            {/* end RIGHT */}
          </div>
        </div>
      </div>
    </>
  );
}