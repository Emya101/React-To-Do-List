import styles from './ToDoForm.module.css'
import { useState } from 'react';

export function TodoForm ({onCreate}) {
    const [category, setCategory] = useState("");
    const [customCategory, setCustom] = useState("");

    function handleSubmit(event){
        event.preventDefault();

        const {elements}= event.target

        if(elements.name.value==="") return(
            alert("Please fill out To-do name")
        );

        const finalCategory=
        category==="custom"? customCategory: elements.category.value;

       onCreate({
            name:elements.name.value,
            description: elements.description.value,
            deadline:elements.deadline.value,
            priority: elements.priority.value,
            status: elements.status.value,
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
            </div>

            <form className={styles.Form} onSubmit= {handleSubmit}>
                <div className={styles.FormFields}>
                <div className={styles.FormField}>
                <input type="text"
                aria-label="Name*"
                placeholder="Name*"
                name="name"
                autoComplete="off"/>
                </div>
                
            
            <div className={styles.FormField}>
            <textarea
                aria-label="Description"
                placeholder="Description"
                name="description"
                rows="4"
            />
            </div>

            <div className={styles.FormGroup}>
                <div className={styles.FormField}>
                    <label htmlFor="deadline">Deadline</label>
                    <input type="date"
                    id="deadline" 
                    name="deadline"
                    min={new Date().toISOString().split("T")[0]}
                 />
                </div>

            <div className={styles.FormField}>
            <label htmlFor="priority">Priority</label>
            <select defaultValue="none" id="priority" name="priority">
                <option value="none">None</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            </div>
            </div>

            
            <label htmlFor="status">Status</label>
            <select defaultValue="Not-Started" id="status" name="status">
                <option value="Not-Started">Not Started</option>
                <option value="In-Progress">In-Progress</option>
                <option value="Completed">Completed</option>
                
            </select>

            
            <label htmlFor="category">Category</label>
            <select defaultValue="" id="category" name="category" value={category} onChange={(e)=>setCategory(e.target.value)}
            >
                <option value=" ">--Select Category--</option>
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="school">School</option>
                <option value="shopping">Shopping</option>
                <option value="custom">Other</option>
            </select>

            {category==="custom" &&(
                <input type="text"
                placeholder="Enter Custom Category"
                value={customCategory}
                onChange={(e)=> setCustom(e.target.value)}
                />
            )}

            </div>

            <input type="submit" value="Add"/>
            </form>
        </section>
    )
} 