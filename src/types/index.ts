interface Address {
  address: string;
  city: string;
  state: string;
  postalCode: string;
}

interface Company {
  name: string;
  title: string;
  address: Address;
}
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image: string;
  birthDate: string;
  gender: string;
  address: Address;
  company: Company;
  domain: string;
  university?: string;
  role: string;
  ein?: string;
}

export interface UsersResponse {
  users: User[];
  total: number;
}
