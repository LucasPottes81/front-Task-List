document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const res = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();
  if (res.ok) {
    alert('Login feito com sucesso!');
    // Aqui você pode salvar o token e redirecionar para a home
    window.location.href = 'home.html'; // Exemplo
  } else {
    alert(data.error || 'Erro ao fazer login.');
  }
});
