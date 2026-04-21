export interface AuthUser {
  id: string;
  role: "SUPER_ADMIN" | "ADMIN" | "STAFF";
  cafeId?: string;
  iat: number;
  exp: number;
}
