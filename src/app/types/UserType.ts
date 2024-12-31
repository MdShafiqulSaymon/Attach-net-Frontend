export interface FormData {
  username: string;
  email: string;
  batch: string;
  sid: string;
  dept: string;
  phone: string;
  password: string;
  confirm_password: string;
}

export interface FormErrors {
  [key: string]: string;
}

export interface InputField {
  id: keyof FormData;
  type: string;
  label: string;
  placeholder: string;
  required: boolean;
  pattern?: string;
}
