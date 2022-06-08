const storage = {
    fieldName:"todos",
    getAllTodos(){
        const todos = localStorage.getItem(this.fieldName)
        return todos ? JSON.parse(todos) : []
    },
    setAllTodos(data){
        localStorage.setItem(this.fieldName, JSON.stringify(data))
    }
}
