export interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  cnpj: string;
  role_id: number;
}


export interface IAuthenticateUserDTO {
  email: string;
  password: string;
  cnpj: string;
  role_id: number;
}

// src/modules/Users/DTOs/UserProfileDTO.ts
export interface IUserProfileDTO {
  id: number;
  name: string;
  email: string;
  cnpj: string;
  role_id: number;
  created_at: Date;
  updated_at: Date;
  // Poderia incluir campos calculados como:
  // account_age_days?: number;
}
