const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (res.ok) {
      // Salva o token no localStorage
      localStorage.setItem('token', data.token);
      window.location.href = 'dashboard.html';
    } else {
      alert(data.error || 'Erro ao fazer login');
    }

  } catch (error) {
    alert('Erro na conexão com o servidor');
    console.error(error);
  }
});
