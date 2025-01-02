import { useState } from "react";
import { SignupFormData, ApiResponse } from "../types/AuthType";
import { authApi, LoginFormData } from "../api/authApi";
import { useAuthStore } from "../store/authStore";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<String | null>(null);
  const { setUser } = useAuthStore();

  const validateForm = (data: SignupFormData) => {
    const errors: string[] = [];
    if (data.username.length < 3) {
      errors.push("User name must be more than 3 Character");
    }
    if (!data.email.includes("@")) {
      errors.push("Invalid email format");
    }

    if (data.password.length < 8) {
      errors.push("Password must be at least 8 characters");
    }

    if (!/^\d{7}$/.test(data.sid)) {
      errors.push("Student ID must be 7 digits");
    }

    if (!/^\d{3}-\d{2}-\d{3}$/.test(data.phone)) {
      errors.push("Phone number must match format: 123-45-678");
    }

    return errors;
  };

  const validateLoginForm = (data: LoginFormData) => {
    const errors: string[] = [];
    if (!data.email.includes("@")) {
      errors.push("Invalid email format");
    }
    if (!data.password) {
      errors.push("Password is required");
    }
    return errors;
  };

  const signUp = async (data: SignupFormData): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      const validationErrors = validateForm(data);
      if (validationErrors.length > 0) {
        setError(validationErrors.join(", "));
        return false;
      }
      const response = await authApi.singUp(data);
      if (response.success) {
        setUser(response.data);
        return true;
      }
      return false;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (data: LoginFormData): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      // Validate form data
      const validationErrors = validateLoginForm(data);
      if (validationErrors.length > 0) {
        setError(validationErrors.join(", "));
        return false;
      }

      // Call login API
      const response = await authApi.login(data);
      
      if (response.success) {
        // Update user state
        return true;
      }

      setError("Login failed");
      return false;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      await authApi.logout();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Logout failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signUp,
    login,
    logout,
    isLoading,
    error,
  };
};