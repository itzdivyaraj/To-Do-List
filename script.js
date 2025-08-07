//We want to grab input, buttons, etc after dom has been loaded in the webpg

//This is done so we can use localStorage for reading, etc

document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const addTaskButton = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  //'Or'used to check if the localStorage is empty then make an empty array or fetch the stored items of tasks if available

  //if tasks has stored values we'll send the values one-by-one to renderTask
  tasks.forEach((task) => renderTask(task));
  //We called each object in localStorage as task and sent them one by one to renderTask

  addTaskButton.addEventListener("click", function () {
    //We want to select input text
    const taskText = todoInput.value.trim();
    //we take value from input and trim any additional spaces

    //We want to check if user clicked w/o giving i/p
    if (taskText === "") return;
    //if no value entered, the program is exitted

    //We want to add a task, give it a unique id and a property for true/false based on that we put a strike
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    //Everytime a new task is given as i/p, it's value is taken & a newTask is created for it w/ 3 properties

    tasks.push(newTask);
    saveTasks();
    //this fn saves the current value of tasks array into localStorage
    renderTask(newTask)
    //this send newTask to read immediately after creation
    todoInput.value = ""; //reset value
    console.log(tasks);
  });

  //creating local storage

  //all of our data is in 'tasks' and we put it on the local storage i.e an api by the browser

  //JS has direct access to this localStorage api of browser

  //Write Operation

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

    //to check if array stored on local storage or not, go to application beside console in browser and click storage in column
    
    //every time array is updated, we save it to localStorage

  //Read Operation

  //Read from the local storage

  //For this, as soon as the pg loads bring all the tasks from localStorage and store it in an array

  //Then use a loop to go through each of the tasks

  function renderTask(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);

    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
        <span>${task.text}</span>
        <button>delete</button>
    `;
      
    li.addEventListener('click', (e) => {
        if (e.target.tagName === "BUTTON") return;
        task.completed = !task.completed;
        li.classList.toggle('completed');
        saveTasks();
    })
      
    li.querySelector('button').addEventListener('click', function (e) {
        e.stopPropagation();
        //it's done so that this event doesn't bubble up to it's parent elements 
        //prevents toggle from firing

        //removing li that have deleted clicked on using filter
        //we update the existing array so only those elements get filtered 
        tasks = tasks.filter(t => t.id !== task.id);
        li.remove();
        saveTasks();
    })
      
    todoList.appendChild(li);
  }
  //As soon as the pg loads we have grabbed the stored values of localStorage
});
