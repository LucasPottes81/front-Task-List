const registerForm = document.getElementById('registerForm');

registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (res.ok) {
      alert('Usuário registrado com sucesso!');
      window.location.href = 'login.html';
    } else {
      alert(data.error || 'Erro ao registrar');
    }

  } catch (error) {
    alert('Erro na conexão com o servidor');
    console.error(error);
  }
});
