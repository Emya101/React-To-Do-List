import styles from './ToDoForm.module.css'
import { useForm } from 'react-hook-form';
import { PRIORITY_DEFAULT } from '../../constants/priorities';
import { useState, useEffect } from 'react';
import {yupResolver} from "@hookform/resolvers/yup";
import { getTodoSchema } from "../../schemas/todo";
import { ToDoFormFields } from '../ToDoFormFields/ToDoFormFields';

export function TodoForm({ onCreate, todo = {} }) {
    const [showAllFields, setShowAllFields] = useState(false)
    const [category, setCategory] = useState("");
    const [customCategory, setCustom] = useState("");

    const { register, handleSubmit, reset, formState:{errors} } = useForm({
        resolver: yupResolver(getTodoSchema({isNew:true})),
        defaultValues:{
            description:"",
            deadline:"",
            priority:PRIORITY_DEFAULT,
            status:"",
            completed:false
        }
    })

    useEffect(() => {
        if (todo && todo.id) {
            setCategory(todo.category || "")
            setCustom(todo.customCategory || "")
        } // only prefill for editing
    }, [todo])

    function handleCreate(data) {
    const finalCategory = category === "custom" ? (customCategory || "Other") : (category || "");
    const finalTodo = {
        id: Date.now().toString(), // simple unique id for demo
        name: data.name || "Untitled",
        description: data.description || "",
        deadline: data.deadline || "",
        priority: data.priority || PRIORITY_DEFAULT,
        status: data.status || "Not-Started",
        completed: data.completed || false,
        category: finalCategory,
        customCategory: category === "custom" ? customCategory : "",
        createdAt: new Date().toLocaleString(),
    };

    onCreate(finalTodo);

    // reset form and category states
    reset();
    setCategory("");
    setCustom("");
}

    return (
        <section>
            <div className={styles.Title}>
                <h3>New To-Do</h3>
                <button onClick={() => setShowAllFields(!showAllFields)}>
                    {showAllFields ? "Hide" : "Show"} all fields
                </button>
            </div>

            <form className={styles.Form} onSubmit={handleSubmit(handleCreate)}>
                <ToDoFormFields showAllFields={showAllFields} category={category}
                    setCategory={setCategory}
                    customCategory={customCategory}
                    setCustom={setCustom}
                    register={register}
                    errors={errors}
                />
                <input type="submit" value="Add" />
            </form>
        </section>
    )
} 