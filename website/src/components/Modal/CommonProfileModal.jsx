// import { useRef } from "react";

// const CommonProfileModal = ({ id, title, fields = [], formData, setFormData, onSave }) => {
//   const modalRef = useRef(null);
//   console.log("Modal Rendered with formData:", formData);
//   const handleChange = (e, name) => {
//     setFormData({
//       ...formData,
//       [name]: e.target.value,
//     });
//   };

//   const closeModal = () => {
//     const modalEl = modalRef.current;

//     // 🔥 move focus OUTSIDE modal (important)
//     document.body.focus();

//     const modalInstance = window.bootstrap.Modal.getInstance(modalEl);
//     modalInstance?.hide();
//   };

//   const handleSaveClick = () => {
//     onSave();
//     closeModal();
//   };

//   return (
//     <div
//       className="modal fade"
//       id={id}
//       tabIndex="-1"
//       ref={modalRef}
//     >
//       <div className="modal-dialog">
//         <div className="modal-content">

//           <div className="modal-body">
//             <h5>{title}</h5>

//             {fields.map((field, index) => {
//               if (field.type === "select") {
//                 return (
//                   <select
//                     key={index}
//                     className="form-control mb-2"
//                     value={formData[field.name] || ""}
//                     onChange={(e) => handleChange(e, field.name)}
//                   >
//                     {field.options.map((opt, i) => (
//                       <option key={i}>{opt}</option>
//                     ))}
//                   </select>
//                 );
//               }

//               return (
//                 // <input
//                 //   key={index}
//                 //   type={field.type || "text"}
//                 //   className="form-control mb-2"
//                 //   placeholder={field.placeholder}
//                 //   value={formData[field.name] || ""}
//                 //   onChange={(e) => handleChange(e, field.name)}
//                 // />
//                 <input
//                   key={index}
//                   type={field.type || "text"}
//                   className="form-control mb-2"
//                   placeholder={field.placeholder}
//                   value={formData[field.name] || ""}
//                   maxLength={
//                     field.name === "mobile" || field.name === "phone" ? 10 :
//                     field.name === "pin" ? 6 :
//                     undefined
//                   } // ✅ limit 10 digits for mobile/phone, 6 for pincode
//                   onChange={(e) => {
//                     let value = e.target.value;

//                     // 🔥 only digits for mobile/phone/pincode
//                     if (field.name === "mobile" || field.name === "phone" 
//                       || field.name === "pin") {
//                       if (!/^\d*$/.test(value)) return; // ❌ block non-digits
//                     }

//                     handleChange(e, field.name);
//                   }}
//                 />
//               );
//             })}
//           </div>

//           <div className="modal-footer">
//             <button
//               className="btn btn-secondary"
//               onClick={closeModal}
//             >
//               Close
//             </button>

//             <button
//               className="btn btn-primary"
//               onClick={handleSaveClick}
//             >
//               Save
//             </button>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default CommonProfileModal;

import { useRef } from "react";

const CommonProfileModal = ({
  id,
  title,
  fields = [],
  formData,
  setFormData,
  onSave,
  onDelete,     // 👈 new
  cardId,        // 👈 new
  cardIssueDate,  // 👈 new,
  loading

}) => {
  const modalRef = useRef(null);

  const handleChange = (e, name) => {
    setFormData({
      ...formData,
      [name]: e.target.value,
    });
  };

  const closeModal = () => {
    const modalEl = modalRef.current;
    document.body.focus();

    const modalInstance = window.bootstrap.Modal.getInstance(modalEl);
    modalInstance?.hide();
  };

  const handleSaveClick = () => {
    onSave();
    closeModal();
  };

  const handleDeleteClick = () => {
    onDelete();
    closeModal();
  };

  return (
    <div
      className="modal fade"
      id={id}
      tabIndex="-1"
      ref={modalRef}
    >
      <div className="modal-dialog">
        <div className="modal-content">

          {/* BODY */}
          <div className="modal-body">
            <h5 className="mb-3">{title}</h5>

            {/* 🔥 IF ALREADY LINKED */}
            {cardId ? (
              <div className="mb-3">
                <label  style={{display: "flex",  alignItems: "center", justifyContent: "center"}}
                className="form-label fw-bold">
                  Linked Product ID
                </label>

                <div  style={{display: "flex",  alignItems: "center", justifyContent: "center"}} className="form-control bg-light">
                  {cardId}
                </div>
                <div 
                style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                <h6 
                className="text-success ">
                  This QR is already linked
                </h6>
                <h6 className="">
                  Card Issue Date: {cardIssueDate}
                </h6>
                </div>
              </div>
            ) : (
              /* 🔥 ELSE SHOW INPUT */
              fields.map((field, index) => {
                if (field.type === "select") {
                  return (
                    <select
                      key={index}
                      className="form-control mb-2"
                      value={formData[field.name] || ""}
                      onChange={(e) => handleChange(e, field.name)}
                    >
                      {field.options.map((opt, i) => (
                        <option key={i}>{opt}</option>
                      ))}
                    </select>
                  );
                }

                return (
                  <input
                    key={index}
                    type={field.type || "text"}
                    className="form-control mb-2"
                    placeholder={field.placeholder}
                    value={formData[field.name] || ""}
                    maxLength={
                      field.name === "mobile" || field.name === "phone"
                        ? 10
                        : field.name === "pin"
                        ? 6
                        : undefined
                    }
                    onChange={(e) => {
                      let value = e.target.value;

                      if (
                        field.name === "mobile" ||
                        field.name === "phone" ||
                        field.name === "pin"
                      ) {
                        if (!/^\d*$/.test(value)) return;
                      }

                      handleChange(e, field.name);
                    }}
                  />
                );
              })
            )}
          </div>

          {/* FOOTER */}
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={closeModal}
            >
              Close
            </button>

            {/* 🔥 CONDITIONAL BUTTON */}
            {cardId ? (
              <button
                className="btn btn-danger"
                onClick={handleDeleteClick}
              >
               {loading ? "Deleting..." : "Delete"}
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={handleSaveClick}
              >
                Save
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default CommonProfileModal;