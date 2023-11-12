console.log('JS is sourced!');

/*
Gets the list from the database by sending a req
to the server.
*/
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


/*
Renders the list of items from the todo
list data it got from the database
*/
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


/*
Sends a request to the server to delete
a certain index with an id index.
*/
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

/*
Sends a request to the server to create
a new task and grabs the task name from
the clientside input.
*/
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

/*
Sends a request to the server to update
the completed status in the server
*/
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

// calls getTodos to render the page
// upon startup.
getTodos()