import { PRIORITIES, PRIORITY_DEFAULT } from "../../constants/priorities"
import { ToDoFormFields } from "../ToDoFormFields/ToDoFormFields";
import styles from './TodoListItem.module.css'
import { useState,useEffect } from "react";

export function TodoListItem({ todo, onUpdate }) {

    const [isEditing, setIsEditing] = useState(false);

    const [category, setCategory] = useState(todo.category || "");
    const [customCategory, setCustom] = useState(todo.customCategory || "");


    function handleCompleted(event) {
        onUpdate(todo.id, { ...todo, completed: event.target.checked })
    }

    function handleEdit(event){
        event.preventDefault();

        const { elements } = event.target

        if (elements.name.value === "") return (
            alert("Please fill out To-do name")
        );

       const finalCategory = category === "custom" ? customCategory || "" : category;

        onUpdate(todo.id,{
            name: elements.name.value,
            description: elements.description.value,
            deadline: elements.deadline.value,
            priority: elements.priority.value,
            status: elements.status.value ?? "",
            category: finalCategory,
            completed: todo.completed,
        });

        setIsEditing(false);
    }

    const viewingTemplate = (
        <div className={styles.Content}>
            <input type="checkbox"
                name="completed"
                checked={todo.completed}
                onChange={handleCompleted}
                className={styles.Status} />
            <div className={styles.Info}>
                <div className={styles.Time}>
                    <p>{todo.name}</p>
                    <p>Created on {todo.createdAt}</p>
                </div>
                {todo.description && <span className={styles.Description}>{todo.description}</span>}
                <div className={styles.AdditionalInfo}>
                    {todo.deadline}<br />
                    {todo.priority !== PRIORITY_DEFAULT && (<span style={{ color: PRIORITIES[todo.priority].color }}>
                        {PRIORITIES[todo.priority].label}
                    </span>
                    )}
                    {todo.status != "" && todo.status}<br />
                    {todo.category != "" && todo.category}<br />
                </div>
            </div>
            <div className={styles.Controls}>
                <button title="Edit task" onClick={() => setIsEditing(true)} >✏️</button>
            </div>
        </div>
    )

    const editingTemplate = <form className={styles.Content} onReset={()=>setIsEditing(false)} onSubmit={handleEdit} >
        <ToDoFormFields todo={todo} category={category}
            setCategory={setCategory}
            customCategory={customCategory}
            setCustom={setCustom} />

        <div className={styles.Controls}>
            <input type="submit" value="💾"/>
            <input type="reset" value="❌"/>
            
        </div>
    </form>

    return (
        <li className={styles.TodoListItem} data-completed={todo.completed}>
            {isEditing ? editingTemplate : viewingTemplate}
        </li>
    )
}