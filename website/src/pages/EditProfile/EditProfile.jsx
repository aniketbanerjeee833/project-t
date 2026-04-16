import { NavLink, useParams } from "react-router-dom";
import {
  useAddAllergyMutation, useAddConditionMutation,
  useAddEmergencyContactMutation,
  useAddInsuranceMutation,
  useAddMedicationMutation, useDeleteAllergyMutation, useDeleteConditionMutation, useDeleteEmergencyContactMutation, useDeleteInsuranceMutation, useDeleteMedicationMutation, useEditAddressMutation, useEditAllergyMutation, useEditConditionMutation, useEditEmergencyContactMutation, useEditInsuranceMutation, useEditMedicationMutation, useEditProfileImageMutation, useEditProfileMutation, useGetIndividualProfileByIdQuery,
  useLinkProductToQRMutation,
  useUnlinkProductFromQRMutation,
  useUpdateViewOrHideDataMutation,

} from "../../redux/api/profileApi";
import CommonProfileModal from "../../components/Modal/CommonProfileModal";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";


export default function EditProfile() {

  //const [searchParams] = useSearchParams();
  // const {id1:encodedId}=useParams();
  // console.log("Encoded ID from URL:", encodedId);
  // // const encodedId = searchParams.get("edit_id");

  // const id = encodedId
  //   ? atob(encodedId)
  //   : null;

  // console.log("Decoded ID:", id);
  const { id: encodedId } = useParams();

  console.log("Encoded ID from URL:", encodedId);

  const id = encodedId ? atob(encodedId) : null;

  console.log("Decoded ID:", id);
  const { data: profile, refetch } = useGetIndividualProfileByIdQuery(id, { skip: !id });
  console.log(profile, "profile")
  // ── 1. ADD THIS ONE STATE ─────────────────────────────────────────────────────
  const [editingItem, setEditingItem] = useState(null);
  //const [petOwnerData,   setPetOwnerData]   = useState(null);
  const [vetDetailData, setVetDetailData] = useState(null);
  const [instructionData, setInstructionData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };
  const [editImage, { isLoading: isEditImageLoading }] = useEditProfileImageMutation();
  // { section: "allergy",  data: row } 
  // { section: "medication", data: row }
  // { section: "insurance",  data: row }
  // { section: "condition",  data: row }
  const [allergyData, setAllergyData] = useState(null);
  const [medicationData, setMedicationData] = useState(null);
  const [insuranceData, setInsuranceData] = useState(null);
  const [conditionData, setConditionData] = useState(null);
  const [emergencyData, setEmergencyData] = useState(null);

  const [formData, setFormData] = useState({});

  const [linkProductToQR] = useLinkProductToQRMutation();
  const [unlinkProductFromQR, { isLoading: isUnlinkProductLoading }] = useUnlinkProductFromQRMutation(); // reuse editProfile for unlinking since it's a PATCH
  const [saveMedication] = useAddMedicationMutation();
  const [saveInsurance] = useAddInsuranceMutation();
  const [saveCondition] = useAddConditionMutation();

  const [editInformation] = useEditProfileMutation();

  const[updateViewStatus]=useUpdateViewOrHideDataMutation();

  const [addEmergency] = useAddEmergencyContactMutation();
  const [editEmergency] = useEditEmergencyContactMutation();
  const [deleteEmergency] = useDeleteEmergencyContactMutation();
  const [saveAllergy] = useAddAllergyMutation();
  const [editAddress] = useEditAddressMutation();
  const [editAllergy] = useEditAllergyMutation();
  const [deleteAllergy] = useDeleteAllergyMutation();

  const [editMedication] = useEditMedicationMutation();
  const [editInsurance] = useEditInsuranceMutation();
  const [editCondition] = useEditConditionMutation();


  const [deleteMedication] = useDeleteMedicationMutation();
  const [deleteInsurance] = useDeleteInsuranceMutation();
  const [deleteCondition] = useDeleteConditionMutation();

  const handleUpdateViewStatus = async (id) => {
    try {
      const res=await updateViewStatus( id).unwrap();
      if(res.success){
        toast.success(res.message||"View status updated");
      }
      // refetch();
    } catch (error) {
      console.error("Error updating view status:", error);
    }
  };
  const formatDOB = (dob) => {
    if (!dob) return "0000-00-00";

    if (dob.startsWith("1899") || dob.startsWith("1900")) {
      return "0000-00-00";
    }

    return dob.split("T")[0];
  };
  const individualProfile = profile?.data; // adjust based on actual API response structure
  console.log(individualProfile, "individualProfile")
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

  //const hasEmergency = false; // (update when API available)
  // const hasAllergy = false;
  // const hasMedication = false;
  //const hasPetOwners = false;
  // const hasHealthInsurance= false;
  // const hasVitalMedicalConditions = false;

  // const hasVetDetails = false;
  // const hasInstructions = false;

  const getPersonalFields = (profileType) => {
    const commonFields = [
      { name: "name", placeholder: "Name" },

      { name: "dob", type: "date", placeholder: "Birth Date" },
      {
        name: "gender",
        type: "select",
        options: ["Male", "Female"],
      },
      { name: "hair_color", placeholder: "Hair Color" },
      { name: "eye_color", placeholder: "Eye Color" },
      { name: "height", placeholder: "Height" },
      { name: "weight", placeholder: "Weight" },
      { name: "identity", placeholder: "Identification Mark" },
      { name: "blood_group", placeholder: "Blood Group" },
    ];

    if (profileType === "HUMAN") {
      return [
        { name: "email", placeholder: "Email" }, // only for HUMAN
        { name: "phone", placeholder: "Personal Number" },
        ...commonFields,
      ];
    }

    if (profileType === "PET") {
      return [
        ...commonFields,
        { name: "breed", placeholder: "Breed" }, // only for PET
      ];
    }

    // OTHER
    return [
      { name: "name", placeholder: "Name" },
      { name: "phone", placeholder: "Enter Your Phone No" },
      { name: "identity", placeholder: "Enter Notes" },
    ];
  };
  const personalFields = getPersonalFields(individualProfile?.profile);
  const addressFields = [
    { name: "address", placeholder: "Address" },
    { name: "city", placeholder: "City" },
    { name: "state", placeholder: "State" },
    { name: "pin", placeholder: "Pin Code" },
  ];

  const emergencyContactFields = [

    { name: "mobile", placeholder: "Enter Emergency Contact Mobile Number" },
  ];

  // ── 2. Two separate save handlers ───────────────────────────────────

  // Save personal information (exampleModal)

  const allergyFields = [
    { name: "name", placeholder: "Name" },
    { name: "notes", placeholder: "Notes" },
  ];

  const medicationFields = [
    { name: "medicine_name", placeholder: "Medicine Name" },
    { name: "notes", placeholder: "Notes" },
    { name: "dosage", placeholder: "Dosage" },
    { name: "dosage_unit", placeholder: "Dosage Unit" },
    { name: "frequency", placeholder: "Frequency" },
    { name: "frequency_time", placeholder: "Frequency Time" },
  ];
  const insuranceFields = [
    { name: "insurance_name", placeholder: "Insurance Name" },
    { name: "insurance_notes", placeholder: "Insurance Notes" },
  ];
  const conditionFields = [
    { name: "condition_name", placeholder: "Condition Name" },
    { name: "notes", placeholder: "Notes" },
  ];
  const petOwnerFields = [
    { name: "name", placeholder: "Enter Emergency Contact Name" },
    { name: "relation", placeholder: "Enter Emergency Contact Relationship" },
    { name: "mobile", placeholder: "Enter Emergency Contact Mobile" },

    { name: "email", placeholder: "Enter Emergency Contact Email" },

  ];
  const otherEmergencyFields = [
    { name: "mobile", placeholder: "Enter Emergency Contact Mobile Number" },
    { name: "email", placeholder: "Enter Emergency Contact Email" },
  ];

  // const vetDetailFields = [
  //   { name: "name",    placeholder: "Vet Name" },
  //   { name: "phone",   placeholder: "Personal Number" },
  //   { name: "address", placeholder: "Address" },
  // ];

  // const instructionFields = [
  //   { name: "title", placeholder: "Title" },
  //   { name: "notes", placeholder: "Notes" },
  // ];
  const vetDetailFields = [
    { name: "name", placeholder: "Vet Name" },
    { name: "phone", placeholder: "Personal Number" },
    { name: "address", placeholder: "Address" },
    // remove address for now since you only have 2 columns in insurance table
  ];

  const instructionFields = [
    { name: "title", placeholder: "Title" },   // ✅ matches formData.title
    { name: "notes", placeholder: "Notes" },
  ];


  const handleLinkProductToQR = async () => {
    try {
      const res = await linkProductToQR({
        id,
        code: formData.productId,
      }).unwrap();

      console.log(res, "res");

      toast.success(res.message || "Product linked successfully!");

      setFormData({}); // clear input

    } catch (err) {
      console.error(err);

      // 🔥 show backend message if exists
      toast.error(err?.data?.message || "Failed to link product to QR");
    }
  };

  const handleUnlinkProductFromQR = async () => {
    try {
      const res = await unlinkProductFromQR({
        id,
        code: individualProfile?.card_id, // ✅ FIX
      }).unwrap();

      console.log(res, "res");

      toast.success(res.message || "Product unlinked successfully!");

      setFormData({}); // clear input

    } catch (err) {
      console.error(err);

      // 🔥 show backend message if exists
      toast.error(err?.data?.message || "Failed to unlink product from QR");
    }
  }
  const handleUpload = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      // const res = await fetch(
      //   `http://localhost:4000/profile/image/${individualProfile?.id}`,
      //   {
      //     method: "PUT",
      //     body: formData,
      //   }
      // );
      const res = await editImage({ id: individualProfile?.id, image: selectedImage }).unwrap();

      //const data = await res.json();

      if (res.success) {
        // 🔥 update UI instantly
        //individualProfile.image = data.image;
        setSelectedImage(null);
        toast.success("Profile image updated successfully!");
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleAddVetDetail = () => {
    setEditingItem(null);
    setFormData({ name: "", phone: "", address: "" });  // ✅ use vetDetailFields names
  };

  // const handleEditVetDetail = (row) => {
  //   setEditingItem({ section: "vetDetail", data: row });
  //   setFormData({
  //     name:    row.insurance_name  || "",   // backend stores in insurance_name
  //     phone:   row.insurance_notes || "",   // backend stores in insurance_notes
  //     address: "",                          // no 3rd field available yet
  //   });
  // };
  const handleEditVetDetail = (row) => {
    setEditingItem({ section: "vetDetail", data: row });
    setFormData({
      name: row.insurance_name || "",   // Vet Name
      phone: row.insurance_phone || "",   // ✅ Phone
      address: row.insurance_notes || "",   // Address
    });
  };
  const handleSaveVetDetail = async () => {
    try {
      if (editingItem?.section === "vetDetail") {
        await editInsurance({
          id: editingItem.data.id,
          insurance_name: formData.name,     // Vet Name → name
          insurance_notes: formData.address,  // Address → note
          phone: formData.phone,    // ✅ Phone → phone
        }).unwrap();
      } else {
        await saveInsurance({
          information_id: id,
          insurance_name: formData.name,
          insurance_notes: formData.address,
          phone: formData.phone,    // ✅
        }).unwrap();
      }
      setEditingItem(null);
      await refetch();
    } catch (err) { console.error("Vet Detail Save Error:", err); }
  };
  // const handleDeleteVetDetail = async (rowId) => {
  //   try { await deleteInsurance(rowId).unwrap(); await refetch(); }
  //   catch (err) { console.error(err); }
  // };




  // ── HANDLERS FOR INSTRUCTIONS (uses condition mutations) ─────────────────────

  const handleAddInstruction = () => {
    setEditingItem(null);
    setFormData({ title: "", notes: "" });   // ✅ use instructionFields names
  };

  const handleEditInstruction = (row) => {
    setEditingItem({ section: "instruction", data: row });
    setFormData({
      title: row.condition_name || "",   // backend stores in condition_name
      notes: row.condition_notes || "",
    });
  };

  const handleSaveInstruction = async () => {
    try {
      if (editingItem?.section === "instruction") {
        await editCondition({
          id: editingItem.data.id,
          condition_name: formData.title,   // map title → condition_name
          notes: formData.notes,
        }).unwrap();
      } else {
        await saveCondition({
          information_id: id,
          condition_name: formData.title,
          notes: formData.notes,
        }).unwrap();
      }
      setEditingItem(null);
      await refetch();
    } catch (err) { console.error("Instruction Save Error:", err); }
  };

  // const handleDeleteInstruction = async (rowId) => {
  //   try { await deleteCondition(rowId).unwrap(); await refetch(); }
  //   catch (err) { console.error(err); }
  // };


  const handleAddAllergy = () => { setEditingItem(null); setFormData({ name: "", notes: "" }); };
  const handleAddMedication = () => { setEditingItem(null); setFormData({}); };
  const handleAddInsurance = () => { setEditingItem(null); setFormData({}); };
  const handleAddCondition = () => { setEditingItem(null); setFormData({}); };
  const handleEditAllergy = (row) => { setEditingItem({ section: "allergy", data: row }); setFormData({ name: row.allergy_name, notes: row.allergy_notes }); };
  const handleEditMedication = (row) => {
    setEditingItem({ section: "medication", data: row });
    setFormData({ medicine_name: row.medicine_name, notes: row.medicine_notes, dosage: row.dosage, dosage_unit: row.dosage_unit, frequency: row.frequency, frequency_time: row.frequency_time });
  };
  const handleEditInsurance = (row) => { setEditingItem({ section: "insurance", data: row }); setFormData({ insurance_name: row.insurance_name, insurance_notes: row.insurance_notes }); };
  const handleEditCondition = (row) => { setEditingItem({ section: "condition", data: row }); setFormData({ condition_name: row.condition_name, notes: row.condition_notes }); };


  // const handleAddAllergy = () => {
  //   setFormData({ name: "", notes: "" });
  // };

  // const handleEditAllergy = () => {
  //   setFormData(allergyData);
  // };


  // const handleSaveAllergy = () => {
  //   setAllergyData(formData);
  // };
  // const handleSaveAllergy = async () => {
  //   try {
  //     await saveAllergy({
  //       information_id: id,
  //       name: formData.name,
  //       notes: formData.notes,
  //     }).unwrap();

  //     //setAllergyData(formData);
  //      await refetch(); // 🔥 IMPORTANT
  //   } catch (err) {
  //     console.error("Allergy Save Error:", err);
  //   }
  // };

  // const handleSaveInformation = async () => {
  //   try {
  //     await editInformation({ information_id: id, ...formData }).unwrap();
  //     await refetch();
  //   } catch (err) { console.error("Information Save Error:", err); }
  // };
  const handleSavePersonalInfo = async () => {
    try {
      await editInformation({
        id: id,          // the information row id
        profile: individualProfile?.profile, // "HUMAN", "PET", or "OTHER"
        ...formData,
      }).unwrap();
      await refetch();
    } catch (err) {
      console.error("Personal Info Save Error:", err);
    }
  };
  console.log("Form Data:", formData);

  // Save address (exampleModal3)
  const handleSaveAddress = async () => {
    try {
      await editAddress({
        id: id,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pin: formData.pin,
      }).unwrap();
      await refetch();
    } catch (err) {
      console.error("Address Save Error:", err);
    }
  };

  const handleAddEmergency = () => {
    setEditingItem(null);
    setFormData({ mobile: "" });
  };

  const handleEditEmergency = (row) => {
    setEditingItem({ section: "emergency", data: row });
    setFormData({
      name: row.name || "",
      mobile: row.mobile || "",
      relation: row.relation || "",
      email: row.email || "",

    });
  };

  // const handleDeleteEmergency = async (rowId) => {

  //   try { await deleteEmergency(rowId).unwrap(); await refetch(); }
  //   catch (err) { console.error(err); }
  // };


  const handleSaveEmergency = async () => {
    try {
      if (editingItem?.section === "emergency") {
        await editEmergency({
          id: editingItem.data.id,
          name: formData.name || "",
          relation: formData.relation || "",
          mobile: formData.mobile || "",
          email: formData.email || "",
        }).unwrap();
      } else {
        await addEmergency({
          information_id: id,
          name: formData.name || "",
          relation: formData.relation || "",
          mobile: formData.mobile || "",
          email: formData.email || "",
        }).unwrap();
      }
      setEditingItem(null);
      await refetch();
    } catch (err) { console.error("Emergency Save Error:", err); }
  };

  const handleSaveAllergy = async () => {
    try {
      if (editingItem?.section === "allergy") {
        // EDIT
        await editAllergy({ id: editingItem.data.id, name: formData.name, notes: formData.notes }).unwrap();
      } else {
        // ADD
        await saveAllergy({ information_id: id, name: formData.name, notes: formData.notes }).unwrap();
      }
      setEditingItem(null);
      await refetch();
    } catch (err) { console.error("Allergy Save Error:", err); }
  };
  const handleSaveMedication = async () => {
    try {
      if (editingItem?.section === "medication") {
        await editMedication({ id: editingItem.data.id, medicine_name: formData.medicine_name, notes: formData.notes, dosage: formData.dosage, dosage_unit: formData.dosage_unit, frequency: formData.frequency, frequency_time: formData.frequency_time }).unwrap();
      } else {
        await saveMedication({ information_id: id, medicine_name: formData.medicine_name, notes: formData.notes, dosage: formData.dosage, dosage_unit: formData.dosage_unit, frequency: formData.frequency, frequency_time: formData.frequency_time }).unwrap();
      }
      setEditingItem(null);
      await refetch();
    } catch (err) { console.error("Medication Save Error:", err); }
  };

  const handleSaveInsurance = async () => {
    try {
      if (editingItem?.section === "insurance") {
        await editInsurance({ id: editingItem.data.id, insurance_name: formData.insurance_name, insurance_notes: formData.insurance_notes }).unwrap();
      } else {
        await saveInsurance({ information_id: id, insurance_name: formData.insurance_name, insurance_notes: formData.insurance_notes }).unwrap();
      }
      setEditingItem(null);
      await refetch();
    } catch (err) { console.error("Insurance Save Error:", err); }
  };

  const handleSaveCondition = async () => {
    try {
      if (editingItem?.section === "condition") {
        await editCondition({
          id: editingItem.data.id, condition_name: formData.condition_name,
          notes: formData.notes
        }).unwrap();
      } else {
        await saveCondition({ information_id: id, condition_name: formData.condition_name, notes: formData.notes }).unwrap();
      }
      setEditingItem(null);
      await refetch();
    } catch (err) { console.error("Condition Save Error:", err); }
  };

    const handleDeleteEmergency = async (rowId) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this item?");

  if (!confirmDelete) return;

  try {
    await deleteEmergency(rowId).unwrap();
    toast.success("Emergency contact deleted successfully ✅");
    await refetch();
  } catch (err) {
    console.error(err);
    toast.error("Failed to delete emergency contact ❌");
  }
};
  const handleDeleteAllergy = async (rowId) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this allergy?");
  if (!confirmDelete) return;

  try {
    await deleteAllergy(rowId).unwrap();
    toast.success("Allergy deleted successfully ✅");
    await refetch();
  } catch (err) {
    console.error(err);
    toast.error("Failed to delete allergy ❌");
  }
};

