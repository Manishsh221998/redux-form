import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import base_Url, { end_points } from "../../api/api_url"
import axiosInstance from "../../axiosInstance/axiosInstance"
   
let signIn_api=end_points.signin
// console.log(signIn_api)
let signUp_api=end_points.signup
// console.log(signUp_api)
let profile_api=end_points.profile
// console.log(profile_api)
 
 
// sing_ip thunk
export const sign_up=createAsyncThunk("auth/sign_Up",
 async (userData)=>{
    const res=await axiosInstance.post(signUp_api,userData);
    console.log("axios res for sing up:",res);
    return res?.data;
})

//sing_in thunk
export const sign_in=createAsyncThunk("auht/sing_in",
    async (userData)=>{
        const res =await axiosInstance.post(signIn_api,userData);
        console.log("axios res for sign in:",res.data.data);
        return res?.data;
    }
)

//profile thunk
export const profile=createAsyncThunk("auth/profile",
    async ()=>{
        const res=await axiosInstance.get(profile_api);
        console.log("axios res for profile",res);
        return res?.data;
    }
)

const initialValue={
    isLoading:false,
    error:null,
    postValue:[]
}
export const authSlice=createSlice({
    name:"auth",
    initialState:initialValue,
    extraReducers:(builder)=>{
        console.log("Builder",builder)

        //sing up reducers
        builder.addCase(sign_up.pending,(state,action)=>{
        console.log("sign up, action for pending state:",action)
        state.isLoading=true
         })

         builder.addCase(sign_up.fulfilled,(state,action)=>{
            if(action.payload.status===200){
            console.log("sign up, action for fulfilled state:",action)
            state.isLoading=false
            state.postValue=action.payload.data
            state.error=null
         }
        })

         builder.addCase(sign_up.rejected,(state,action)=>{
            console.log("sign up, action for rejected state:",action)
            state.isLoading=false
            state.error=action.error.message
        })

        //sign in reducers
        builder.addCase(sign_in.pending,(state,action)=>{
            console.log("sign in, action for pending state:",action)
            state.isLoading=true
        })

        builder.addCase(sign_in.fulfilled,(state,action)=>{
            console.log("sign in, action for fulfilled state:",action)
            if(action.payload.status===200){
                state.isLoading=false
                state.postValue=action.payload.data
                state.error=null
            }
        })
        builder.addCase(sign_in.rejected,(state,action)=>{
            console.log("sign in, action for fulfilled state:",action)
            state.isLoading=false
            state.error=action.error.message
        })

        //profile in reducers
        builder.addCase(profile.pending,(state,action)=>{
            console.log("sign in, action for pending state:",action)
            state.isLoading=true
        })

        builder.addCase(profile.fulfilled,(state,action)=>{
            console.log("sign in, action for fulfilled state:",action)
            if(action.payload.status===200){
                state.isLoading=false
                state.postValue=action.payload.data
                state.error=null
            }
        })
        builder.addCase(profile.rejected,(state,action)=>{
            console.log("sign in, action for fulfilled state:",action)
            state.isLoading=false
            state.error=action.error.message
        })


         }
    
})

export default authSlice.reducer