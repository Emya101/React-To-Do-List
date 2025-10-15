export const api = {
    todos: {
        async getAll(params = {}) {
            const searchParams = new URLSearchParams(params).toString();
            const url = `${import.meta.env.VITE_MOCKAPI_BASE_URL}/todos?${searchParams}`;

            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: { 'content-type': 'application/json' },
                });

                // MockAPI sometimes returns 404 when no records match
                if (response.status === 404) {
                    console.warn("No todos found for filters:", filters);
                    // set empty list gracefully
                    return [];
                }

                if (!response.ok) {
                    throw new Error(`Failed to fetch todos: ${response.status}`);
                }

                const data = await response.json();

                // Make sure data is an array
                if (Array.isArray(data)) {
                    return data;
                } else {
                    console.warn("Unexpected response format:", data);
                    return [];
                }
            } catch (error) {
                console.error("Error fetching todos:", error);
                return []; // always keep it safe
            }
        }
    },

    async create(data) {
        const response = await fetch(`${import.meta.env.VITE_MOCKAPI_BASE_URL}/todos`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newTodo)
        });
        if (!response.ok) throw new Error("Failed to create todo");
        return await response.json();
    },

    async update(id, data) {
        const url = `${import.meta.env.VITE_MOCKAPI_BASE_URL}/todos/${id}`;
        const response = await fetch(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Failed to update todo: ${response.status}`);
        }

        return await response.json(); // return the updated todo from the server
    },


delete (id) { },
}