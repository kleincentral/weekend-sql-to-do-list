console.log('JS is sourced!');

function getTodos() {
    axios({
        method: 'GET',
        url: '/todos'
    }).then((res) => {
        renderTodos(res.data)
    }).catch((error)=>{
        console.log("Error in GET", error)
    })
}

function renderTodos(data) {
    console.log("Todo's Rendering...")
    const todos = document.getElementById('viewList');
    console.log(todos)
    todos.innerHTML = ''

    for(let i = 0; i < data.length; i+= 1) {
        let index = data[i];
        if (index.isComplete) {
            todos.innerHTML+=`
            <li data-todoId=${index.id}
            data-testid="toDoItem"
            class="completed">
                ${index.text}
                <button
                    data-testid="completeButton"
                    onclick="updateTask(event)">
                    Complete
                </button>
                <button 
                    data-testid="deleteButton"
                    onclick="deleteTask(event)">
                    Delete
                </button>
            </li>
            `;
        } else {
            todos.innerHTML += `
        <li data-todoId=${index.id}
        data-testid="toDoItem">
            ${index.text}
            <button
                data-testid="completeButton"
                onclick="updateTask(event)">
                Complete
            </button>
            <button 
                data-testid="deleteButton"
                onclick="deleteTask(event)">
                Delete
            </button>
        </li>
        `;
        }
    }
}

function deleteTask(event){
    console.log("Attempting to Delete")
    let idOfTodo = event.target.closest('li').getAttribute('data-todoId')
    axios({
        method: 'DELETE',
        url: `/todos/${idOfTodo}`
    }).then(function(response) {
        getTodos()
    }).catch(function(error){
        console.log('error in DELETE', error);
    });
}

function addTask() {
    console.log("Attempting to add task!")
    let task = document.getElementById('todoText').value
    document.getElementById('todoText').value = ''
    axios({
        method: 'POST',
        url: '/todos',
        data: {
            todo: task
        }
    }).then(function(response) {
        getTodos();
    }).catch(function(error){
        console.log('error in POST', error);
    });
}

function updateTask(event){
    console.log("Attempting to Update")
    let idOfTodo = event.target.closest('li').getAttribute('data-todoId')
    axios({
        method: 'PUT',
        url: `/todos/${idOfTodo}`
    }).then(function(response) {
        getTodos()
    }).catch(function(error){
        console.log('error in DELETE', error);
    });
}

getTodos()