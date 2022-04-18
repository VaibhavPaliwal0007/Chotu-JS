import taskOperations from './models/task_operations.js';
import { showAlert } from './utils/dialog.js';
import { autoGen } from './utils/increment-id.js';
import Task from './models/Task.js'

const itr = autoGen();

window.addEventListener('load', init);

function init(){
    bindEvents();
    showCounts();
    focus("name");
    incrementIdValue();
};

function bindEvents(){
    document.querySelector('#add').addEventListener('click', addTask);
    document.querySelector("#delete").addEventListener("click", deleteTask);
    document.querySelector("#save").addEventListener("click", save);
    document.querySelector('#load').addEventListener('click', load);
    document.querySelector('#update').addEventListener('click', update);
};

function addTask(){
    let id = document.querySelector('#id').innerText;
    let name = document.querySelector('#name').value;
    let desc = document.querySelector('#desc').value;
    let date = document.querySelector('#date').value;
    let url = document.querySelector('#url').value;
    let task = taskOperations.add(id, name, desc, date, url);

    if(!validate(task)){
        showAlert('Please fill all the fields');
        taskOperations.remove(id);
        return;
    }

    printTask(task);
    showCounts();
    clearForm();
    focus('name');
    incrementIdValue();
};

function deleteTask(){
    let tasks = taskOperations.deletedMarked();
    
    showCounts();
    printTasks(tasks);
};

function save(){
    //firebase krna hai 

    let tasks = taskOperations.getAllTasks();

    if(window.localStorage){
        window.localStorage.tasks = JSON.stringify(tasks);
        showAlert('Record saved successfully...');
    }

    else{
        showAlert('Update your Browser pancho');
    }
}

function load(){
    if(localStorage.tasks){
       let genericTasks = JSON.parse(localStorage.tasks);

       let tasks = genericTasks.map((task) => {
           new Task(task.id, task.name, task.desc, task.date, task.url, task.isMarked);
       });

       taskOperations.tasks = tasks;
       showCounts();
       printTasks(tasks);
    }

    else{
        showAlert('No tasks found in local storage');
    }
};

function update(){
    let id = prompt('Enter id of task you want to update');

    if(id && taskOperations.isTask(id)){
        let task = taskOperations.getTaskById(id);

        if(task){
            let field = prompt('Enter field you want to update');

            if(task[field]){
                let value = prompt('Enter new value');

                if(value){
                    task[field] = value;
                    printTasks(taskOperations.tasks);
                }
            }

            else{
                showAlert('Invalid field');
            }
        }

        else{
            showAlert('Task not found');
        }
    }

    else{
        showAlert('Invalid id');
    }
};

function printTask(task){
    const tbody = document.querySelector('#tasks');
    const tr = tbody.insertRow();

    let id = task.id;
    let cellIdx = 0;

    for(let key in task){
        if(key != "isMarked" && typeof task[key] != 'function'){
            let value = task[key];
            let cell = tr.insertCell(cellIdx);

            cell.innerText = value;
            cellIdx++;
        }
    }

    let cell = tr.insertCell(cellIdx);

    cell.appendChild(createIcon("edit", edit, id));
    cell.appendChild(createIcon('trash', toggleDelete, id));
};

function showCounts(){
    document.querySelector("#total").innerText = taskOperations.tasks.length;
    document.querySelector("#marktotal").innerText = taskOperations.countMarked();
    document.querySelector("#unmarktotal").innerText = taskOperations.countUnmarked();
};

function clearForm(){  //for clearing form
    const form = document.querySelectorAll('.form-control');

    form.forEach((textBox) => {
        textBox.value = '';
    })
};

function focus(id){
    document.querySelector(`#${id}`).focus();
};

function incrementIdValue(){  //auto generator function 
    document.querySelector("#id").innerText = itr.next().value;   //.done and .next
};

function edit(){
    console.log('Edit.....');
};

function toggleDelete(){    //select kr rha hai bs 
    console.log('Toggle... ', this.getAttribute('task-id'));
    
    const icon = this;
    const id = icon.getAttribute('task-id');
    const tr = icon.parentNode.parentNode;

    tr.classList.toggle('alert-danger');
    taskOperations.mark(id);
    console.log('Toggle ', taskOperations.tasks);
    showCounts();
};

function createIcon(className, fn, id){
    let icon = document.createElement('i');

    icon.className = `fas fa-${className} me-3 hand`;
    icon.setAttribute("task-id", id);
    icon.addEventListener('click', fn);
    
    return icon;
};

function printTasks(tasks){
    const tbody = document.querySelector('#tasks');
    
    tbody.innerHTML = '';
    tasks.forEach(task => printTask(task));
    //task.forEach(printTask);
};

function validate(task){
    for(const key in task){
        if(!task[key]){
            return false;
        }
    }

    return true;
};
