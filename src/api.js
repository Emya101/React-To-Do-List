
import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_MOCKAPI_BASE_URL,
  headers:{'content-type':"application/json" },
  timeout: 5000,
})

http.interceptors.response.use(({data}) => data)

export const api = {
     todos: {
    async getAll(params = {}) {
      try {
        // Axios automatically builds ?key=value from params
        const data = await http.get("/todos", { params });

        // Axios puts parsed JSON in response.data
        return Array.isArray(data) ? data : [];
      } catch (error) {
        // Graceful handling of 404s
        if (error?.response?.status === 404) {
          console.warn("No todos found for filters:", params);
          return [];
        }

        console.error("Error fetching todos:", error);
        return [];
      }
    },

    async create(data) {
      return http.post('todos',data);
    },

    async update(id, data) {
       return http.put(`todos/${id}`,data);
    },

    async delete(id) {
       return http.delete(`todos/${id}`);
    },
  },
};
