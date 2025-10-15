import { TodoForm } from './Components/ToDo/TodoForm'
import { useEffect, useState } from 'react'
import styles from './App.module.css'
import { TodoList } from './Components/ToDoForm/TodoList/TodoList';
import { ToDoFilters } from './Components/ToDoFilters/ToDoFilters';
import todoLogo from "./assets/to-do-list.png";
import { api } from './api';

function App() {

  const [todos, setTodos] = useState([]);

  function fetchTodos() {
    api.todos.getAll(filters).then((data) => setTodos(data));
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
    api.todos.create(newTodo).then(fetchTodos)
      .catch(error => console.error(error));
  }

  function mergeTodoLogic(todo, changes) {
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
  }

  async function handleUpdate(id, changes) {
    // Merge locally for optimistic UI
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id !== id) return todo;
        return mergeTodoLogic(todo, changes);
      })
    );

    // Find the updated todo object
    try {
      const updatedTodo = todos.find((t) => t.id === id);
      const mergedTodo = mergeTodoLogic(updatedTodo, changes);

      const serverTodo = await api.todos.update(id, mergedTodo);

      setTodos(prevTodos =>
        prevTodos.map(t => (t.id === id ? serverTodo : t))
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  }

  function handleDelete(id) {
    fetch(`${import.meta.env.VITE_MOCKAPI_BASE_URL}/todos/${id}`, {
      method: 'DELETE',
    }).then((response) => {
      if (!response.ok) throw new Error("Failed to create todo");
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    })
      .catch(error => console.error(error));
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
