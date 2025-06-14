import axios from "../../api/apiconfig"

export const addUser = (user)=>async(dispatch)=>{

    try {
        const res = await axios.post('/users',user)
        console.log(res);
        
    } catch (error) {
        console.log(error);
        
    }
}