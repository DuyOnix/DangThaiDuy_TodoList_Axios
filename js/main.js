var service = new TaskService();
var validation = new Validation();
getList();

function getEle(id) {
    return document.getElementById(id);
}

function getList() {
    service.getListTask()
        .then(function (result) {
            createTable(result.data);
        })
        .catch(function (err) {
            console.log(err);
        })
}

getEle("addItem").addEventListener("click", function () {
    var textTodo = getEle("newTask").value;
    var isValid = validation.checkInput(textTodo, "notiInput", "(*) Task empty");
    service.getListTask()
        .then(function (result) {
            isValid &&= validation.checkExist(textTodo, "notiInput", "(*) Task already existed", result.data);
            if (!isValid) return;
            var task = new Task("", textTodo, "todo");
            return service.addTask(task);
        })
        .then(function (result) {
            if (!isValid) return;
            getList();
            getEle("newTask").value = "";
            getEle("newTask").focus();
            alert("Add Success!");
        })
        .catch(function (err) {
            console.log(err);
        });
});

function createTable(arr) {
    var todoContent = "";
    var completedContent = "";
    arr.forEach(function (item, index) {
        var content = `
        <li>
            <span>${item.textTodo}</span>
            <div class="buttons">
                <button class="remove" onclick="deleteToDo(${item.id})">
                    <i class="fa fa-trash-alt"></i>
                </button>
                <button class="complete" onclick="changeStatus(${item.id})">
                    <i class="far fa-check-circle"></i>
                    <i class="fas fa-check-circle"></i>
                </button>
            </div>
        </li>
        `
        if (item.status === "todo")
            todoContent += content;
        else
            completedContent += content;
    })
    getEle("todo").innerHTML = todoContent;
    getEle("completed").innerHTML = completedContent;
}

function deleteToDo(id) {
    service.deleteTask(id)
        .then(function (result) {
            getList();
            alert("Delete Success!");
        })
        .catch(function (err) {
            console.log(err);
        });
}

function changeStatus(id) {
    service.getTaskById(id)
        .then(function (result) {
            var task = result.data;
            if (task.status === "todo")
                task.status = "completed";
            else
                task.status = "todo";
            return service.updateTask(task);
        })
        .then(function (result) {
            getList();
            alert("Change Status Success!");
        })
        .catch(function (err) {
            console.log(err);
        });
}





