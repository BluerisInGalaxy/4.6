function addTodo(todo){
    const todos = storage.getAllTodos()
    todos.push(todo)
    storage.setAllTodos(todos)
}

function deleteTodo(id){
    const todos = storage.getAllTodos()
    const newTodos = todos.filter(todo => todo.id!== id)
    storage.setAllTodos(newTodos)
}

function toggleIsCompleted(id, isCompleted){
    const todos = storage.getAllTodos()
    const changedTodos = todos.map(todo => {
        if(todo.id == id){
            todo.isCompleted = isCompleted
        }
        return todo
    })

    storage.setAllTodos(changedTodos)
}