const handleDeleteMedication = async (rowId) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this medication?");
  if (!confirmDelete) return;

  try {
    await deleteMedication(rowId).unwrap();
    toast.success("Medication deleted successfully ✅");
    await refetch();
  } catch (err) {
    console.error(err);
    toast.error("Failed to delete medication ❌");
  }
};

const handleDeleteInsurance = async (rowId) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this insurance?");
  if (!confirmDelete) return;

  try {
    await deleteInsurance(rowId).unwrap();
    toast.success("Insurance deleted successfully ✅");
    await refetch();
  } catch (err) {
    console.error(err);
    toast.error("Failed to delete insurance ❌");
  }
};

const handleDeleteCondition = async (rowId) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this condition?");
  if (!confirmDelete) return;

  try {
    await deleteCondition(rowId).unwrap();
    toast.success("Condition deleted successfully ✅");
    await refetch();
  } catch (err) {
    console.error(err);
    toast.error("Failed to delete condition ❌");
  }
};
const handleDeleteInstruction = async (rowId) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this instruction?");
  if (!confirmDelete) return;

  try {
    await deleteCondition(rowId).unwrap(); // 🔥 FIX: was deleteCondition ❌
    toast.success("Instruction deleted successfully ✅");
    await refetch();
  } catch (err) {
    console.error(err);
    toast.error("Failed to delete instruction ❌");
  }
};
const handleDeleteVetDetail = async (rowId) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this vet detail?");
  if (!confirmDelete) return;

  try {
    await deleteInsurance(rowId).unwrap();
    toast.success("Vet detail deleted successfully ✅");
    await refetch();
  } catch (err) {
    console.error(err);
    toast.error("Failed to delete vet detail ❌");
  }
};
  // const handleDeleteAllergy = async (rowId) => { try { await deleteAllergy(rowId).unwrap(); await refetch(); } catch (err) { console.error(err); } };
  // const handleDeleteMedication = async (rowId) => { try { await deleteMedication(rowId).unwrap(); await refetch(); } catch (err) { console.error(err); } };
  // const handleDeleteInsurance = async (rowId) => { try { await deleteInsurance(rowId).unwrap(); await refetch(); } catch (err) { console.error(err); } };
  // const handleDeleteCondition = async (rowId) => { try { await deleteCondition(rowId).unwrap(); await refetch(); } catch (err) { console.error(err); } };


  // MEDICATION
  // const handleAddMedication = () => setFormData({});
  // const handleEditMedication = () => setFormData(medicationData);
  // const handleSaveMedication = () => setMedicationData(formData);
  // const handleSaveMedication = async () => {
  //   try {
  //     await saveMedication({
  //       information_id: id,
  //       medicine_name: formData.medicine_name,
  //       notes: formData.notes,
  //       dosage: formData.dosage,
  //       dosage_unit: formData.dosage_unit,
  //       frequency: formData.frequency,
  //       frequency_time: formData.frequency_time,
  //     }).unwrap();

  //     // setMedicationData(formData);
  //      await refetch(); // 🔥 IMPORTANT
  //   } catch (err) {
  //     console.error("Medication Save Error:", err);
  //   }
  // };
  // INSURANCE
  // const handleAddInsurance = () => setFormData({});
  // const handleEditInsurance = () => setFormData(insuranceData);
  // const handleSaveInsurance = async () => {
  //   try {
  //     await saveInsurance({
  //       information_id: id,
  //       insurance_name: formData.insurance_name,
  //       insurance_notes: formData.insurance_notes,
  //     }).unwrap();
  //      await refetch(); // 🔥 IMPORTANT
  //     // setInsuranceData(formData);
  //   } catch (err) {
  //     console.error("Insurance Save Error:", err);
  //   }
  // };

  // CONDITION
  // const handleAddCondition = () => setFormData({});
  // const handleEditCondition = () => setFormData(conditionData);
  // const handleSaveCondition = async () => {
  //   try {
  //     await saveCondition({
  //       information_id: id,
  //       condition_name: formData.condition_name,
  //       notes: formData.notes,
  //     }).unwrap();
  //      await refetch(); // 🔥 IMPORTANT
  //     // setConditionData(formData);
  //   } catch (err) {
  //     console.error("Condition Save Error:", err);
  //   }
  // };

  // useEffect(() => {
  //   if(!profile?.data) return;
  //   else if (profile?.data) {
  //     setAllergyData(profile?.data.allergy);

  //     setMedicationData(profile?.data.medication);
  //     setInsuranceData(profile?.data.insurance);
  //     setConditionData(profile?.data.condition);
  //       setEmergencyData(profile?.data.emergency_contacts);
  //     //setPetOwnerData(profile?.data.petOwners);       // from getIndividualProfileById
  //     setVetDetailData(profile?.data.insurance);     // from getIndividualProfileById
  //     setInstructionData(profile?.data.condition);
  //   }
  // }, [profile]);
  useEffect(() => {
    const data = profile?.data;
    if (!data) return;

    setAllergyData(data.allergy || []);
    setMedicationData(data.medication || []);
    setInsuranceData(data.insurance || []);
    setConditionData(data.condition || []);
    setEmergencyData(data.emergency_contact || []);

    setVetDetailData(data.insurance || []);
    setInstructionData(data.condition || []);

  }, [profile?.data]);
  console.log(emergencyData, "emergencyData")
  console.log(allergyData, "allergyData")
  console.log(medicationData, "medicationData")
  console.log(insuranceData, "insuranceData")
  console.log(conditionData, "conditionData")
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
  // const hasHealth = false;
  return (
    <>
      {/* <!-- ##### Breadcrumb Area Start ##### --> */}
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
                  <h2>Edit Information</h2>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Profile Area */}
        <div className="editpage section-padding-100">
          <div className="container">
            <div className="row">

              {/* LEFT PROFILE */}
              <div className="col-lg-4 mb-4">
                <div
                  className="editimg text-center p-4"
                  style={{ border: "1px solid #eee", borderRadius: "10px" }}
                >
                  {/* <img
              src="/assets/img/profile.jpg"
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            /> */}
                  {/* <img
                    src={`http://localhost:4000/${individualProfile?.image}`}
                    alt="profile"
                    style={{
                      width: "120px",
                      height: "120px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  /> */}
                  {/* <img
                    src={
                      selectedImage
                        ? URL.createObjectURL(selectedImage)   // ✅ preview
                        : individualProfile?.image
                          ? `http://localhost:4000/${individualProfile.image}` // ✅ backend image
                          : "/assets/img/profile.jpg" // ✅ fallback
                    }
                    alt="profile"
                    style={{
                      width: "120px",
                      height: "120px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  /> */}
                  <img
                    src={
                      selectedImage
                        ? URL.createObjectURL(selectedImage)   // ✅ preview
                        : `http://localhost:4000/uploads/${individualProfile?.image}`

                    }
                    alt="profile"
                    style={{
                      width: "120px",
                      height: "120px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />

                  {/* <div className="mt-3">
                    <input type="file" className="chooseimg mb-2" />
                    <br />
                    <button className="btn btn-success btn-sm">
                      Change Photo
                    </button>
                  </div> */}
                  <div className="mt-3">
                    <input
                      type="file"
                      className="chooseimg mb-2"
                      onChange={handleImageChange}
                    />

                    <br />

                    <button
                      className="btn btn-success btn-sm"
                      disabled={!selectedImage || isEditImageLoading}
                      onClick={handleUpload}
                    >
                      {isEditImageLoading ? "Uploading..." : "Change Photo"}
                      {/* Change Photo */}
                    </button>
                  </div>
                  <h4 className="mt-3">{individualProfile?.name}</h4>

                  {individualProfile?.profile !== "OTHER" && (
                    <p>
                      Your age: {getAge(individualProfile?.dob)}
                      {capitalize(individualProfile?.city)}
                      {capitalize(individualProfile?.state)}
                    </p>
                  )}
                  {/* <h4 className="mt-3">{individualProfile?.name}</h4>
                  <p>8 years and 4 months Old from city, state, INDIA</p> */}

                  <div
                    style={{ display: "flex", gap: "10px", justifyContent: "center" }}
                    className="mt-3">
                    <button

                      className="btn btn-dark btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModallink"
                    >
                      <>
                        <i className="fa fa-link"></i>{" "}
                        {individualProfile?.card_id ? "Linked-Product" : "Link-Product"}
                      </>
                    </button>
                    {/* <NavLink to="#" className="btn btn-dark btn-sm">
                      <i className="fa fa-link"></i> Link-Not-Product
                    </NavLink> */}
                    {/* {individualProfile?.card_id ? (
                       //const link = `http://localhost:4000/profile-details/profile_id=${encodedCode}`;
    <NavLink
      to={`http://localhost:4000/profile-details/profile_id=${encodedCode}`}
      target="_blank"
      rel="noreferrer"
      className="btn btn-dark btn-sm"
    >
      <i className="fa fa-eye"></i> View Link
    </NavLink>
  ) : (
    <button className="btn btn-dark btn-sm">
      <i className="fa fa-link"></i> Link-Not-Product
    </button>
  )} */}
                    {individualProfile?.card_id ? (
                      <NavLink
                        to={individualProfile.link}
                        className="btn btn-dark btn-sm"
                      >
                        <i className="fa fa-eye"></i> View Link
                      </NavLink>
                    ) : (
                      <button className="btn btn-dark btn-sm">
                        <i className="fa fa-link"></i> Link-Not-Product
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* RIGHT PROFILE */}
              <div className="col-lg-8">
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "10px" }}>
                  <button
                    className="btn"
                    onClick={()=>handleUpdateViewStatus(individualProfile?.id)}
                    style={{
                      backgroundColor:individualProfile?.status==="0" ? "red" : "green",
                      color: "#fff"
                    }}
                  >
                    {individualProfile?.status==="0" ? "Hide Data" : "View Data"}
                  </button>
                </div>

                {/* ================= PERSONAL ================= */}
                <div className="personaledit p-3 mb-4" style={{ border: "1px solid #eee", borderRadius: "10px" }}>
                  <h5 style={{ backgroundColor: "red", padding: "10px", color: "white" }}>
                    {individualProfile?.profile === "HUMAN" ? "PERSONAL INFORMATION" :
                      individualProfile?.profile === "PET" ? "PET INFORMATION" : " INFORMATION"}

                    {/* <i className={`float-right ${hasPersonalData ? "fa fa-pencil-square" : "fa fa-plus-square-o"}`}
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        ></i> */}
                    <i
                      className={`float-right ${hasPersonalData ? "fa fa-pencil-square" : "fa fa-plus-square-o"}`}
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        setFormData({
                          name: individualProfile?.name || "",
                          email: individualProfile?.email || "",
                          phone: individualProfile?.phone || "",
                          dob: formatDOB(individualProfile?.dob) || "",
                          gender: individualProfile?.gender || "",
                          hair_color: individualProfile?.hair_color || "",
                          eye_color: individualProfile?.eye_color || "",
                          height: individualProfile?.height || "",
                          weight: individualProfile?.weight || "",
                          identity: individualProfile?.identity || "",
                          blood_group: individualProfile?.blood_group || "",
                          breed: individualProfile?.breed || "",
                        })
                      }
                    ></i>

                  </h5>

                  {hasPersonalData && (
                    <div className="table-responsive">
                      <table className="table">
                        {/* <tbody>
            <tr><th>Name:</th><td>{individualProfile?.name || "-"}</td></tr>
            {individualProfile?.profile === "HUMAN" && (
              <tr><th>Email:</th><td>{individualProfile?.email || "-"}</td></tr>
            )}
            <tr><th>Personal Number:</th><td>{individualProfile?.phone || "-"}</td></tr>
            <tr><th>Birth Date:</th><td>{formatDOB(individualProfile?.dob)}</td></tr>
            <tr><th>Gender:</th><td>{individualProfile?.gender || "-"}</td></tr>
            <tr><th>Hair Color:</th><td>{individualProfile?.hair_color || "-"}</td></tr>
            <tr><th>Eye Color:</th><td>{individualProfile?.eye_color || "-"}</td></tr>
            <tr><th>Height:</th><td>{individualProfile?.height || "-"}</td></tr>
            <tr><th>Weight:</th><td>{individualProfile?.weight || "-"}</td></tr>
            <tr><th>Identification Mark:</th><td>{individualProfile?.identity || "-"}</td></tr>
            <tr><th>Blood Group:</th><td>{individualProfile?.blood_group || "-"}</td></tr>
            {individualProfile?.profile === "PET" && (
              <tr><th>Breed:</th><td>{individualProfile?.breed || "-"}</td></tr>
            )}
          </tbody> */}
                        <tbody>
                          {/* COMMON */}
                          <tr><th>Name:</th><td>{individualProfile?.name || "-"}</td></tr>

                          {/* HUMAN */}
                          {individualProfile?.profile === "HUMAN" && (
                            <>
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
                            </>
                          )}

                          {/* PET */}
                          {individualProfile?.profile === "PET" && (
                            <>
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
                            </>
                          )}

                          {/* OTHER ✅ NEW */}
                          {individualProfile?.profile === "OTHER" && (
                            <>
                              <tr><th>Phone Number:</th><td>{individualProfile?.phone || "-"}</td></tr>
                              <tr><th>Notes:</th><td>{individualProfile?.identity || "-"}</td></tr>
                            </>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>


                {/* ================= EMERGENCY ================= */}
                {individualProfile?.profile === "HUMAN" && (
                  <div className="personaledit p-3 mb-4" style={{ border: "1px solid #eee", borderRadius: "10px" }}>
                    <h5 style={{ backgroundColor: "red", padding: "10px", color: "white" }}>
                      EMERGENCY CONTACTS
                      <i
                        className={`float-right ${emergencyData?.length > 0 ? "" : "fa fa-plus-square-o"}`}
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal2"
                        onClick={handleAddEmergency}
                        style={{ cursor: "pointer" }}
                      ></i>
                    </h5>

                    {emergencyData && emergencyData.map((row) => (
                      <div key={row.id}>
                        <div className="table-responsive">
                          <table className="table">
                            <tbody>
                              <tr><th>Mobile:</th><td>{row.mobile || "-"}</td></tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="text-right">
                          <i
                            className="fa fa-trash mr-2"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleDeleteEmergency(row.id)}
                          ></i>
                          <i
                            className="fa fa-pencil-square"
                            style={{ cursor: "pointer" }}
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal2"
                            onClick={() => handleEditEmergency(row)}
                          ></i>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {/* {individualProfile?.profile === "HUMAN" && 
    <div className="personaledit p-3 mb-4" style={{ border: "1px solid #eee", borderRadius: "10px" }}>
      <h5>
        EMERGENCY CONTACTS
        
          <i
            className={`float-right ${hasEmergency ? "fa fa-pencil-square" : "fa fa-plus-square-o"}`}
          data-bs-toggle="modal"
          data-bs-target="#exampleModal2"
        ></i>
      
    </h5>

    {hasEmergency && (
      <div className="table-responsive">
        <table className="table">
          <tbody>
           
            <tr><th>Mobile:</th><td>-</td></tr>
           
          </tbody>
        </table>
      </div>
    )}
  </div>} */}
                {/* {individualProfile?.profile === "PET" && 
    <div className="personaledit p-3 mb-4" style={{ border: "1px solid #eee", borderRadius: "10px" }}>
      <h5>
        PET OWNERS
       
          <i
            className={`float-right ${hasPetOwners ? "fa fa-pencil-square" : "fa fa-plus-square-o"}`}
          data-bs-toggle="modal"
          data-bs-target="#exampleModal2"
        ></i>
      
    </h5>

    {hasPetOwners && (
      <div className="table-responsive">
        <table className="table">
          <tbody>
            <tr><th>Name:</th><td>-</td></tr>
            <tr><th>Relationship:</th><td>-</td></tr>
            <tr><th>Mobile:</th><td>-</td></tr>
            <tr><th>Alt Mobile:</th><td>-</td></tr>
            <tr><th>Email:</th><td>-</td></tr>
            <tr><th>Emergency Email:</th><td>-</td></tr>
          </tbody>
        </table>
      </div>
    )}
  </div>} */}
                {/* {individualProfile?.profile === "PET" && (
  <div className="personaledit p-3 mb-4" style={{ border: "1px solid #eee", borderRadius: "10px" }}>
    <h5>
      PET OWNERS
      <i
        className={`float-right ${"fa fa-plus-square-o"}`}
        data-bs-toggle="modal"
        data-bs-target="#exampleModalPetOwner"
        //onClick={handleAddPetOwner}
        style={{ cursor: "pointer" }}
      ></i>
    </h5>
 
    {petOwnerData && petOwnerData.map((row) => (
      <div key={row.id}>
        <div className="table-responsive">
          <table className="table">
            <tbody>
              <tr><th>Name:</th><td>{row.name || "-"}</td></tr>
              <tr><th>Relationship:</th><td>{row.relationship || "-"}</td></tr>
              <tr><th>Mobile:</th><td>{row.mobile || "-"}</td></tr>
              <tr><th>Alt Mobile:</th><td>{row.alt_mobile || "-"}</td></tr>
              <tr><th>Email:</th><td>{row.email || "-"}</td></tr>
              <tr><th>Emergency Email:</th><td>{row.emergency_email || "-"}</td></tr>
            </tbody>
          </table>
        </div>
        <div className="text-right">
          <i className="fa fa-trash mr-2" style={{ cursor: "pointer" }} >
          {/* // onClick={() => handleDeletePetOwner(row.id)} *

          </i>
          <i className="fa fa-pencil-square" style={{ cursor: "pointer" }}
           data-bs-toggle="modal" data-bs-target="#exampleModalPetOwner" 
           //</div>onClick={() => handleEditPetOwner(row)}
           >
           </i>
        </div>
      </div>
    ))}
  </div>
)} */}
                {individualProfile?.profile === "PET" && (
                  <div className="personaledit p-3 mb-4" style={{ border: "1px solid #eee", borderRadius: "10px" }}>
                    <h5 style={{ backgroundColor: "red", padding: "10px", color: "white" }}>
                      PET OWNERS
                      <i
                        className={`float-right ${emergencyData?.length > 0 ? "" : "fa fa-plus-square-o"}`}
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModalPetOwner"
                        onClick={handleAddEmergency}
                        style={{ cursor: "pointer" }}
                      ></i>
                    </h5>

                    {emergencyData && emergencyData.map((row) => (
                      <div key={row.id}>
                        <div className="table-responsive">
                          <table className="table">
                            <tbody>
                              <tr><th>Name:</th><td>{row.name || "-"}</td></tr>
                              <tr><th>Relationship:</th><td>{row.relation || "-"}</td></tr>
                              <tr><th>Mobile:</th><td>{row.mobile || "-"}</td></tr>
                              <tr><th>Email:</th><td>{row.email || "-"}</td></tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="text-right">
                          <i
                            className="fa fa-trash mr-2"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleDeleteEmergency(row.id)}
                          ></i>
                          <i
                            className="fa fa-pencil-square"
                            style={{ cursor: "pointer" }}
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModalPetOwner"
                            onClick={() => handleEditEmergency(row)}
                          ></i>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {individualProfile?.profile === "OTHER" && (
                  <div className="personaledit p-3 mb-4" style={{ border: "1px solid #eee", borderRadius: "10px" }}>
                    <h5 style={{ backgroundColor: "red", padding: "10px", color: "white" }}>
                      EMERGENCY CONTACTS
                      <i
                        className={`float-right ${emergencyData?.length > 0 ? "" : "fa fa-plus-square-o"}`}
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal2Other"
                        onClick={handleAddEmergency}
                        style={{ cursor: "pointer" }}
                      ></i>
                    </h5>

                    {emergencyData && emergencyData.map((row) => (
                      <div key={row.id}>
                        <div className="table-responsive">
                          <table className="table">
                            <tbody>
                              <tr><th>Mobile:</th><td>{row.mobile || "-"}</td></tr>
                              <tr><th>Email:</th><td>{row.email || "-"}</td></tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="text-right">
                          <i
                            className="fa fa-trash mr-2"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleDeleteEmergency(row.id)}
                          ></i>
                          <i
                            className="fa fa-pencil-square"
                            style={{ cursor: "pointer" }}
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal2Other"
                            onClick={() => handleEditEmergency(row)}
                          ></i>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* ================= ADDRESS ================= */}
                {(individualProfile?.profile === "HUMAN" || individualProfile?.profile === "PET") &&
                  <div className="personaledit p-3 mb-4" style={{ border: "1px solid #eee", borderRadius: "10px" }}>
                    <h5 style={{ backgroundColor: "red", padding: "10px", color: "white" }}>
                      ADDRESS

                      {/* <i className={`float-right ${hasAddress ? "fa fa-pencil-square" : "fa fa-plus-square-o"}`}
          data-bs-toggle="modal"
          data-bs-target="#exampleModal3"
        ></i> */}
                      <i
                        className={`float-right ${hasAddress ? "fa fa-pencil-square" : "fa fa-plus-square-o"}`}
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal3"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          setFormData({
                            address: individualProfile?.address || "",
                            city: individualProfile?.city || "",
                            state: individualProfile?.state || "",
                            pin: individualProfile?.pin || "",
                          })
                        }
                      ></i>

                    </h5>

                    {hasAddress && (
                      <div className="table-responsive">
                        <table className="table">
                          <tbody>
                            <tr><th>Address:</th><td>{individualProfile?.address || "-"}</td></tr>
                            <tr><th>City:</th><td>{individualProfile?.city || "-"}</td></tr>
                            <tr><th>State:</th><td>{individualProfile?.state || "-"}</td></tr>
                            <tr><th>Pin:</th><td>{individualProfile?.pin || "-"}</td></tr>
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>}


                {/* ================= ALLERGIES ================= */}
                {/* {(individualProfile?.profile === "HUMAN" || individualProfile?.profile === "PET") &&
   <div className="personaledit p-3 mb-4" style={{ border: "1px solid #eee", borderRadius: "10px" }}>
    <h5>
      ALLERGIES
      <NavLink to="#">
        <i
          className={`float-right ${hasAllergy ? "fa fa-pencil-square" : "fa fa-plus-square-o"}`}
          data-bs-toggle="modal"
          data-bs-target="#exampleModal4"
        ></i>
      </NavLink>
    </h5>

    {hasAllergy && (
      <div className="table-responsive">
        <table className="table">
          <tbody>
            <tr><th>Name:</th><td>-</td></tr>
            <tr><th>Notes:</th><td>-</td></tr>
          </tbody>
        </table>
      </div>
    )}
  </div>} */}
                {(individualProfile?.profile === "HUMAN" || individualProfile?.profile === "PET") && (
                  <div
                    className="personaledit p-3 mb-4"
                    style={{ border: "1px solid #eee", borderRadius: "10px" }}
                  >
                    <h5 style={{ backgroundColor: "red", padding: "10px", color: "white" }}>
                      ALLERGIES


                      <i
                        className={`float-right ${"fa fa-plus-square-o"
                          // allergyData ? "fa fa-pencil-square" : "fa fa-plus-square-o"
                          }`}
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal4"
                        //onClick={allergyData ? handleEditAllergy : handleAddAllergy}
                        onClick={handleAddAllergy}
                      ></i>

                    </h5>

                    {/* SHOW DATA */}
                    {allergyData && allergyData?.map((allergyRow) => (
                      <div key={allergyRow?.id}>
                        <div className="table-responsive">
                          <table className="table">
                            <tbody>
                              <tr>
                                <th>Name:</th>
                                <td>{allergyRow?.allergy_name || "-"}</td>
                              </tr>
                              <tr>
                                <th>Notes:</th>
                                <td>{allergyRow?.allergy_notes || "-"}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        {/* ACTION BUTTONS */}
                        <div className="text-right">

                          <i className="fa fa-trash mr-2"
                            onClick={() => handleDeleteAllergy(allergyRow.id)}></i>


                          <i
                            className="fa fa-pencil-square"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal4"
                            onClick={() => handleEditAllergy(allergyRow)}
                          // onClick={handleEditAllergy}
                          ></i>

                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* ================= MEDICATION ================= */}
                {/* {individualProfile?.profile === "HUMAN" || individualProfile?.profile === "PET" &&<div className="personaledit p-3 mb-4" style={{ border: "1px solid #eee", borderRadius: "10px" }}>
    <h5>
      MEDICATION
      <NavLink to="#">
        <i
          className={`float-right ${hasMedication ? "fa fa-pencil-square" : "fa fa-plus-square-o"}`}
          data-bs-toggle="modal"
          data-bs-target="#exampleModal5"
        ></i>
      </NavLink>
    </h5>

    {hasMedication && (
      <div className="table-responsive">
        <table className="table">
          <tbody>
            <tr><th>Medicine Name:</th><td>-</td></tr>
            <tr><th>Notes:</th><td>-</td></tr>
            <tr><th>Dosage:</th><td>-</td></tr>
            <tr><th>Dosage Unit:</th><td>-</td></tr>
            <tr><th>Frequency:</th><td>-</td></tr>
            <tr><th>Frequency Time:</th><td>-</td></tr>
          </tbody>
        </table>
      </div>
    )}
  </div>} */}
                {(individualProfile?.profile === "HUMAN" || individualProfile?.profile === "PET") && (
                  <div className="personaledit p-3 mb-4" style={{ border: "1px solid #eee", borderRadius: "10px" }}>
                    <h5 style={{ backgroundColor: "red", padding: "10px", color: "white" }}>
                      MEDICATION
                      <i
                        // className={`float-right ${medicationData ? "fa fa-pencil-square" : "fa fa-plus-square-o"}`}
                        className={`float-right ${"fa fa-plus-square-o"}`}
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal5"
                        //onClick={() => medicationData ? handleEditMedication() : handleAddMedication()}
                        onClick={handleAddMedication}
                        style={{ cursor: "pointer" }}
                      ></i>
                    </h5>

                    {medicationData && medicationData?.map((medicationRow) => (
                      <div key={medicationRow?.id}>
                        <div className="table-responsive">
                          <table className="table">
                            <tbody>
                              <tr><th>Medicine Name:</th><td>{medicationRow?.medicine_name || "-"}</td></tr>
                              <tr><th>Notes:</th><td>{medicationRow?.medicine_notes || "-"}</td></tr>
                              <tr><th>Dosage:</th><td>{medicationRow?.dosage || "-"}</td></tr>
                              <tr><th>Dosage Unit:</th><td>{medicationRow?.dosage_unit || "-"}</td></tr>
                              <tr><th>Frequency:</th><td>{medicationRow?.frequency || "-"}</td></tr>
                              <tr><th>Frequency Time:</th><td>{medicationRow?.frequency_time || "-"}</td></tr>
                            </tbody>
                          </table>
                        </div>

                        <div className="text-right">
                          <i className="fa fa-trash mr-2" onClick={() => handleDeleteMedication(medicationRow.id)}></i>
                          <i
                            className="fa fa-pencil-square"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal5"
                            onClick={() => handleEditMedication(medicationRow)}
                          ></i>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* {individualProfile?.profile === "HUMAN"  &&<div className="personaledit p-3 mb-4" style={{ border: "1px solid #eee", borderRadius: "10px" }}>
    <h5>
      HEALTH INSURANCE
      <NavLink to="#">
        <i
          className={`float-right ${hasHealthInsurance ? "fa fa-pencil-square" : "fa fa-plus-square-o"}`}
          data-bs-toggle="modal"
          data-bs-target="#exampleModal5"
        ></i>
      </NavLink>
    </h5>

    {hasHealthInsurance && (
      <div className="table-responsive">
        <table className="table">
          <tbody>
            <tr><th>Insurance Name:</th><td>-</td></tr>
            <tr><th>Insurance Notes:</th><td>-</td></tr>
            
          </tbody>
        </table>
      </div>
    )}
  </div>} */}
                {/* =================HEALTH INSURANCE================= */}
                {individualProfile?.profile === "HUMAN" && (
                  <div className="personaledit p-3 mb-4"
                    style={{ border: "1px solid #eee", borderRadius: "10px" }}>
                    <h5 style={{ backgroundColor: "red", padding: "10px", color: "white" }}>
                      HEALTH INSURANCE
                      <i
                        //className={`float-right ${insuranceData ? "fa fa-pencil-square" : "fa fa-plus-square-o"}`}
                        className={`float-right ${"fa fa-plus-square-o"}`}
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal6"
                        // onClick={() => insuranceData ? handleEditInsurance() : handleAddInsurance()}
                        onClick={handleAddInsurance}
                      ></i>
                    </h5>

                    {insuranceData && insuranceData?.map((insuranceRow) => (
                      <div key={insuranceRow?.id}>
                        <div className="table-responsive">
                          <table className="table">
                            <tbody>
                              <tr><th>Insurance Name:</th><td>{insuranceRow?.insurance_name || "-"}</td></tr>
                              <tr><th>Insurance Notes:</th><td>{insuranceRow?.insurance_notes || "-"}</td></tr>
                            </tbody>
                          </table>
                        </div>

                        <div className="text-right">
                          <i className="fa fa-trash mr-2" onClick={() => handleDeleteInsurance(insuranceRow.id)}></i>
                          <i
                            className="fa fa-pencil-square"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal6"
                            onClick={() => handleEditInsurance(insuranceRow)}
                          // onClick={handleEditInsurance}
                          ></i>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {/* ================= VITAL MEDICAL CONDITIONS ================= */}
                {/* {individualProfile?.profile === "HUMAN"  &&<div className="personaledit p-3 mb-4" style={{ border: "1px solid #eee", borderRadius: "10px" }}>
    <h5>
        VITAL MEDICAL CONDITIONS
      <NavLink to="#">
        <i
          className={`float-right ${hasVitalMedicalConditions ? "fa fa-pencil-square" : "fa fa-plus-square-o"}`}
          data-bs-toggle="modal"
          data-bs-target="#exampleModal5"
        ></i>
      </NavLink>
    </h5>

    {hasVitalMedicalConditions && (
      <div className="table-responsive">
        <table className="table">
          <tbody>
            <tr><th> Condition Name:</th><td>-</td></tr>
            <tr><th>Notes:</th><td>-</td></tr>
            
          </tbody>
        </table>
      </div>
    )}
  </div>} */}
                {individualProfile?.profile === "HUMAN" && (
                  <div className="personaledit p-3 mb-4" style={{ border: "1px solid #eee", borderRadius: "10px" }}>
                    <h5 style={{ backgroundColor: "red", padding: "10px", color: "white" }}>
                      VITAL MEDICAL CONDITIONS
                      <i
                        //className={`float-right ${conditionData ? "fa fa-pencil-square" : "fa fa-plus-square-o"}`}
                        className={`float-right ${"fa fa-plus-square-o"}`}
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal7"
                        // onClick={() => conditionData ? handleEditCondition() : handleAddCondition()}
                        onClick={handleAddCondition}
                      ></i>
                    </h5>

                    {conditionData && conditionData?.map((conditionRow) => (
                      <div key={conditionRow?.id}>
                        <div className="table-responsive">
                          <table className="table">
                            <tbody>
                              <tr><th>Condition Name:</th><td>{conditionRow?.condition_name || "-"}</td></tr>
                              <tr><th>Notes:</th><td>{conditionRow?.condition_notes || "-"}</td></tr>
                            </tbody>
                          </table>
                        </div>

                        <div className="text-right">
                          <i className="fa fa-trash mr-2" onClick={() => handleDeleteCondition(conditionRow.id)}></i>
                          <i
                            className="fa fa-pencil-square"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal7"
                            onClick={() => handleEditCondition(conditionRow)}
                          ></i>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {/* ================= VET DETAILS ================= */}

                {/* {individualProfile?.profile === "PET"  &&<div className="personaledit p-3 mb-4" 
   style={{ border: "1px solid #eee", borderRadius: "10px" }}>
    <h5>
      VET DETAILS
      
        <i
         className={`float-right ${ "fa fa-plus-square-o"}`}
          // className={`float-right ${hasVetDetails ? "fa fa-pencil-square" : "fa fa-plus-square-o"}`}
          data-bs-toggle="modal"
          data-bs-target="#exampleModal5"
        ></i>
      
    </h5>

    {hasVetDetails && (
      <div className="table-responsive">
        <table className="table">
          <tbody>
            <tr><th> Name:</th><td>-</td></tr>
            <tr><th>Personal Number:</th><td>-</td></tr>
            <tr><th>Address :</th><td>-</td></tr>
            
          </tbody>
        </table>
      </div>
    )}
  </div>} */}
                {/* {individualProfile?.profile === "PET" && (
  <div className="personaledit p-3 mb-4" style={{ border: "1px solid #eee", borderRadius: "10px" }}>
    <h5>
      VET DETAILS
      <i
        className={`float-right ${"fa fa-plus-square-o"}`}
        data-bs-toggle="modal"
        data-bs-target="#exampleModalVet"
           onClick={handleAddInsurance}
        //onClick={handleAddVetDetail}
        style={{ cursor: "pointer" }}
      ></i>
    </h5>
 
    {vetDetailData && vetDetailData.map((row) => (
      <div key={row.id}>
        <div className="table-responsive">
          <table className="table">
            <tbody>
              <tr><th>Name:</th><td>{row.name || "-"}</td></tr>
              <tr><th>Personal Number:</th><td>{row.phone || "-"}</td></tr>
              <tr><th>Address:</th><td>{row.address || "-"}</td></tr>
            </tbody>
          </table>
        </div>
        <div className="text-right">
          <i className="fa fa-trash mr-2" style={{ cursor: "pointer" }} 
          // onClick={() => handleDeleteVetDetail(row.id)}
          onClick={() => handleDeleteInsurance(row.id)}
          >

          </i>
          <i className="fa fa-pencil-square" style={{ cursor: "pointer" }} 
          data-bs-toggle="modal" data-bs-target="#exampleModalVet"
            onClick={() => handleEditInsurance(row)}
          //  onClick={() => handleEditVetDetail(row)}
           >

           </i>
        </div>
      </div>
    ))}
  </div>
)} */}
                {individualProfile?.profile === "PET" && (
                  <div className="personaledit p-3 mb-4" style={{ border: "1px solid #eee", borderRadius: "10px" }}>
                    <h5 style={{ backgroundColor: "red", padding: "10px", color: "white" }}>
                      VET DETAILS
                      <i
                        className={`float-right ${"fa fa-plus-square-o"}`}
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModalVet"
                        onClick={handleAddVetDetail}
                        style={{ cursor: "pointer" }}
                      ></i>
                    </h5>

                    {vetDetailData && vetDetailData.map((row) => (
                      <div key={row?.id}>
                        <div className="table-responsive">
                          <table className="table">
                            <tbody>
                              <tr><th>Name:</th><td>{row?.insurance_name || "-"}</td></tr>
                              <tr><th>Address:</th><td>{row?.insurance_notes || "-"}</td></tr>
                              <tr><th>Phone:</th><td>{row?.insurance_phone || "-"}</td></tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="text-right">
                          <i
                            className="fa fa-trash mr-2"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleDeleteVetDetail(row.id)}
                          ></i>
                          <i
                            className="fa fa-pencil-square"
                            style={{ cursor: "pointer" }}
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModalVet"
                            onClick={() => handleEditVetDetail(row)}
                          ></i>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {/* ================= INSTRUCTIONS ================== */}
                {/* {individualProfile?.profile === "PET"  &&<div className="personaledit p-3 mb-4" style={{ border: "1px solid #eee", borderRadius: "10px" }}>
    <h5>
       INSTRUCTIONS
    
        <i
         className={`float-right ${ "fa fa-plus-square-o"}`}
          // className={`float-right ${hasInstructions ? "fa fa-pencil-square" : "fa fa-plus-square-o"}`}
          data-bs-toggle="modal"
          data-bs-target="#exampleModal5"
        ></i>
     
    </h5>

    {hasInstructions && (
      <div className="table-responsive">
        <table className="table">
          <tbody>
            <tr><th>Title:</th><td>-</td></tr>
            <tr><th>Notes:</th><td>-</td></tr>
            
          </tbody>
        </table>
      </div>
    )}
  </div>} */}

                {/* {individualProfile?.profile === "PET" && (
  <div className="personaledit p-3 mb-4" style={{ border: "1px solid #eee", borderRadius: "10px" }}>
    <h5>
      INSTRUCTIONS
      <i
        className={`float-right ${"fa fa-plus-square-o"}`}
        data-bs-toggle="modal"
        data-bs-target="#exampleModalInstruction"
        //onClick={handleAddInstruction}
        style={{ cursor: "pointer" }}
      ></i>
    </h5>
 
    {instructionData && instructionData.map((row) => (
      <div key={row.id}>
        <div className="table-responsive">
          <table className="table">
            <tbody>
              <tr><th>Title:</th><td>{row.title || "-"}</td></tr>
              <tr><th>Notes:</th><td>{row.notes || "-"}</td></tr>
            </tbody>
          </table>
        </div>
        <div className="text-right">
          <i className="fa fa-trash mr-2" style={{ cursor: "pointer" }}
          //  onClick={() => handleDeleteInstruction(row.id)}
          onClick={() => handleDeleteCondition(row.id)}
          
           ></i>
          <i className="fa fa-pencil-square" style={{ cursor: "pointer" }}
           data-bs-toggle="modal" data-bs-target="#exampleModalInstruction"
            onClick={() => handleEditCondition(row)}
            // onClick={() => handleEditInstruction(row)}
            >

            </i>
        </div>
      </div>
    ))}
  </div>
)} */}
                {individualProfile?.profile === "PET" && (
                  <div className="personaledit p-3 mb-4" style={{ border: "1px solid #eee", borderRadius: "10px" }}>
                    <h5 style={{ backgroundColor: "red", padding: "10px", color: "white" }}>
                      INSTRUCTIONS
                      <i
                        className={`float-right ${"fa fa-plus-square-o"}`}
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModalInstruction"
                        onClick={handleAddInstruction}
                        style={{ cursor: "pointer" }}
                      ></i>
                    </h5>

                    {instructionData && instructionData.map((row) => (
                      <div key={row?.id}>
                        <div className="table-responsive">
                          <table className="table">
                            <tbody>
                              <tr><th>Title:</th><td>{row?.condition_name || "-"}</td></tr>
                              <tr><th>Notes:</th><td>{row?.condition_notes || "-"}</td></tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="text-right">
                          <i
                            className="fa fa-trash mr-2"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleDeleteInstruction(row.id)}
                          ></i>
                          <i
                            className="fa fa-pencil-square"
                            style={{ cursor: "pointer" }}
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModalInstruction"
                            onClick={() => handleEditInstruction(row)}
                          ></i>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
      <CommonProfileModal
        id="exampleModallink"
        title="PRODUCTS LINKED TO USER'S PROFILE"
        formData={formData}
        setFormData={setFormData}
        cardId={individualProfile?.card_id}   // 👈 IMPORTANT
        cardIssueDate={individualProfile?.card_issue_date} // 👈 IMPORTANT
        loading={isUnlinkProductLoading}
        fields={[
          {
            name: "productId",
            placeholder: "Enter Product ID",
          },
        ]}
        onDelete={handleUnlinkProductFromQR}
        onSave={handleLinkProductToQR}
      // onSave={() => {
      //   console.log("Product Linked:", formData);
      //   // 👉 call API here
      // }}
      />
      <CommonProfileModal
        id="exampleModal2"
        title={editingItem?.section === "emergency" ? "EDIT EMERGENCY CONTACT" : "ADD EMERGENCY CONTACT"}
        fields={emergencyContactFields}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSaveEmergency}
      />


      {/* // PET modal — name, relation, mobile, email
/* */}
      <CommonProfileModal
        id="exampleModalPetOwner"
        title={editingItem?.section === "emergency" ? "EDIT PET OWNER" : "ADD PET OWNER"}
        fields={petOwnerFields}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSaveEmergency}
      />

      <CommonProfileModal
        id="exampleModal2Other"
        title={editingItem?.section === "emergency" ? "EDIT EMERGENCY CONTACT" : "ADD EMERGENCY CONTACT"}
        fields={otherEmergencyFields}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSaveEmergency}
      />
      <CommonProfileModal
        id="exampleModalPetOwner"
        title={editingItem?.section === "petOwner" ? "EDIT PET OWNER" : "ADD PET OWNER"}
        fields={petOwnerFields}
        formData={formData}
        setFormData={setFormData}
      //onSave={handleSavePetOwner}
      />
      <CommonProfileModal
        id="exampleModalVet"
        title={editingItem?.section === "vetDetail" ? "EDIT VET DETAILS" : "ADD VET DETAILS"}
        fields={vetDetailFields}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSaveVetDetail}
      />

      <CommonProfileModal
        id="exampleModalInstruction"
        title={editingItem?.section === "instruction" ? "EDIT INSTRUCTION" : "ADD INSTRUCTION"}
        fields={instructionFields}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSaveInstruction}
      />

      {/* <CommonProfileModal
  id="exampleModalVet"
  title={editingItem?.section === "vetDetail" ? "EDIT VET DETAILS" : "ADD VET DETAILS"}
  fields={vetDetailFields}
  formData={formData}
  setFormData={setFormData}
  onSave={handleSaveInsurance}
  //onSave={handleSaveVetDetail}
/>
 
<CommonProfileModal
  id="exampleModalInstruction"
  title={editingItem?.section === "instruction" ? "EDIT INSTRUCTION" : "ADD INSTRUCTION"}
  fields={instructionFields}
  formData={formData}
  setFormData={setFormData}
  onSave={handleSaveCondition}
  //onSave={handleSaveInstruction}
/> */}
      <CommonProfileModal
        id="exampleModal"
        title={
          individualProfile?.profile === "HUMAN" ? "EDIT PERSONAL INFORMATION" :
            individualProfile?.profile === "PET" ? "EDIT PET INFORMATION" :
              "EDIT INFORMATION"
        }
        fields={personalFields}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSavePersonalInfo}
      />

      <CommonProfileModal
        id="exampleModal3"
        title="EDIT ADDRESS"
        fields={addressFields}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSaveAddress}
      />
      {/* ALLERGY MODAL */}

      <CommonProfileModal
        id="exampleModal4"
        title={editingItem?.section === "allergy" ? "EDIT ALLERGY" : "ADD ALLERGY"}
        fields={allergyFields}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSaveAllergy}
      />
      {/* <CommonProfileModal
  id="exampleModal4"
  title="ALLERGY"
  fields={allergyFields}
  formData={formData}
  setFormData={setFormData}
  onSave={handleSaveAllergy}
/> */}
      {/* <CommonProfileModal id="exampleModal5" title="MEDICATION" fields={medicationFields} formData={formData} setFormData={setFormData} onSave={handleSaveMedication} />

<CommonProfileModal id="exampleModal6" title="HEALTH INSURANCE" fields={insuranceFields} formData={formData} setFormData={setFormData} onSave={handleSaveInsurance} />

<CommonProfileModal id="exampleModal7" title="VITAL MEDICAL CONDITION" fields={conditionFields} formData={formData} setFormData={setFormData} onSave={handleSaveCondition} /> */}
      <CommonProfileModal
        id="exampleModal5"
        title={editingItem?.section === "medication" ? "EDIT MEDICATION" : "ADD MEDICATION"}
        fields={medicationFields}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSaveMedication}
      />
      <CommonProfileModal
        id="exampleModal6"
        title={editingItem?.section === "insurance" ? "EDIT HEALTH INSURANCE" : "ADD HEALTH INSURANCE"}
        fields={insuranceFields}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSaveInsurance}
      />
      <CommonProfileModal
        id="exampleModal7"
        title={editingItem?.section === "condition" ? "EDIT VITAL MEDICAL CONDITION" : "ADD VITAL MEDICAL CONDITION"}
        fields={conditionFields}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSaveCondition}
      />

      {/* <!-- ##### profile Area End ##### --> */}
    </>
  )
}
{/* RIGHT CONTENT */ }
{/* <div className="col-lg-8">

         
          <div
            className="personaledit p-3 mb-4"
            style={{ border: "1px solid #eee", borderRadius: "10px" }}
          >
            <h5>
              PERSONAL INFORMATION
              <NavLink to="#">
                <i
                  className="fa fa-pencil-square float-right"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                ></i>
              </NavLink>
            </h5>

            
            <div className="modal fade" id="exampleModal" tabIndex="-1">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-body">
                    <h5>PERSONAL INFORMATION</h5>

                    <input className="form-control mb-2" placeholder="Name" />
                    <input
                      type="number"
                      className="form-control mb-2"
                      placeholder="Phone"
                    />
                    <input type="date" className="form-control mb-2" />

                    <select className="form-control mb-2">
                      <option>Male</option>
                      <option>Female</option>
                    </select>

                    <input
                      className="form-control mb-2"
                      placeholder="Hair Color"
                    />
                    <input
                      className="form-control mb-2"
                      placeholder="Eye Color"
                    />
                  </div>

                  <div className="modal-footer">
                    <button
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button className="btn btn-primary">Save</button>
                  </div>
                </div>
              </div>
            </div>

           
            <div className="table-responsive">
              <table className="table">
                <tbody>
                  <tr><th>Name:</th><td>MY NAME</td></tr>
                  <tr><th>Personal Number:</th><td>1234567890</td></tr>
                  <tr><th>Birth Date:</th><td>dd/mm/yyyy</td></tr>
                  <tr><th>Gender:</th><td>demo</td></tr>
                  <tr><th>Hair Color:</th><td>demo</td></tr>
                  <tr><th>Eye Color:</th><td>demo</td></tr>
                  <tr><th>Height:</th><td>demo</td></tr>
                  <tr><th>Weight:</th><td>demo</td></tr>
                  <tr><th>Identification Mark:</th><td>demo</td></tr>
                  <tr><th>Blood Group:</th><td>demo</td></tr>
                </tbody>
              </table>
            </div>
          </div>

         
          <div
            className="personaledit p-3 mb-4"
            style={{ border: "1px solid #eee", borderRadius: "10px" }}
          >
            <h5>
              EMERGENCY CONTACTS
              <NavLink to="#">
                <i
                  className="fa fa-plus-square-o float-right"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal2"
                ></i>
              </NavLink>
            </h5>

            <div className="table-responsive">
              <table className="table">
                <tbody>
                  <tr><th>Name:</th><td>MY NAME</td></tr>
                  <tr><th>Relationship:</th><td>Demo</td></tr>
                  <tr><th>Mobile:</th><td>1234567890</td></tr>
                  <tr><th>Alt Mobile:</th><td>1234567890</td></tr>
                  <tr><th>Email:</th><td>demo@gmail.com</td></tr>
                  <tr><th>Emergency Email:</th><td>demo@gmail.com</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          
          <div
            className="personaledit p-3 mb-4"
            style={{ border: "1px solid #eee", borderRadius: "10px" }}
          >
            <h5>
              ADDRESS
              <NavLink to="#">
                <i
                  className="fa fa-pencil-square float-right"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal3"
                ></i>
              </NavLink>
            </h5>

            <div className="table-responsive">
              <table className="table">
                <tbody>
                  <tr><th>Address:</th><td>Lorem ipsum placeholder</td></tr>
                  <tr><th>City:</th><td>demo</td></tr>
                  <tr><th>State:</th><td>demo</td></tr>
                  <tr><th>Pin:</th><td>demo</td></tr>
                </tbody>
              </table>
            </div>
          </div>

         }
          <div
            className="personaledit p-3 mb-4"
            style={{ border: "1px solid #eee", borderRadius: "10px" }}
          >
            <h5>
              ALLERGIES
              <NavLink to="#">
                <i
                  className="fa fa-plus-square-o float-right"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal4"
                ></i>
              </NavLink>
            </h5>

            <div className="table-responsive">
              <table className="table">
                <tbody>
                  <tr><th>Name:</th><td>MY NAME</td></tr>
                  <tr><th>Notes:</th><td>Lorem ipsum placeholder</td></tr>
                </tbody>
              </table>
            </div>
          </div>

         
          <div
            className="personaledit p-3 mb-4"
            style={{ border: "1px solid #eee", borderRadius: "10px" }}
          >
            <h5>
              MEDICATION
              <NavLink to="#">
                <i
                  className="fa fa-plus-square-o float-right"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal5"
                ></i>
              </NavLink>
            </h5>

            <div className="table-responsive">
              <table className="table">
                <tbody>
                  <tr><th>Medicine Name:</th><td>Demo</td></tr>
                  <tr><th>Notes:</th><td>Lorem ipsum</td></tr>
                  <tr><th>Dosage:</th><td>demo</td></tr>
                  <tr><th>Dosage Unit:</th><td>demo</td></tr>
                  <tr><th>Frequency:</th><td>demo</td></tr>
                  <tr><th>Frequency Time:</th><td>demo</td></tr>
                </tbody>
              </table>
            </div>
          </div>

        </div> */}