export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "SUPER_ADMIN" | "USER" | "ADMIN";
  password: string;
  createdAt: string;
  status: "active" | "inactive";
}
