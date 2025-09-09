import { TodoForm } from './Components/ToDoForm/TodoForm'
import { useState } from 'react'
import styles from './App.module.css'

function App() {

  const [todos, setTodos]=useState([]);

  function handleCreate(newTodo){
    setTodos((prevTodos)=>[...prevTodos,{id:`${prevTodos.length+1}`,...newTodo}])
  }
  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <img className={styles.Logo} src="/to-do-list.png"/>
        <h2 className={styles.Title}>To-Do App</h2>
      </header>

      <div className={styles.AppContainer}><TodoForm onCreate={handleCreate}/>{JSON.stringify(todos)}</div>
    </div>
  )
}

export default App
