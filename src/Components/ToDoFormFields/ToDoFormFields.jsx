import { PRIORITIES, PRIORITY_DEFAULT } from "../../constants/priorities"
import styles from "./ToDoFormFields.module.css"
import { useState} from 'react';

export function ToDoFormFields({ todo = {}, showAllFields = true ,category, setCategory, customCategory, setCustom }) {
    return (

        <div className={styles.FormFields}>
            <div className={styles.FormField}>
                <input type="text"
                    aria-label="Name*"
                    placeholder="Name*"
                    name="name"
                    autoComplete="off"
                    defaultValue={todo.name} />
            </div>


            {showAllFields && (
                <>
                    <div className={styles.FormField}>
                        <textarea
                            aria-label="Description"
                            placeholder="Description"
                            name="description"
                            rows="4"
                            defaultValue={todo.description}
                        />
                    </div>

                    <div className={styles.FormGroup}>
                        <div className={styles.FormField}>
                            <label htmlFor="deadline">Deadline</label>
                            <input type="date"
                                id="deadline"
                                name="deadline"
                                min={new Date().toISOString().split("T")[0]}
                                defaultValue={todo.deadline}
                            />
                        </div>

                        <div className={styles.FormField}>
                            <label htmlFor="priority">Priority</label>
                            <select defaultValue={todo.priority ?? PRIORITY_DEFAULT} id="priority" name="priority" >
                                {Object.entries(PRIORITIES).map(([key, { label }]) => (
                                    <option key={key} value={key}>{label}</option>
                                ))}
                            </select>
                        </div>
                    </div>


                    <label htmlFor="status">Status</label>
                    <select id="status" name="status" defaultValue={todo.status}>
                        <option value="">--Select Status--</option>
                        <option value="Not-Started">Not Started</option>
                        <option value="In-Progress">In-Progress</option>
                        <option value="Completed">Completed</option>

                    </select>


                    <label htmlFor="category">Category</label>
                    <select id="category" name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">--Select Category--</option>
                        <option value="work">Work</option>
                        <option value="personal">Personal</option>
                        <option value="school">School</option>
                        <option value="shopping">Shopping</option>
                        <option value="custom">Other</option>
                    </select>

                    {category === "custom" && (
                        <input type="text"
                            placeholder="Enter Custom Category"
                            value={customCategory}
                            onChange={(e) => setCustom(e.target.value)}
                        />
                    )}
                </>
            )}
        </div>
    )
}