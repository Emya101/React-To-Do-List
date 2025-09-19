import styles from './ToDoForm.module.css'
import { useForm } from 'react-hook-form';
import { PRIORITY_DEFAULT } from '../../constants/priorities';
import { useState, useEffect } from 'react';
import { ToDoFormFields } from '../ToDoFormFields/ToDoFormFields';

export function TodoForm({ onCreate, todo = {} }) {
    const [showAllFields, setShowAllFields] = useState(false)
    const [category, setCategory] = useState("");
    const [customCategory, setCustom] = useState("");

    const { register, handleSubmit, reset, formState:{errors} } = useForm({
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
        const finalCategory = category === "custom" ? customCategory || "" : category;

        onCreate(data,{
            category: finalCategory,
        });
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