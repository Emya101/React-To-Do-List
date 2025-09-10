export function TodoList({todos}){
    return(
        <section>
            <h3>To-Do's</h3>
            <ul>
                {todos.map((todo) => (
                        <li key={todo.id}>
                            <input type="checkbox" name="completed" defaultChecked={todo.completed}/>
                            <div>
                            {todo.name}<br/>
                            {todo.description}<br/>
                            {todo.priority !== "none" && todo.priority}<br/>
                            {todo.status !="" && todo.status}<br/>
                            {todo.category!="" && todo.category} {todo.createdAt}
                            </div> 
                        </li>
                    )
                )}
            </ul>

        </section>
    );
}