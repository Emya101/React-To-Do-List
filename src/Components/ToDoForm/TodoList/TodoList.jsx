import styles from "./TodoList.module.css"
import { PRIORITIES,PRIORITY_DEFAULT } from "../../../constants/priorities";

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
                            <div className={styles.Time}>
                            <p>{todo.name}</p>
                            <p>Created on {todo.createdAt}</p>
                            </div> 
                            {todo.description && <span className={styles.Description}>{todo.description}</span>}
                            <div className={styles.AdditionalInfo}>
                            {todo.deadline}<br/>
                            {todo.priority !== PRIORITY_DEFAULT && (<span style={{color:PRIORITIES[todo.priority].color}}>
                                {PRIORITIES[todo.priority].label}
                                </span>
                            )}
                            {todo.status !="" && todo.status}<br/>
                            {todo.category!="" && todo.category}<br/>
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