import styles from "./ToDoFilters.module.css"
import { COMPLETED_FILTERS, PRIORITY_FILTERS } from "../../constants/filters"
import { useEffect, useState } from "react"

const COMMON_CATEGORIES = ["work", "personal", "school", "shopping"]

export function ToDoFilters({ onFilter, todos = [] }) {
    const [completed, setCompleted] = useState('all')
    const [priority, setPriority] = useState('all')
    const [category, setCategory] = useState('all')

    const customCategories = Array.from(
        new Set(todos.map(todo => todo.category).filter(c => c && !COMMON_CATEGORIES.includes(c)))
    )

    const allCategories = [...COMMON_CATEGORIES, ...customCategories]

    useEffect(() => {
        const filters = {
            completed: COMPLETED_FILTERS[completed].value,
            priority: PRIORITY_FILTERS[priority].value,
            category: category === 'all' ? '' : category,
        }
        onFilter(filters);
    }, [completed, priority, category, todos])

    return (
        <section>
            <h3>Filters</h3>

            <div className={styles.Filters}>
                <label htmlFor="completed">Completed: </label>
                <select id="completed" defaultValue={completed} onChange={(event) => setCompleted(event.target.value)}>
                    {Object.entries(COMPLETED_FILTERS).map(([key, { label }]) =>
                        <option key={key} value={key}>
                            {label}
                        </option>
                    )}
                </select><br/>

                <label htmlFor="priority">Priority </label>
                <select id="priority" defaultValue={priority} onChange={(event) => setPriority(event.target.value)}>
                    {Object.entries(PRIORITY_FILTERS).map(([key, { label }]) =>
                        <option key={key} value={key}>
                            {label}
                        </option>
                    )}
                </select><br/>

                <label htmlFor="category">Category</label>
                <select value={category} onChange={(event) => setCategory(event.target.value)}>
                    <option value="all">All</option>
                    {allCategories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select><br/>
            </div>
        </section>
    )
}