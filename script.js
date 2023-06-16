// Datos iniciales de las tareas
let tasks = [];

// Comprueba si hay datos de tareas almacenados en localStorage
if (localStorage.getItem("tasks")) {
  // Recupera las tareas almacenadas y las asigna a la variable tasks
  tasks = JSON.parse(localStorage.getItem("tasks"));
}


// Obtener elementos del DOM
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Función para renderizar la lista de tareas
function renderTasks() {
  taskList.innerHTML = '';
  
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${task.title}</span>
      <button onclick="editTask(${index})">Editar</button>
      <button onclick="deleteTask(${index})">Eliminar</button>
      <button onclick="toggleTaskStatus(${index})">Marcar como ${task.completed ? 'ToDo' : 'Done'}</button>
    `;
    
    li.classList.add(task.completed ? 'completed' : 'todo');
    
    taskList.appendChild(li);
  });


// Almacena las tareas en localStorage
localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Función para agregar una nueva tarea
function addTask(event) {
  event.preventDefault();
  
  const title = taskInput.value.trim();
  
  if (title !== '') {
    const newTask = { title, completed: false };
    tasks.push(newTask);
    
    taskInput.value = '';
    
    renderTasks();
  }
}

// Función para editar una tarea existente
function editTask(index) {
  const newTitle = prompt('Ingrese el nuevo título de la tarea');
  
  if (newTitle !== null && newTitle.trim() !== '') {
    tasks[index].title = newTitle.trim();
    
    renderTasks();
  }
}

// Función para eliminar una tarea existente
function deleteTask(index) {
  if (confirm('¿Estás seguro que quieres eliminar esta tarea?')) {
    tasks.splice(index, 1);
    
    renderTasks();
  }
}

// Función para cambiar el estado de una tarea
function toggleTaskStatus(index) {
  tasks[index].completed = !tasks[index].completed;
  
  renderTasks();
}

// Renderiza las tareas al cargar la página
renderTasks();

// Asignar el evento de envío de formulario
taskForm.addEventListener('submit', addTask);
