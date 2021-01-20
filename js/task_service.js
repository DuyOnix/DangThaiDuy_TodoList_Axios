function TaskService() {
    this.getListTask = function () {
        return axios({
            url: "https://6001827908587400174dad39.mockapi.io/api/Task",
            method: "GET",
        })
    }
    this.addTask = function (task) {
        return axios({
            url: "https://6001827908587400174dad39.mockapi.io/api/Task",
            method: "POST",
            data: task,
        })

    }
    this.deleteTask = function (id) {
        return axios({
            url: `https://6001827908587400174dad39.mockapi.io/api/Task/${id}`,
            method: "DELETE"
        })

    }
    this.getTaskById = function (id) {
        return axios({
            url: `https://6001827908587400174dad39.mockapi.io/api/Task/${id}`,
            method: "GET",
        })
    }
    this.updateTask = function (task) {
        return axios({
            url: `https://6001827908587400174dad39.mockapi.io/api/Task/${task.id}`,
            method: "PUT",
            data: task,
        })
    }
}