export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  full_name: string;
  phone_number: string;
  address: string;
}

export interface RegistrationResult {
  id: number;
  username: string;
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
