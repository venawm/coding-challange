export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image: string;
  company: { name: string };
  role: string;
}

export interface UsersResponse {
  users: User[];
  total: number;
}
