
   
// local storage content was inspired from https://github.com/robdongas/deco2017-task-tracker/blob/solutions/public/script.js and https://blog.logrocket.com/localstorage-javascript-complete-guide/ and https://thecodingpie.medium.com/how-to-build-a-todo-list-app-with-javascript-and-local-storage-a884f4ea3ec
const popuphistory = document.querySelector('.popup');
const popupedit = document.querySelector('.popupedit');

//make date with no time 
const date= new Date();
const formattedDate = date.getDate() + '/'+ (date.getMonth()+1)+ '/' + date.getFullYear();


//function to show text /instructions when nothing has been logged 
function nologpopup(){
if ( taskList.length === 0 ){
  popuphistory.style.display= 'block' ;
} else { 
  popuphistory.style.display= 'none';
};  

//pop up to display on the edit tab
if ( taskList.length === 0 ){
  popupedit.style.display= 'block' ;
} else { 
  popupedit.style.display= 'none';
};  
}


// this function determines navigation in the UI //interpereted from one of my previous assignments, website prototype for DECO1016 Introduction to Web Design
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
  nologpopup();
}
    // load locally stored list of tasks or initialize an empty array for the tasks
    let taskList = JSON.parse(localStorage.getItem('taskList')) || [];

    // if in any tasks were saved in localStorage they will appear 
    updateListOfTasks();

    //this was created with the help of chat gpt 4-o. i input my previous code and asked it how it was possible to make the list show on both the history and the edit tabs. it came up with the parameters 
    // create an element with the list of tasks and optional delete buttons
    function displayList(parameters = {}) {
        let listElement = document.createElement("ul");
        listElement.classList.add('reverselist');

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
                listitem.classList.add('listclass')
                listitem.innerHTML = `<p class ="expandlist"> <strong>${value}</strong></p> <p class ="expandlistvalue"> ${task[value]}</p>`;
                list.appendChild(listitem);
            });

       
                 // add the delete button only to edit tab
                 if ((!item.expanded || item.expanded) && parameters.editable) {
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
                    item.style.paddingBottom = "30px"; //extend size
                    item.style.paddingLeft = "10px"; //extend size
                    item.style.paddingRight = "10px"; //extend size
                    item.style.borderRadius= "50px";
                }

                if (!item.expanded) {
                    item.style.paddingBottom = "0px"; //return size back to orginal
                    item.style.paddingLeft = "0px"; 
                    item.style.paddingRight = "0px"; 
                }
                

                item.appendChild(label); // add the task label

                 // add the delete button only to edit tab// make sure its applied to expanded and not
            if ((!item.expanded || item.expanded) && parameters.editable) {
                let deleteButton = document.createElement("button");
                deleteButton.className = "deleteButton";
                deleteButton.addEventListener("click", function (event) {
                    taskList.splice(index, 1); // remove the task from taskList using its index
                    updateListOfTasks(); // overwrite the list in the UI with the updated taskList
                });
                item.appendChild(deleteButton); //add to every item 
            };

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

        //  put task list to local storage
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
            date: formattedDate,
        });

        updateListOfTasks(); // update the list of tasks        
        form.reset(); // reset the form values
    });

