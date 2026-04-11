import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  loggedIn: false,
  loggedInUser: {},
  
 
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
    setLoggedInUser: (state, action) => {
      state.loggedInUser = action.payload;
    },
    

       
  },
});

export const {setLoggedIn,setLoggedInUser} = userSlice.actions;
export default userSlice.reducer; // ✅ Export the reducer only
