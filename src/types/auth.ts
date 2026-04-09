export interface AuthUser {
  id: string;
  role: "SUPER_ADMIN" | "ADMIN";
  cafeId?: string;
  iat: number;
  exp: number;
}
