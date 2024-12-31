import { ApiResponse, SignupFormData } from "../types/AuthType";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
export const authApi={
    singUp: async (formData:SignupFormData):Promise<ApiResponse>=>{
        try {
            const response=await fetch(`${API_BASE_URL}/user/create`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },body:JSON.stringify(formData)
            });
            const result=await response.json();
            // console.log(result);
            // console.log(response);
            const data:ApiResponse={
                success:response.ok,
                message:"Ashcheee",
                data:result
            }
            console.log("final ", data);
            if (!response.ok) {
                throw new Error(result.message || 'Signup failed');
            }
            console.log(data);
            return data;
        } catch (error) {
            throw(error)
        }
    }
}