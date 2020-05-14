// Define UI Vars
const form = document.getElementById('task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.getElementById('filter');
const taskInput = document.getElementById('task');
 
// Feedback
const feedback = document.createElement('div');
feedback.className = 'feedback red-text'
console.log(feedback);

// Load all event Listeners
loadEventListeners();

function loadEventListeners() {
  form.addEventListener('submit', addTask);
}

function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a task');
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

  // Clear the input
  taskInput.value = '';

  e.preventDefault();
}