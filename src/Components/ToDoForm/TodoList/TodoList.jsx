import styles from "./TodoList.module.css"

export function TodoList({todos}){
    return(
        <section>
            <h3>To-Do's</h3>
            <ul className={styles.TodoList}>
                {todos.map((todo) => (
                        <li key={todo.id} className={styles.TodoListItem} data-completed={todo.completed}>
                            <div className={styles.Content}>
                            <input type="checkbox" name="completed" defaultChecked={todo.completed} className={styles.Status}/>
                            <div className={styles.Info}>
                            {todo.name}
                            {todo.description && <span className={styles.Description}>{todo.description}</span>}
                            <div className={styles.AdditionalInfo}>
                            {todo.deadline}<br/>
                            {todo.priority !== "none" && todo.priority}<br/>
                            {todo.status !="" && todo.status}<br/>
                            {todo.category!="" && todo.category}<br/> {todo.createdAt}
                            </div>
                            </div> 
                            </div>
                        </li>
                    )
                )}
            </ul>

        </section>
    );
}