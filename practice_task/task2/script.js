const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const filters = document.getElementById('filters');
const clearCompletedBtn = document.getElementById('clear-completed-btn');
const countSpan = document.getElementById('count');

// ========== LocalStorage Helpers ==========
function saveTasks() {
  const tasks = [];
  document.querySelectorAll('.task-item').forEach(li => {
    tasks.push({
      text: li.dataset.text,
      completed: li.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
function loadTasks() {
  const saved = JSON.parse(localStorage.getItem('tasks')) || [];
  saved.forEach(obj => createTaskElement(obj.text, obj.completed));
}

// ========== UI Helpers ==============
function updateCount() {
  const activeCount = [...document.querySelectorAll('.task-item:not(.completed)')].length;
  countSpan.textContent = `${activeCount} task${activeCount === 1 ? '' : 's'} remaining`;
}

function setFilterActive(filter) {
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`.filter-btn[data-filter="${filter}"]`).classList.add('active');
}

// ========== Task Item Factory ==========
function createTaskElement(taskText, completed = false) {
  const li = document.createElement('li');
  li.className = 'task-item';
  li.dataset.text = taskText;
  if (completed) li.classList.add('completed');

  // Task label span
  const label = document.createElement('span');
  label.textContent = taskText;
  label.className = 'task-label';
  li.appendChild(label);

  // Inline edit on double click
  label.addEventListener('dblclick', function(e) {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = label.textContent;
    input.className = 'edit-input';

    input.addEventListener('keydown', function(ev) {
      if (ev.key === 'Enter') {
        const newValue = input.value.trim();
        if (newValue !== '') {
          label.textContent = newValue;
          li.dataset.text = newValue;
          saveTasks();
        }
        input.remove();
        label.style.display = '';
      }
      if (ev.key === 'Escape') {
        input.remove();
        label.style.display = '';
      }
    });

    label.style.display = 'none';
    li.insertBefore(input, label);
    input.focus();
  });

  // Complete/Uncomplete toggle
  label.addEventListener('click', function(e) {
    li.classList.toggle('completed');
    saveTasks();
    updateCount();
    applyCurrentFilter();
  });

  // Remove button
  const rmBtn = document.createElement('button');
  rmBtn.textContent = 'Remove';
  rmBtn.className = 'remove-btn';
  rmBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    li.remove();
    saveTasks();
    updateCount();
  });

  li.appendChild(rmBtn);
  taskList.appendChild(li);

  updateCount();
  applyCurrentFilter();
}

// ========== Add Task ==========
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  createTaskElement(taskText, false);
  saveTasks();
  taskInput.value = '';
  taskInput.focus();
}

// Enter key on input
taskInput.addEventListener('keyup', function(e) {
  if (e.key === 'Enter') addTask();
});

// Add button
addBtn.addEventListener('click', addTask);

// ========== Filters ==========
function applyCurrentFilter() {
  const activeBtn = document.querySelector('.filter-btn.active');
  const filter = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';

  document.querySelectorAll('.task-item').forEach(li => {
    if (filter === 'all') li.style.display = '';
    else if (filter === 'active') li.style.display = li.classList.contains('completed') ? 'none' : '';
    else if (filter === 'completed') li.style.display = li.classList.contains('completed') ? '' : 'none';
  });
}

filters.addEventListener('click', function(e) {
  if (!e.target.classList.contains('filter-btn')) return;
  const filter = e.target.getAttribute('data-filter');
  setFilterActive(filter);
  applyCurrentFilter();
});

// ========== Clear Completed ==========
clearCompletedBtn.addEventListener('click', function() {
  document.querySelectorAll('.task-item.completed').forEach(li => li.remove());
  saveTasks();
  updateCount();
});

// ========== Initial Load ==========
window.onload = function() {
  loadTasks();
  setFilterActive('all');
  applyCurrentFilter();
  updateCount();
};
