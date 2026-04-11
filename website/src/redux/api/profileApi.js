import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";











export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/user/",
    credentials: "include",
  }),
  tagTypes: ["Profile", "Allergy", "Medication", "Insurance", "Condition", "EmergencyContact"],

  endpoints: (builder) => ({

    // ── PROFILE ──────────────────────────────────────────────────────────────
    createProfile: builder.mutation({
      query: (formData) => ({
        url: "profile/create",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Profile"],
    }),

    editProfile: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `profile/edit/${id}`,
        method: "PUT",
        body
      }),
      invalidatesTags: ["Profile"],
    }),
    editProfileImage: builder.mutation({
  query: ({ id, image }) => {
    const formData = new FormData();
    formData.append("image", image); // 🔥 IMPORTANT

    return {
      url: `profile/edit-profile-image/${id}`,
      method: "PATCH",
      body: formData,
    };
  },
  invalidatesTags: ["Profile"],
}),
    // editProfileImage: builder.mutation({
    //   query: ({ id, ...formData }) => ({
    //     url: `profile/edit-profile-image/${id}`,
    //     method: "PATCH",
    //     body: formData,
    //   }),
    //   invalidatesTags: ["Profile"],
    // }),
    deleteProfile: builder.mutation({
      query: (id) => ({
        url: `profile/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Profile"],
    }),
    editAddress: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `profile/address/edit/${id}`,
        method: "PUT",
        body
      }),
      invalidatesTags: ["Profile"],
    }),

       getAllProfilesByUser: builder.query({
      query: ( register_id) => `profile/my-profile?register_id=${register_id}`,
      providesTags: ["Profile"],
    }),


    getIndividualProfileById: builder.query({
      query: (id) => `profile/profile/${id}`,
      providesTags: ["Profile"],
    }),


    addEmergencyContact: builder.mutation({
      query: (body) => ({
        url: "profile/emergency/add",
        method: "POST",
        body,
      }),
      invalidatesTags: ["EmergencyContact"],
    }),

    editEmergencyContact: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `profile/emergency/edit/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["EmergencyContact"],
    }),

    deleteEmergencyContact: builder.mutation({
      query: (id) => ({
        url: `profile/emergency/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["EmergencyContact"],
    }),

    // ══════════════════════════════════════════════════════════════════════════
    //  ALLERGY
    //  POST   /api/allergy/add
    //  GET    /api/allergy/:information_id
    //  PUT    /api/allergy/edit/:id
    //  DELETE /api/allergy/delete/:id
    // ══════════════════════════════════════════════════════════════════════════
    addAllergy: builder.mutation({
      query: (body) => ({
        url: "profile/allergy/add",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Allergy"],
    }),

   

    editAllergy: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `profile/allergy/edit/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Allergy"],
    }),

    deleteAllergy: builder.mutation({
      query: (id) => ({
        url: `profile/allergy/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Allergy"],
    }),

    // ══════════════════════════════════════════════════════════════════════════
    //  MEDICATION
    //  POST   /api/medication/add
    //  GET    /api/medication/:information_id
    //  PUT    /api/medication/edit/:id
    //  DELETE /api/medication/delete/:id
    // ══════════════════════════════════════════════════════════════════════════
    addMedication: builder.mutation({
      query: (body) => ({
        url: "profile/medication/add",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Medication"],
    }),

    

    editMedication: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `profile/medication/edit/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Medication"],
    }),

    deleteMedication: builder.mutation({
      query: (id) => ({
        url: `profile/medication/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Medication"],
    }),

    // ══════════════════════════════════════════════════════════════════════════
    //  INSURANCE
    //  POST   /api/insurance/add
    //  GET    /api/insurance/:information_id
    //  PUT    /api/insurance/edit/:id
    //  DELETE /api/insurance/delete/:id
    // ══════════════════════════════════════════════════════════════════════════
    addInsurance: builder.mutation({
      query: (body) => ({
        url: "profile/insurance/add",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Insurance"],
    }),


    editInsurance: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `profile/insurance/edit/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Insurance"],
    }),

    deleteInsurance: builder.mutation({
      query: (id) => ({
        url: `profile/insurance/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Insurance"],
    }),

    // ══════════════════════════════════════════════════════════════════════════
    //  CONDITION
    //  POST   /api/condition/add
    //  GET    /api/condition/:information_id
    //  PUT    /api/condition/edit/:id
    //  DELETE /api/condition/delete/:id
    // ══════════════════════════════════════════════════════════════════════════
    addCondition: builder.mutation({
      query: (body) => ({
        url: "profile/condition/add",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Condition"],
    }),

    

    editCondition: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `profile/condition/edit/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Condition"],
    }),

    deleteCondition: builder.mutation({
      query: (id) => ({
        url: `profile/condition/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Condition"],
    }),

  linkProductToQR: builder.mutation({
  query: ({ id, code }) => ({
    url: `profile/link-product-qr/${id}`, // ✅ id in params
    method: "POST",
    body: { code }, // only code in body
  }),
  invalidatesTags: ["Profile"],
}),

unlinkProductFromQR: builder.mutation({
  query: ({ id, code }) => ({
    url: `profile/unlink-product-qr/${id}`, // ✅ id in params
    method: "PATCH",
    body: { code }, // only code in body
  }),
  invalidatesTags: ["Profile"],
}),

getIndividualProfileByQRCode: builder.query({
  query: (code) => `profile/profile-details-qr/${code}`,
  providesTags: ["Profile"],
}),

  }),
});

export const {
  // profile
  useCreateProfileMutation,
  useEditProfileMutation,
  useEditProfileImageMutation,
  useDeleteProfileMutation,
  useEditAddressMutation,
  useGetAllProfilesByUserQuery,
  useGetIndividualProfileByIdQuery,


  useAddEmergencyContactMutation,
  useEditEmergencyContactMutation,
  useDeleteEmergencyContactMutation,
  // allergy
  useAddAllergyMutation,
  
  useEditAllergyMutation,
  useDeleteAllergyMutation,

  // medication
  useAddMedicationMutation,
  
  useEditMedicationMutation,
  useDeleteMedicationMutation,

  // insurance
  useAddInsuranceMutation,

  useEditInsuranceMutation,
  useDeleteInsuranceMutation,

  // condition
  useAddConditionMutation,
  useGetAllConditionsQuery,
  useEditConditionMutation,
  useDeleteConditionMutation,

  useLinkProductToQRMutation,
  useUnlinkProductFromQRMutation,
  useGetIndividualProfileByQRCodeQuery,
} = profileApi;
