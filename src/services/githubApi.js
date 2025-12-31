import axios from "axios";

const api = axios.create({
  baseURL: "https://api.github.com",
});

export const searchUsers = async (query) => {
  const response = await api.get(`/search/users?q=${query}`);
  return response.data.items;
};
