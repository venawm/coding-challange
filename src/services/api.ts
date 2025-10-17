export const api = {
  async fetchUsers(params: {
    search?: string;
    page: number;
    limit: number;
    sortBy: string;
    sortOrder: string;
  }) {
    const { search, page, limit, sortBy, sortOrder } = params;
    const skip = (page - 1) * limit;

    const url = search
      ? `https://dummyjson.com/users/search?q=${search}&limit=${limit}&skip=${skip}`
      : `https://dummyjson.com/users?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${sortOrder}`;

    const res = await fetch(url);
    const data = await res.json();

    return {
      users: (data.users || []).map((u: any) => ({
        id: u.id,
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        phone: u.phone,
        image: u.image,
        company: { name: u.company?.name || "N/A" },
        role: u.role || "User",
      })),
      total: data.total || 0,
    };
  },
};
