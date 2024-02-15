export interface AdminRegisterRequest {
  username: string;
  password: string;
  email: string;
}

export interface AdminRegisterResult {
  id: number;
  username: string;
  email: string;
}
