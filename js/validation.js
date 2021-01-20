function Validation() {
    this.checkInput = function (input, warnId, message) {
        if (input !== "") {
            getEle(warnId).style.display = "none";
            getEle(warnId).innerHTML = "";
            return true;
        } else {
            getEle(warnId).style.display = "block";
            getEle(warnId).innerHTML = message;
            return false;
        }
    }
    this.checkExist = function (input, warnId, message, arr) {
        var check = false;
        arr.forEach(function (item, index) {
            if (input === item.textTodo)
                check = true;
        })
        if (!check) {
            getEle(warnId).style.display = "none";
            getEle(warnId).innerHTML = "";
            return true;
        } else {
            getEle(warnId).style.display = "block";
            getEle(warnId).innerHTML = message;
            return false;
        }
    }
}