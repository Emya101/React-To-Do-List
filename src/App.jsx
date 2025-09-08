import styles from './App.module.css'

function App() {
  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <img className={styles.Logo} src="/to-do-list.png"/>
        <h2 className={styles.Title}>To-Do App</h2>
      </header>

      <div className={styles.AppContainer}>Content</div>
    </div>
  )
}

export default App
