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
    setTodos((prevTodos) => [...prevTodos, { id: `${prevTodos.length + 1}`, ...newTodo, createdAt: new Date().toLocaleString(), }])
  }

  function handleUpdate(id, newTodo) {
    setTodos((prevTodos) => prevTodos.map((todo) => todo.id === id ? newTodo : todo))
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
