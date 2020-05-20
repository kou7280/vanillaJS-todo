// Define UI Vars
const form = document.getElementById('task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.getElementById('filter');
const taskInput = document.getElementById('task');

// Load all event Listeners
loadEventListeners();

function loadEventListeners() {
  document.addEventListener('DOMContentLoaded', getTasks);
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', deleteTask);
  clearBtn.addEventListener('click', clearTasks);
  filter.addEventListener('input', filterTasks);
}

function getTasks() {
  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(task => {
    // create li element
    const li = document.createElement('li');
 
    // Add class
    li.className = 'collection-item';
  
    // Create text node and append to li
    li.textContent = task;
    
  
    // Create new link element
    const link = document.createElement('a');
    
    // Add class
    link.className = 'delete-item secondary-content';
  
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    
    // Append the link to li
    li.appendChild(link);
  
    // Append li to ul
    taskList.appendChild(li);
  });

}

function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a task');
    return;
  }

  // create li element
  const li = document.createElement('li');

  // Add class
  li.className = 'collection-item';

  // Create text node and append to li
  li.textContent = taskInput.value;
  

  // Create new link element
  const link = document.createElement('a');
  
  // Add class
  link.className = 'delete-item secondary-content';

  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  
  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  // Store in LS
  storeTaskInLocalStorage(taskInput.value);

  // Clear the input
  taskInput.value = '';

  e.preventDefault();
}

// Delete task
function deleteTask(e) {
  if (e.target.parentNode.classList.contains('delete-item')) {
    if(confirm('Are You Sure?')) {
      e.target.parentNode.parentNode.remove();

      // Remove from Ls
      removeTaskFromLocalStorage(e.target.parentNode.parentNode);
    }
  }
}

// Clear tasks
function clearTasks() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // Clear from LS
  clearTasksFromLocalStorage();
}

// Filter tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(task => {
    if (task.textContent.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}

// Store task in LS
function storeTaskInLocalStorage(task) {

  let tasks;
  
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach((task, index) => {
    if (task === taskItem.textContent) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasksFromLocalStorage() {
  localStorage.clear();
}