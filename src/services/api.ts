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
    return res.json();
  },
};
