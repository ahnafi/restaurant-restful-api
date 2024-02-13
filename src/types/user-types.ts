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

export interface auth {
  id: number;
  username: string;
  email: string;
  password: string;
  token?: string | null;
  role?: "ADMIN" | "USER";
}

export interface GetUserResult {
  id: number;
  username: string;
  email: string;
  full_name?: string;
  phone_number?: string;
  address?: string;
}

export class UpdateUser {
  username?: string;
  password?: string;
}

export interface UpdateProfilRequest {
  full_name?: string;
  phone_number?: string;
  address?: string;
}

export class UpdateUserProfile {
  id: number;
  fullName?: string;
  phone?: string;
  address?: string;
  constructor(id: number) {
    this.id = id;
  }
}
