import axios from "axios"
import base_Url from "../api/api_url"
 
const axiosInstance=axios.create({
baseURL:base_Url,
})

axiosInstance.interceptors.request.use(
    async function(config){
        const token=window.sessionStorage.getItem("token")||window.localStorage.getItem("token");
        if(token){
        config.headers["x-access-token"]=token;
    }
    return config;
    },

    function (err) {
        return Promise.reject(err);
     }

)

export const profileURL=(media)=>{
    return base_Url+`uploads/user/profile_pic/${media}`
}
 
export default axiosInstance;