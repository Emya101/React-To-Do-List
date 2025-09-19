import { PRIORITIES, PRIORITY_DEFAULT } from "../../constants/priorities"
import { useForm } from "react-hook-form";
import { ToDoFormFields } from "../ToDoFormFields/ToDoFormFields";
import styles from './TodoListItem.module.css'
import { useState, useEffect } from "react";

export function TodoListItem({ todo, onUpdate, onDelete }) {

    const [isEditing, setIsEditing] = useState(false);

    const [category, setCategory] = useState(todo.category || "");
    const [customCategory, setCustom] = useState(todo.customCategory || "");

    const { register, handleSubmit, formState: {errors} } = useForm({defaultValues: todo})


    function handleCompleted(event) {
        onUpdate(todo.id, { ...todo, completed: event.target.checked })
    }

    function handleEdit(data) {
        const finalCategory = category === "custom" ? customCategory || "" : category;

        onUpdate(todo.id, {
            ...todo,        // keep old values
            ...data,        // overwrite with form values
            category: finalCategory, // ensure category is correct
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
                <button title="Delete task" onClick={() => onDelete(todo.id)}>🗑️</button>
            </div>
        </div>
    )

    const editingTemplate = <form className={styles.Content} onReset={() => setIsEditing(false)} onSubmit={handleSubmit(handleEdit)} >
        <ToDoFormFields todo={todo} category={category}
            setCategory={setCategory}
            customCategory={customCategory}
            setCustom={setCustom}
            register={register}
            errors= {errors}/>

        <div className={styles.Controls}>
            <input type="submit" value="💾" />
            <input type="reset" value="❌" />

        </div>
    </form>

    return (
        <li className={styles.TodoListItem} data-completed={todo.completed}>
            {isEditing ? editingTemplate : viewingTemplate}
        </li>
    )
}