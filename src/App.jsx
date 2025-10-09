import { TodoForm } from './Components/ToDo/TodoForm'
import { useEffect, useState } from 'react'
import styles from './App.module.css'
import { TodoList } from './Components/ToDoForm/TodoList/TodoList';
import { ToDoFilters } from './Components/ToDoFilters/ToDoFilters';
import todoLogo from "./assets/to-do-list.png";

function App() {

  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  function fetchTodos() {
    fetch(`${import.meta.env.VITE_MOCKAPI_BASE_URL}/todos`, {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    }).then((response) => !!response.ok && response.json())
      .then((todos) => setTodos(todos));
  };

  const [filters, setFilters] = useState({ completed: "", priority: "" })
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    fetchTodos();
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.body.classList.toggle("dark-mode", savedTheme === "dark");
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    // Toggle a class on the body
    document.body.classList.toggle("dark-mode", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  }

  function handleCreate(newTodo) {
    const status = newTodo.status || "Not-Started";

    setTodos((prevTodos) => [...prevTodos, {
      id: `${prevTodos.length + 1}`, ...newTodo,
      status,
      completed: status === "Completed",
      previousStatus: status === "Completed" ? "Not-Started" : status,
      createdAt: new Date().toLocaleString(),
    }])
    console.log(newTodo);
  }

  function handleUpdate(id, changes) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id !== id) return todo;

        let merged = { ...todo, ...changes };

        if (changes.status) {
          if (changes.status === "Completed") {
            merged.completed = true;
            merged.previousStatus =
              todo.status !== "Completed" ? todo.status : todo.previousStatus;
          }
          else {
            merged.completed = false;
            merged.previousStatus = changes.status;
          }
        }

        if ("completed" in changes && !("status" in changes)) {
          if (changes.completed) {
            merged.previousStatus =
              todo.status != "Completed" ? todo.status : todo.previousStatus;
            merged.status = "Completed";
          }
          else {
            merged.status = todo.previousStatus || "Not-Started";
          }
        }
        return merged;
      })
    );
  }


  function handleDelete(id) {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
  }

  function filterTodos(todo) {
    const { completed, priority, category } = filters;

    return (
      (completed === "" || todo.completed === completed)
      &&
      (priority === "" || todo.priority === priority)
      &&
      (category === "" || todo.category === category)
    );
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
        <TodoList todos={todos.filter(filterTodos)} onUpdate={handleUpdate} onDelete={handleDelete} />
      </div>
    </div>
  )
}

export default App
