let todoItemsContainer = document.getElementById("todoItemsContainer");
let addButtonElement = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");

function getTodoListFromLocalStorage() {
    let storedTodoArrayString = localStorage.getItem("todoList");
    let parsedTodoArray = JSON.parse(storedTodoArrayString);
    if (parsedTodoArray === null) {
        return [];
    } else {
        return parsedTodoArray;
    }

}

let todoArray = getTodoListFromLocalStorage();

saveTodoButton.onclick = function() {
    if (todoArray.length !== "") {
        localStorage.setItem("todoList", JSON.stringify(todoArray));
    }
}

function onTodoStatusChange(checkboxId, labelId, todoId) {
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");
    let changedTodoIndex = todoArray.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        }
    });
    let todo = todoArray[changedTodoIndex];
    if (todo.isChecked === true) {
        todo.isChecked = false;
    } else {
        todo.isChecked = true;
    }
}

function onDeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);
    let todoElementIndex = todoArray.findIndex(function(eachItem) {
        let eachItemId = "todo" + eachItem.uniqueNo;
        if (eachItemId === todoId) {
            return true;
        }
        return false;
    });
    todoArray.splice(todoElementIndex, 1);
}

function createAndAppendTodo(todo) {
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    let todoId = "todo" + todo.uniqueNo;
    let isCheckedStatus = todo.isChecked;
    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = todo.isChecked;
    inputElement.classList.add("checkbox-input");
    inputElement.onclick = function() {
        onTodoStatusChange(checkboxId, labelId, todoId);
    };
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    labelElement.id = labelId;
    if (isCheckedStatus) {
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);


    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIcon.onclick = function() {
        onDeleteTodo(todoId);
    };
    deleteIconContainer.appendChild(deleteIcon);
}
for (let todo of todoArray) {
    createAndAppendTodo(todo);

}

function onAddTodo() {
    let todosCount = todoArray.length;

    let userInputElement = document.getElementById("todoUserInput");
    let userInputValue = userInputElement.value;
    if (userInputValue === "") {
        alert("Enter a valid Input");
        return;
    }
    todosCount = todosCount + 1;
    let newTodo = {
        text: userInputValue,
        uniqueNo: todosCount,
        isChecked: false
    };

    todoArray.push(newTodo);
    createAndAppendTodo(newTodo);
    userInputElement.value = "";
}
addButtonElement.onclick = function() {
    onAddTodo();
}