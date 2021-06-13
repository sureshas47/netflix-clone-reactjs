import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name:"user", //store name
  initialState:{
    user: null, 
  },
  
  reducers: {
    // login and logout are (actions)
    login:(state, action)=>{
      state.user=action.payload;
    },
    logout:(state)=>{
      state.user=null;
    },
  },
});

// this will allow access outside of the class
export const { login,logout } = userSlice.actions;

//this will give values from global store and use it to our components  
// state.user=>user is (store name) last user is initial user
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
