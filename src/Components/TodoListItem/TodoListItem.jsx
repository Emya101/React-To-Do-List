import { PRIORITIES, PRIORITY_DEFAULT } from "../../constants/priorities"
import { useForm } from "react-hook-form";
import { ToDoFormFields } from "../ToDoFormFields/ToDoFormFields";
import styles from './TodoListItem.module.css'
import { yupResolver } from "@hookform/resolvers/yup";
import { getTodoSchema } from "../../schemas/todo";
import { useState, useEffect } from "react";
import { ConfirmDialog } from "../ConfirmDialog/ConfirmDialog";

export function TodoListItem({ todo, onUpdate, onDelete }) {

    const [isEditing, setIsEditing] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [category, setCategory] = useState(todo.category || "");
    const [customCategory, setCustom] = useState(todo.customCategory || "");

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(getTodoSchema()), defaultValues: todo })


    function handleCompleted(event) {
        onUpdate(todo.id, { completed: event.target.checked })
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

    function handleDeleteConfirmed() {
        onDelete(todo.id);
        setShowConfirm(false);
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
                    {todo.createdAt && (<p>Created on {todo.createdAt}</p>)}
                </div>
                {todo.description && <span className={styles.Description}>Description: {todo.description}</span>}
                <div className={styles.AdditionalInfo}>
                    {PRIORITIES[todo.priority] && todo.priority !== PRIORITY_DEFAULT && (
                        <span>
                            Priority:{" "}
                            <span style={{ color: PRIORITIES[todo.priority].color }}>
                                {PRIORITIES[todo.priority].label}
                            </span>
                        </span>
                    )}
                    Status: {todo.status != "" && todo.status}<br />
                    {todo.category && (
                        <span>
                            Category: {todo.category}
                        </span>
                    )}
                </div>
            </div>
            <div className={styles.Controls}>
                <button title="Edit task" onClick={() => setIsEditing(true)} >✏️</button>
                <button title="Delete task" onClick={() => setShowConfirm(true)}>🗑️</button>
            </div>
        </div>
    )

    const editingTemplate = <form className={styles.Content} onReset={() => setIsEditing(false)} onSubmit={handleSubmit(handleEdit)} >
        <ToDoFormFields todo={todo} category={category}
            setCategory={setCategory}
            customCategory={customCategory}
            setCustom={setCustom}
            register={register}
            errors={errors} />

        <div className={styles.Controls}>
            <input type="submit" value="💾" />
            <input type="reset" value="❌" />

        </div>
    </form>

    return (
        <li className={styles.TodoListItem} data-completed={todo.completed}>
            {isEditing ? editingTemplate : viewingTemplate}

            {showConfirm && (
                <ConfirmDialog
                    message={`Do you want to delete this task "${todo.name}"?`}
                    onConfirm={handleDeleteConfirmed}
                    onCancel={() => setShowConfirm(false)}
                />
            )}
        </li>
    )
}