document.addEventListener("DOMContentLoaded", function() {
    // Retrieve tasks from local storage if available
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    var taskInput = document.getElementById("taskInput");
    var addButton = document.getElementById("addButton");
    var taskList = document.getElementById("taskList");
    var taskCount = document.getElementById("taskCount");

    function refreshTasks() {
      // Clear the task list
      taskList.innerHTML = "";

      // Iterate through the tasks and add them to the list
      for (var i = 0; i < tasks.length; i++) {
        var task = tasks[i];

        var li = document.createElement("li");
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.addEventListener("change", toggleTaskComplete.bind(null, i));
        li.appendChild(checkbox);

        var taskText = document.createElement("span");
        taskText.innerText = task.text;
        if (task.completed) {
          taskText.classList.add("task-complete");
          checkbox.checked = true;
        }
        li.appendChild(taskText);

        var deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click", deleteTask.bind(null, i));
        li.appendChild(deleteButton);

        taskList.appendChild(li);
      }

      // Update the task count
      taskCount.innerText = tasks.length + " tasks remaining";
    }

    function addTask() {
      var text = taskInput.value.trim();
      if (text !== "") {
        tasks.push({ text: text, completed: false });
        taskInput.value = "";
        saveTasks();
        refreshTasks();
      }
    }

    function deleteTask(index) {
      tasks.splice(index, 1);
      saveTasks();
      refreshTasks();
    }

    function toggleTaskComplete(index) {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      refreshTasks();
    }

    function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    addButton.addEventListener("click", addTask);

    refreshTasks();
  });
