import { useState } from "react";
import { SignupFormData, ApiResponse } from "../types/AuthType";
import { authApi } from "../api/authApi";
import { useAuthStore } from "../store/authStore";
export const useSignUp = () => {
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

  return {
    signUp,
    isLoading,
    error,
  };
};
