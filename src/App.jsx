import { TodoForm } from './Components/ToDo/TodoForm'
import { useEffect, useState } from 'react'
import styles from './App.module.css'
import { TodoList } from './Components/ToDoForm/TodoList/TodoList';
import { ToDoFilters } from './Components/ToDoFilters/ToDoFilters';
import todoLogo from "./assets/to-do-list.png";

function App() {

  const [todos, setTodos] = useState([]);

  async function fetchTodos() {
  const searchParams = new URLSearchParams(filters).toString();
  const url = `${import.meta.env.VITE_MOCKAPI_BASE_URL}/todos?${searchParams}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    });

    // MockAPI sometimes returns 404 when no records match
    if (response.status === 404) {
      console.warn("No todos found for filters:", filters);
      setTodos([]); // set empty list gracefully
      return;
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch todos: ${response.status}`);
    }

    const data = await response.json();

    // Make sure data is an array
    if (Array.isArray(data)) {
      setTodos(data);
    } else {
      console.warn("Unexpected response format:", data);
      setTodos([]);
    }
  } catch (error) {
    console.error("Error fetching todos:", error);
    setTodos([]); // always keep it safe
  }
}


  const [filters, setFilters] = useState({ completed: "", priority: "" })
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.body.classList.toggle("dark-mode", savedTheme === "dark");
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [filters]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    // Toggle a class on the body
    document.body.classList.toggle("dark-mode", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  }

  function handleCreate(newTodo) {
    fetch(`${import.meta.env.VITE_MOCKAPI_BASE_URL}/todos`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newTodo)
    }).then((response) => {
      if (!response.ok) throw new Error("Failed to create todo");
      return response.json();
    })
      .then(fetchTodos)
      .catch (error=> console.error(error));
}

async function handleUpdate(id, changes) {
  // Merge locally for optimistic UI
  setTodos((prevTodos) =>
    prevTodos.map((todo) => {
      if (todo.id !== id) return todo;

      let merged = { ...todo, ...changes };

      if (changes.status) {
        if (changes.status === "Completed") {
          merged.completed = true;
          merged.previousStatus =
            todo.status !== "Completed" ? todo.status : todo.previousStatus;
        } else {
          merged.completed = false;
          merged.previousStatus = changes.status;
        }
      }

      if ("completed" in changes && !("status" in changes)) {
        if (changes.completed) {
          merged.previousStatus =
            todo.status !== "Completed" ? todo.status : todo.previousStatus;
          merged.status = "Completed";
        } else {
          merged.status = todo.previousStatus || "Not-Started";
        }
      }

      return merged;
    })
  );

  // Find the updated todo object
  const updatedTodo = todos.find((t) => t.id === id);
  const mergedTodo = { ...updatedTodo, ...changes };

  // Merge status/completed logic again to send correct fields to server
  if (changes.status) {
    if (changes.status === "Completed") {
      mergedTodo.completed = true;
      mergedTodo.previousStatus =
        updatedTodo.status !== "Completed" ? updatedTodo.status : updatedTodo.previousStatus;
    } else {
      mergedTodo.completed = false;
      mergedTodo.previousStatus = changes.status;
    }
  }

  if ("completed" in changes && !("status" in changes)) {
    if (changes.completed) {
      mergedTodo.previousStatus =
        updatedTodo.status !== "Completed" ? updatedTodo.status : updatedTodo.previousStatus;
      mergedTodo.status = "Completed";
    } else {
      mergedTodo.status = updatedTodo.previousStatus || "Not-Started";
    }
  }

  try {
    // Send updated todo to server
    const response = await fetch(`${import.meta.env.VITE_MOCKAPI_BASE_URL}/todos/${id}`, {
      method: "PUT", // or PATCH depending on your API
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mergedTodo),
    });

    if (!response.ok) throw new Error("Failed to update todo");

    // Optionally update state again with server response (to ensure consistency)
    const serverTodo = await response.json();
    setTodos((prevTodos) =>
      prevTodos.map((t) => (t.id === id ? serverTodo : t))
    );
  } catch (error) {
    console.error(error);
    // Optionally revert local state if server fails
  }
}



function handleDelete(id) {
  fetch(`${import.meta.env.VITE_MOCKAPI_BASE_URL}/todos/${id}`, {
      method: 'DELETE',
    }).then((response) => {
      if (!response.ok) throw new Error("Failed to create todo");
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    })
      .catch (error=> console.error(error));
}

return (
  <div className={`${styles.App} ${styles[theme]}}`}>
    <header className={styles.Header}>
      <img className={styles.Logo} src={todoLogo} alt="ToDo Logo"
      />
      <span>
        <h2 className={styles.Title}>To-Do App</h2>

        <button onClick={toggleTheme}>
          {theme === "light" ? "Switch to 🌑Dark Mode" : "Switch to ☀️Light Mode"}


        </button>
      </span>
    </header>

    <div className={styles.AppContainer}><TodoForm onCreate={handleCreate} />
      <ToDoFilters onFilter={setFilters} todos={todos} />
      <TodoList todos={todos} onUpdate={handleUpdate} onDelete={handleDelete} />
    </div>
  </div>
)
}

export default App
