var currentPage = localStorage.getItem('current_page') || 1
const itemsPerPage = 5

var todoForm = document.querySelector(".add-todo-form")
var todoInput = document.querySelector(".todo-input")
todoForm.addEventListener('submit', event => {
    event.preventDefault()
    let data = storage.getAllTodos()
    const id = data.length > 0 ? data[data.length-1].id+1 : 0
    const todo = {
        id,
        title:todoInput.value,
        isCompleted:false
    }
    addTodo(todo)
    todoInput.value = ""
    renderTodos()
})

var todoListEl = document.querySelector(".todo-list")

document.body.addEventListener('click', (event) => {
    let clickedEl = event.target
    
    if(clickedEl.dataset.task === "delete"){
        deleteTodo(clickedEl.dataset.todoId - 0)
        renderTodos()
    }

    if(clickedEl.dataset.task === "pagination"){
        currentPage = clickedEl.dataset.pageNumber
        localStorage.setItem('current_page',currentPage)
        renderTodos()
    }

    if(clickedEl.dataset.task === "prev-page"){
        currentPage-=1
        localStorage.setItem('current_page',currentPage)
        renderTodos()
    }

    if(clickedEl.dataset.task === "next-page"){
        currentPage = currentPage - 0 +1
        localStorage.setItem('current_page',currentPage)
        renderTodos()
    }
})
todoListEl.addEventListener('change', event =>{
    let changedEl = event.target
    if(changedEl.dataset.task === 'check'){
        toggleIsCompleted(changedEl.dataset.todoId - 0, changedEl.checked)
        renderTodos()
    }
})


renderTodos()
function renderTodos(){
    const todos = storage.getAllTodos().slice(itemsPerPage*(currentPage-1), currentPage*itemsPerPage)
    todoListEl.innerHTML = null
    if(todos.length > 0){
        todos.forEach((todo) => {
            let singleTodoEl = createSingleTodo(todo)
            todoListEl.appendChild(singleTodoEl)
        })
    }else{
        todoListEl.textContent = "Hech narsa topilmadi"
    }
    renderPagination()
}

function createSingleTodo(todo){
    // todo ->  { id, title, isCompleted }
    let singleTodoTempl = document.querySelector("#todo-item")
    let singleTodoEl = singleTodoTempl.content.cloneNode(true)

    let todoTitleEl = singleTodoEl.querySelector(".todo-title")
    todoTitleEl.textContent = todo.title

    let todoIsCompletedCheck = singleTodoEl.querySelector(".todo-is-completed")
    todoIsCompletedCheck.checked = todo.isCompleted
    todoIsCompletedCheck.dataset.todoId = todo.id
    todoIsCompletedCheck.dataset.task = 'check'

    let deleteTodoBtn = singleTodoEl.querySelector(".todo-delete-btn")
    deleteTodoBtn.dataset.todoId = todo.id
    deleteTodoBtn.dataset.task = 'delete'
    return singleTodoEl
}






// Pagination logics
function renderPagination(){
    let countTodos = storage.getAllTodos().length
    let paginationItemTempl = document.querySelector("#pagination-item")
    let paginationEl = document.querySelector(".todo-pagination")
    paginationEl.innerHTML = null
    console.log(countTodos)


    let paginationPrevItemEl = paginationItemTempl.content.cloneNode(true)
    let pagePrevItem = paginationPrevItemEl.querySelector('.page-item')
    let linkPrevEl = paginationPrevItemEl.querySelector(".page-link")
    if(currentPage == 1){
        pagePrevItem.classList.add("disabled")
    }else{
        pagePrevItem.classList.remove("disabled")

    }
    linkPrevEl.textContent = "Prev"
    linkPrevEl.dataset.task = 'prev-page'
    paginationEl.appendChild(paginationPrevItemEl)
    

    for(let i=1; i <= Math.ceil(countTodos/itemsPerPage); i++){

    

            let paginationItemEl = paginationItemTempl.content.cloneNode(true)
        let pageItem = paginationItemEl.querySelector('.page-item')
        let linkEl = paginationItemEl.querySelector(".page-link")
        if(i == currentPage){
            pageItem.classList.add("active")
        }else{
            pageItem.classList.remove("active")
        }
        linkEl.textContent = i
        linkEl.dataset.pageNumber = i
        linkEl.dataset.task = 'pagination'
        paginationEl.appendChild(paginationItemEl)
        
    }

    let paginationNextItemEl = paginationItemTempl.content.cloneNode(true)
    let pageNextItem = paginationNextItemEl.querySelector('.page-item')
    let linkEl = paginationNextItemEl.querySelector(".page-link")
    if(Math.ceil(countTodos/itemsPerPage) == currentPage){
        pageNextItem.classList.add("disabled")
    }else{
        pageNextItem.classList.remove("disabled")
    }
    linkEl.textContent = "Next"
    linkEl.dataset.task = 'next-page'
    paginationEl.appendChild(paginationNextItemEl)
}