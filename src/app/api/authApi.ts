import { ApiResponse, SignupFormData } from "../types/AuthType";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';
export const authApi={
    singUp: async (formData:SignupFormData):Promise<ApiResponse>=>{
        try {
            const response=await fetch(`${API_BASE_URL}/auth/create`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },body:JSON.stringify(formData)
            });
            const result=await response.json();
            if (!response.ok) {
                throw new Error(result.message || 'Signup failed');
            }
            return result;
        } catch (error) {
            throw(error)
        }
    }
}