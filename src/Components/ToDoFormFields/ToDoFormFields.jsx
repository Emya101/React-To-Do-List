import { PRIORITIES, PRIORITY_DEFAULT } from "../../constants/priorities"
import styles from "./ToDoFormFields.module.css"
import { useState } from 'react';

export function ToDoFormFields({ todo = {}, showAllFields = true, category, setCategory, customCategory, setCustom, register, errors = {} }) {
    return (

        <div className={styles.FormFields}>
            <div className={styles.FormField}>
                <input type="text"
                    aria-label="Name*"
                    placeholder="Name*"
                    autoComplete="off"
                    defaultValue={todo.name}
                    {...register("name", {
                        required: "Name is required",
                        minLength:
                        {
                            value: 3,
                            message: "Name should be min length of 3 characters"
                        },
                        maxLength: {
                            value: 50,
                            message: "Name should be max length of 50 characters"
                        }
                    })}
                />
                {!!errors.name && errors.name.message}
            </div>


            {showAllFields && (
                <>
                    <div className={styles.FormField}>
                        <textarea
                            aria-label="Description"
                            placeholder="Description"
                            rows="4"
                            defaultValue={todo.description}
                            {...register("description", {
                                maxLength: {
                                    value: 200,
                                    message: "Description can only be a max of 200 characters"
                                }
                            })}
                        />
                        {!!errors.description && errors.description.message}
                    </div>

                    <div className={styles.FormGroup}>
                        <div className={styles.FormField}>
                            <label htmlFor="deadline">Deadline</label>
                            <input type="date"
                                id="deadline"
                                defaultValue={todo.deadline}
                                {...register("deadline", {
                                    min: !todo.id &&{
                                    value: new Date().toISOString().split("T")[0],
                                    message: "Deadline can't be in the past"
                                }
                                })}

                            />
                            {!!errors.deadline && errors.deadline.message}
                        </div>

                        <div className={styles.FormField}>
                            <label htmlFor="priority">Priority</label>
                            <select defaultValue={todo.priority ?? PRIORITY_DEFAULT}
                                id="priority"
                                name="priority"
                                {...register("priority",{
                                    validate:(value)=>
                                        Object.keys(PRIORITIES).includes(value)||"Priority is not valid value",
                                })}
                            >
                                {Object.entries(PRIORITIES).map(([key, { label }]) => (
                                    <option key={key} value={key}>{label}</option>
                                ))}
                            </select>
                            {!!errors.priority && errors.priority.message}
                        </div>
                    </div>


                    <label htmlFor="status">Status</label>
                    <select id="status" name="status" defaultValue={todo.status} {...register("status")}>
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