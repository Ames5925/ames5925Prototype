
    // <!--todo- first log shows at bottom of form screen not sure why, make date only show date not time, add no logged pop up -->

    // local storage content was inspired from https://github.com/robdongas/deco2017-task-tracker/blob/solutions/public/script.js and https://blog.logrocket.com/localstorage-javascript-complete-guide/ and https://thecodingpie.medium.com/how-to-build-a-todo-list-app-with-javascript-and-local-storage-a884f4ea3ec

    // this function determines navigation in the UI
    function makeVisible(option) {
      var buttonOptions = document.querySelectorAll('.buttonOptions');
      buttonOptions.forEach(list => {
          list.style.display = 'none';
      });
    
      var selectedButton = document.querySelectorAll(`.buttonOption${option}`);
      selectedButton.forEach(list => {
          list.style.display = 'block';
      });
    
      console.log(option);
    }
    
    // load locally stored list of tasks or initialize an empty array for the tasks
    let taskList = JSON.parse(localStorage.getItem('taskList')) || [];

    // we call updateListOfTasks() here so that if in any tasks were saved in localStorage, they will appear in the UI
    updateListOfTasks();

    //this was created with the help of chat gpt 4-o. i input my previous code and asked it how it was possible to make the list show on both the history and the edit tabs. it came up with the parameters 
    // create an element with the list of tasks and optional delete buttons
    function displayList(parameters = {}) {
        let listElement = document.createElement("ul");

        // add each task as an element to the list element
        taskList.map(function (task, index) {
            let item = document.createElement("li");
            item.setAttribute("data-id", task.id);
            item.classList.add('tasklist');
            item.expanded = false; // task is not expanded by default

            // create and add the label for the task
            let label = document.createElement("li");
            label.innerHTML = `<p class ="tasknametext" > ${task.name}</p> <p class ="taskdatetext" > ${task.date}</p>`;
            label.classList.add('labelclass')
            item.appendChild(label);

            // create the list of task values
            let list = document.createElement("ul");
            ["type", "weight", "reps", "sets", "distance", "time"].forEach(value => {
                let listitem = document.createElement("li");
                listitem.innerHTML = `<p class ="expandlist"> <strong>${value}</strong></p> <p class ="expandlistvalue"> ${task[value]}</p>`;
                list.appendChild(listitem);
            });

            // add the delete button only to edit one
            if (parameters.editable) {
              let deleteButton = document.createElement("button");
              deleteButton.className = "deleteButton";
              deleteButton.addEventListener("click", function (event) {
                  taskList.splice(index, 1); // remove the task from taskList using its index
                  updateListOfTasks(); // overwrite the list in the UI with the updated taskList
              });
              item.appendChild(deleteButton);
          };

            // add an event listener to the task that toggles between label and label + task values when expanded
            item.addEventListener("click", function (event) {
                item.expanded = !item.expanded; // make it expanded 
                item.innerHTML = ''; // reset the contents of the task item

                if (item.expanded) {
                    item.appendChild(list); // add the list of details
                }
                item.appendChild(label); // add the task label
            });

            // add the task item to the list of tasks
            listElement.appendChild(item);
        });

        return listElement;
    }

    // overwrite the list of tasks in the UI
    function updateListOfTasks() {
        // overwrite the history list
        let documentTaskList = document.getElementById("tasklist");
        documentTaskList.innerHTML = "";
        documentTaskList.appendChild(
            displayList()
        );

        // overwrite the edit list
        let editlist = document.getElementById("editlist");
        editlist.innerHTML = "";
        editlist.appendChild(
            displayList({ editable: true })
        );

        // persist the task list to local storage
        localStorage.setItem('taskList', JSON.stringify(taskList));
    };

    // handle form submission// inspired by week 10 tut example https://github.com/robdongas/deco2017-task-tracker/blob/solutions/public/script.js
    const form = document.getElementById("taskForm");
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // prevent default form submit behavior

        // show submission confirm popup
        let submitpopup = document.querySelector('.confirmpopup')
        submitpopup.style.display = 'block'; 

        // add a new task to taskList
        taskList.push({
            name: event.target.elements.name.value,
            type: event.target.elements.type.value,
            id: Date.now(),
            weight: event.target.elements.weight.value,
            reps: event.target.elements.reps.value,
            sets: event.target.elements.sets.value,
            distance: event.target.elements.distance.value,
            time: event.target.elements.time.value,
            date: new Date().toISOString(),
        });

        updateListOfTasks(); // update the list of tasks        
        form.reset(); // reset the form values
    });

