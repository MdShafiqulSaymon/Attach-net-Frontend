import { ApiResponse, SignupFormData } from "../types/AuthType";

// Add these types to your AuthType.ts file
export interface LoginFormData {
    email: string;
    password: string;
}

export interface LoginResponse extends ApiResponse {
    data: {
        id: number;
        username: string;
        email: string;
        role: string;
        // Add other user fields as needed
    };
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export const authApi = {
    singUp: async (formData: SignupFormData): Promise<ApiResponse> => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const result = await response.json();
            
            const data: ApiResponse = {
                success: response.ok,
                message: "Ashcheee",
                data: result
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
    },

    login: async (formData: LoginFormData): Promise<LoginResponse> => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            // Create standardized response
            const data: LoginResponse = {
                success: response.ok,
                message: response.ok ? 'Login successful' : (result.message || 'Login failed'),
                data: result.data || result
            };

            if (!response.ok) {
                throw new Error(result.message || 'Login failed');
            }

            // Store user data in localStorage or other state management
            if (data.success && data.data) {
                localStorage.setItem('user', JSON.stringify(data.data));
                // Optionally store token if your API returns one
                if (result.token) {
                    localStorage.setItem('token', result.token);
                }
            }

            return data;
        } catch (error) {
            throw(error)
        }
    },

    // Optional: Add logout method
    logout: async (): Promise<void> => {
        try {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            // Optional: Call backend logout endpoint if needed
            // await fetch(`${API_BASE_URL}/api/auth/logout`, ...);
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    }
};