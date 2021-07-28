export interface LoginForm {
  email: string;
  password: string;
}

export interface RegistrationForm {
  email: string;
  password: string;
  confirmPassword?: string;
  firstName: string;
  lastName: string;
}
