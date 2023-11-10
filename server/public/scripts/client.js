console.log('JS is sourced!');

function getTodos() {
    axios({
        type: 'GET',
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
        todos.innerHTML += `
        <li data-todoId=${index.id}
        data-testid="toDoItem">
            ${index.text}
        </li>
        `;
    }
}

function addTask() {
    console.log("Attempting to add task!")
    let task = document.getElementById('todoText').value
    axios({
        type: 'POST',
        url: '/todos',
        data: {
            todo: task
        }
    }).then(res => {
        renderTodos(res.data)
    })
}

getTodos()