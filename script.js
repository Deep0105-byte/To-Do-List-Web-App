// Select elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Load tasks from local storage
document.addEventListener('DOMContentLoaded', loadTasks);

// Event Listeners
addTaskBtn.addEventListener('click', addTask);
taskList.addEventListener('click', manageTask);

// Add new task
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        // Create task and append to list
        createTask(taskText);
        saveTaskToLocalStorage(taskText);

        // Clear input
        taskInput.value = "";
    }
}

// Create a task item
function createTask(taskText) {
    const taskItem = document.createElement('li');
    taskItem.textContent = taskText;

    // Add complete functionality
    taskItem.addEventListener('click', () => {
        taskItem.classList.toggle('completed');
    });

    // Add remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-btn');
    taskItem.appendChild(removeBtn);

    // Add to the list
    taskList.appendChild(taskItem);
}

// Manage complete or remove task
function manageTask(event) {
    if (event.target.classList.contains('remove-btn')) {
        const taskItem = event.target.parentElement;
        taskItem.remove();
        removeTaskFromLocalStorage(taskItem.textContent);
    }
}

// Save tasks to local storage
function saveTaskToLocalStorage(taskText) {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasks() {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.forEach(taskText => createTask(taskText));
}

// Remove task from local storage
function removeTaskFromLocalStorage(taskText) {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks = tasks.filter(task => task !== taskText.trim());
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Share button functionality
const shareBtn = document.getElementById('shareBtn');

shareBtn.addEventListener('click', () => {
    const tasks = Array.from(document.querySelectorAll('li')).map(task => task.textContent.replace('Remove', '').trim());
    
    if (navigator.share) {
        navigator.share({
            title: 'My To-Do List',
            text: tasks.length ? `Here’s what’s on my list:\n\n${tasks.join('\n')}` : 'No tasks yet!',
            url: window.location.href
        }).then(() => {
            console.log('List shared successfully');
        }).catch((error) => {
            console.log('Error sharing', error);
        });
    } else {
        alert('Sharing not supported on this browser. Try with a mobile device!');
    }
});

