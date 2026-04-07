export interface AuthUser {
  id: string;
  role: "SUPER_ADMIN" | "ADMIN";
  iat: number;
  exp: number;
}
