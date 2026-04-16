import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";







export const homeWebsiteApi = createApi({
  reducerPath: "homeWebsiteApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/",
    credentials: "include", // same as withCredentials: true
  }),
  tagTypes: ["Home"], // 👈 added Location for countries/states/cities
  endpoints: (builder) => ({

    

    
   

   

    

   
   
   getAllTagText: builder.query({
     query: () =>
         `home/tag-text?admin=false`,
     providesTags: ["Home"],
   }),
 

   getAllWorks: builder.query({
     query: () =>
         `home/works?admin=false`,
     providesTags: ["Home"],
   }),

getAllWorks2: builder.query({
     query: () =>
         `home/works2?admin=false`,
     providesTags: ["Home"],
   }),
  
 

    // adminLogin: builder.mutation({
    //   query: (body) => ({
    //     url: `admin/login`,
    //     method: "POST",
    //     body,
    //   }),
    //   invalidatesTags: ["User"],
    // }),

   
      getAllCustomerSay: builder.query({
        query: () =>
            `home/customer-say?admin=false`,
        providesTags: ["Home"],
      }),
   
    
  

   
      getAllSliderImages: builder.query({
        query: () =>
            `home/slider-img?admin=false`,
        providesTags: ["Home"],
      }),
      
  
  

    
  }),
});


export const {

  

  
  useGetAllTagTextQuery,
  

  useGetAllWorksQuery,


  useGetAllWorks2Query,



  useGetAllCustomerSayQuery,


 
  useGetAllSliderImagesQuery,
 

} = homeWebsiteApi;
