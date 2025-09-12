import styles from './ToDoForm.module.css'
import { PRIORITY_DEFAULT } from '../../constants/priorities';
import { useState } from 'react';
import { ToDoFormFields } from '../ToDoFormFields/ToDoFormFields';

export function TodoForm ({onCreate}) {
    const [showAllFields,setShowAllFields]=useState(false)
    function handleSubmit(event){
        event.preventDefault();

        const {elements}= event.target

        if(elements.name.value==="") return(
            alert("Please fill out To-do name")
        );

        const finalCategory=
        category==="custom"? customCategory: elements.category?.value ?? " ";

       onCreate({
            name:elements.name.value,
            description: elements.description?.value ?? "",
            deadline:elements.deadline?.value ?? "",
            priority: elements.priority?.value ?? PRIORITY_DEFAULT,
            status: elements.status?.value ?? "Not-Started",
            category: finalCategory,
            completed: false,
        });

        event.target.reset();
        setCategory("");
        setCustom("");
    }
    return(
        <section>
            <div className={styles.Title}>
            <h3>New To-Do</h3>
            <button onClick={()=>setShowAllFields(!showAllFields)}>
                {showAllFields ? "Hide" : "Show"} all fields
                </button>
            </div>

            <form className={styles.Form} onSubmit= {handleSubmit}>
                <ToDoFormFields showAllFields={showAllFields}/>
            <input type="submit" value="Add"/>
            </form>
        </section>
    )
} 