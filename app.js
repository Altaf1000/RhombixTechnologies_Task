// Select DOM elements
const taskInput = document.getElementById('new-task');
const addTaskBtn = document.getElementById('add-task-btn');
const todoList = document.getElementById('todo-list');
const clearAllBtn = document.getElementById('clear-all-btn');

// Load tasks from local storage on DOMContentLoaded
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task on button click
addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  
  if (!taskText) {
    customAlert("Please enter a task!");
  } else {
    addTask(taskText, 'new');
    saveTask(taskText);
    taskInput.value = '';
  }
});

// Clear All Tasks button event listener
clearAllBtn.addEventListener('click', clearAllTasks);

// Edit or delete tasks
todoList.addEventListener('click', (e) => {
  if (e.target.classList.contains('edit')) {
    const taskItem = e.target.parentElement.firstChild;
    taskInput.value = taskItem.textContent;
    taskItem.parentElement.classList.add('edit-mode');
    taskItem.parentElement.remove();
    deleteTask(taskItem.textContent);
  }

  if (e.target.classList.contains('delete')) {
    const taskItem = e.target.parentElement;
    taskItem.classList.add('remove-mode');
    setTimeout(() => {
      deleteTask(taskItem.firstChild.textContent);
      taskItem.remove();
    }, 300);
  }
});

// Add task to the UI
function addTask(taskText, type) {
  const li = document.createElement('li');
  
  const span = document.createElement('span');
  span.textContent = taskText;

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.classList.add('edit');
  
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('delete');

  li.appendChild(span);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);
  
  if (type === 'new') {
    li.style.backgroundColor = '#e0f7fa';  // Light cyan for new tasks
  } else {
    li.style.backgroundColor = '#fff3e0';  // Light orange for edited tasks
  }
  
  todoList.appendChild(li);
}

// Save task to local storage
function saveTask(taskText) {
  let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
  tasks.push(taskText);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasks() {
  const tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
  tasks.forEach(task => addTask(task, 'saved'));
}

// Delete task from local storage
function deleteTask(taskText) {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks = tasks.filter(task => task !== taskText);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear all tasks from UI and local storage
function clearAllTasks() {
  todoList.innerHTML = '';  // Clear the list in the UI
  localStorage.removeItem('tasks');  // Remove tasks from local storage
}

// Custom alert for empty input
function customAlert(message) {
  alert(message);
}
