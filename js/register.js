document.getElementById('registerForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const res = await fetch('http://localhost:3000/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();
  if (res.ok) {
    alert('Cadastro feito com sucesso!');
    window.location.href = 'login.html';
  } else {
    alert(data.error || 'Erro ao cadastrar.');
  }
});
