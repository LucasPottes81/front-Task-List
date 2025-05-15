// js/auth.js
import { login } from './api.js';

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const message = document.getElementById('message');

  try {
    const result = await login(username, password);

    // Salvar token no localStorage, se quiser usar depois
    if (result.token) {
      localStorage.setItem('token', result.token);
    }

    message.style.color = 'green';
    message.textContent = 'Login realizado com sucesso!';
    
    // Redirecionar para dashboard.html ou outra página
    // window.location.href = 'dashboard.html';
  } catch (error) {
    message.style.color = 'red';
    message.textContent = error.message;
  }
});
