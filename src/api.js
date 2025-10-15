const BASE_URL=import.meta.env.VITE_MOCKAPI_BASE_URL

export const api = {
  todos: {
    async getAll(params = {}) {
      const searchParams = new URLSearchParams(params).toString();
      const url = `${BASE_URL}/todos?${searchParams}`;

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: { 'content-type': 'application/json' },
        });

        if (response.status === 404) {
          console.warn("No todos found for filters:", params);
          return [];
        }

        if (!response.ok) {
          throw new Error(`Failed to fetch todos: ${response.status}`);
        }

        const data = await response.json();
        return Array.isArray(data) ? data : [];
      } catch (error) {
        console.error("Error fetching todos:", error);
        return [];
      }
    },

    async create(data) {
      const response = await fetch(`${BASE_URL}/todos`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to create todo");
      return await response.json();
    },

    async update(id, data) {
      const url = `${BASE_URL}/todos/${id}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to update todo: ${response.status}`);
      }

      return await response.json();
    },

    async delete(id) {
      const response = await fetch(`${BASE_URL}/todos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error("Failed to delete todo");
      return true;
    },
  },
};
