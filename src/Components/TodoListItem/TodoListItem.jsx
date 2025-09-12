import { PRIORITIES,PRIORITY_DEFAULT } from "../../constants/priorities"
import styles from './TodoListItem.module.css'
import { useState } from "react";

export function TodoListItem({todo,onUpdate}){

    const [isEditing,setIsEditing] = useState(false);

    function handleCompleted(event){
        onUpdate(todo.id, {...todo, completed:event.target.checked})
    }

    const viewingTemplate=(
        <div className={styles.Content}>
            <input type="checkbox" 
                name="completed" 
                checked={todo.completed} 
                onChange={handleCompleted}
                className={styles.Status}/>
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
    )

    return(
        <li className={styles.TodoListItem} data-completed={todo.completed}>
            
        </li>
    )
}