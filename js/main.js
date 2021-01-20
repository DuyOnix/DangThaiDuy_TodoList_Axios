var service = new TaskService();
var validation = new Validation();
var isLoading = false;
getList();

function getEle(id) {
    return document.getElementById(id);
}

function checkLoading() {
    if (isLoading) {
        getEle("loading").style.display = "block";
    }
    else {
        getEle("loading").style.display = "none";
    }
}

function getList() {
    isLoading = true;
    checkLoading();
    service.getListTask()
        .then(function (result) {
            isLoading = false;
            checkLoading();
            createTable(result.data);
        })
        .catch(function (err) {
            console.log(err);
        })
}

getEle("addItem").addEventListener("click", function () {
    isLoading = true;
    checkLoading();
    getEle("notiInput").innerHTML = "";
    var textTodo = getEle("newTask").value;
    var isValid = true;
    service.getListTask()
        .then(function (result) {
            isValid &&= validation.checkInput(textTodo, "notiInput", "(*) Task empty");
            isValid &&= validation.checkExist(textTodo, "notiInput", "(*) Task already existed", result.data);
            if (!isValid) {
                isLoading = false;
                checkLoading();
                return;
            }
            var task = new Task("", textTodo, "todo");
            return service.addTask(task);
        })
        .then(function (result) {
            isLoading = false;
            checkLoading();
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
    isLoading = true;
    checkLoading();
    service.deleteTask(id)
        .then(function (result) {
            isLoading = false;
            checkLoading();
            getList();
            alert("Delete Success!");
        })
        .catch(function (err) {
            console.log(err);
        });
}

function changeStatus(id) {
    isLoading = true;
    checkLoading();
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
            isLoading = false;
            checkLoading();
            getList();
            alert("Change Status Success!");
        })
        .catch(function (err) {
            console.log(err);
        });
}





