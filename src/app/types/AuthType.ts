export interface SignupFormData {
  username: string;
  email: string;
  batch: string;
  sid: string;
  dept: string;
  role:string;
  phone: string;
  password: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}
