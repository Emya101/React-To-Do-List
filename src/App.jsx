import { TodoForm } from './Components/ToDo/TodoForm'
import { useState } from 'react'
import styles from './App.module.css'
import { TodoList } from './Components/ToDoForm/TodoList/TodoList';
import { ToDoFilters } from './Components/ToDoFilters/ToDoFilters';

const TODOS_DEFAULT = [{
  id: "1",
  name: "Buy an Ice Cream",
  description: "Buy the white/vanilla one",
  deadline: "2025-09-12",
  priority: "high",
  status: "Not-Started",
  category: "work",
  completed: false,
  previousStatus: "Not-Started",
  createdAt: "2025-09-10, 10:45:22 a.m."
}, {
  id: "2",
  name: "Bring in my car",
  description: "The 2015 Lambo",
  deadline: "2025-10-12",
  priority: "medium",
  status: "Not-Started",
  category: "personal",
  completed: false,
  previousStatus: "Not-Started",
  createdAt: "2025-09-10, 10:47:22 a.m."
}, {
  id: "3",
  name: "Finish this app",
  description: "Emoticonquotes",
  deadline: "2025-09-13",
  priority: "high",
  status: "Completed",
  category: "work",
  completed: true,
  previousStatus: "In-Progress",
  createdAt: "2025-10-10, 10:45:22 a.m."
}, {
  id: "4",
  name: "develop nukes",
  description: "",
  deadline: "",
  priority: "none",
  status: "",
  category: "",
  completed: false,
}]

function App() {

  const [todos, setTodos] = useState(TODOS_DEFAULT);
  const [filters, setFilters] = useState({ completed: "", priority: "" })

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
    const { completed, priority } = filters;

    return (
      (completed === "" || todo.completed === completed)
      &&
      (priority === "" || todo.priority === priority)
    );
  }

  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <img className={styles.Logo} src="/to-do-list.png" />
        <h2 className={styles.Title}>To-Do App</h2>
      </header>

      <div className={styles.AppContainer}><TodoForm onCreate={handleCreate} />
        <ToDoFilters onFilter={setFilters} />
        <TodoList todos={todos.filter(filterTodos)} onUpdate={handleUpdate} onDelete={handleDelete} />
      </div>
    </div>
  )
}

export default App
