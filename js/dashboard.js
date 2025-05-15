const taskList = document.getElementById('taskList');
const taskForm = document.getElementById('taskForm');
const newTaskInput = document.getElementById('newTask');
const logoutBtn = document.getElementById('logoutBtn');

const API_URL = 'http://localhost:3000/tasks';
const token = localStorage.getItem('token');

if (!token) {
  alert('Você precisa estar logado!');
  window.location.href = 'login.html';
}

// Elementos do modal
const editModal = document.getElementById('editModal');
const editInput = document.getElementById('editInput');
const cancelBtn = document.getElementById('cancelBtn');
const saveBtn = document.getElementById('saveBtn');

let currentEditTaskId = null;
let currentOldTitle = '';

// ========== Carregar tarefas ==========
async function loadTasks() {
  try {
    const res = await fetch(API_URL, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const tasks = await res.json();
    renderTasks(tasks);
  } catch (error) {
    console.error('Erro ao carregar tarefas:', error);
  }
}

// ========== Adicionar tarefa ==========
taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = newTaskInput.value;

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ title })
    });

    if (res.ok) {
      newTaskInput.value = '';
      loadTasks();
    }
  } catch (error) {
    console.error('Erro ao adicionar tarefa:', error);
  }
});

// ========== Renderizar tarefas ==========
function renderTasks(tasks) {
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = task.title;

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Editar';
    editBtn.classList.add('edit');
    editBtn.onclick = () => openEditModal(task.id, task.title);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Excluir';
    deleteBtn.onclick = () => deleteTask(task.id);

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });
}

// ========== Abrir modal de edição ==========
function openEditModal(id, oldTitle) {
  currentEditTaskId = id;
  currentOldTitle = oldTitle;
  editInput.value = oldTitle;
  editModal.style.display = 'flex';
}

// ========== Fechar modal ==========
function closeModal() {
  editModal.style.display = 'none';
  currentEditTaskId = null;
  currentOldTitle = '';
}

// ========== Salvar edição ==========
saveBtn.addEventListener('click', async () => {
  const newTitle = editInput.value.trim();
  if (!newTitle || newTitle === currentOldTitle) {
    closeModal();
    return;
  }

  try {
    await fetch(`${API_URL}/${currentEditTaskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ title: newTitle })
    });
    loadTasks();
  } catch (error) {
    console.error('Erro ao editar tarefa:', error);
  } finally {
    closeModal();
  }
});

// Cancelar edição
cancelBtn.addEventListener('click', () => {
  closeModal();
});

// ========== Excluir tarefa ==========
async function deleteTask(id) {
  if (!confirm('Tem certeza que deseja excluir?')) return;

  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    loadTasks();
  } catch (error) {
    console.error('Erro ao excluir tarefa:', error);
  }
}

// ========== Logout ==========
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('token');
  window.location.href = 'index.html';
});

loadTasks();
