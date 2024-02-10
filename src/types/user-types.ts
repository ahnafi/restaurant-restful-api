export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  full_name: string;
  phone_number: string;
  address: string;
}

export interface UserRegistrationResult {
  id: number;
  username: string;
  email: string;
}
