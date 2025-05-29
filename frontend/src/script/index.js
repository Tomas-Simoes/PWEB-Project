const form = document.getElementById('loginForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
  console.log("yo")
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    console.log(res.ok)
    console.log(data)
    if (res.ok && data.token) {
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('role', data.role);
      console.log("Login correto!");

      switch (data.role) {
        case 'tech':
            window.location.href = '/techPage.html'; // Remove ../frontend/src/
            break;
        case 'client':
            window.location.href = '/clientPage.html';
            break;
        case 'monitor':
            window.location.href = '/energyMonitoring.html';
            break;
        default:
            console.warn('Role desconhecida:', data.role);
            window.location.href = '/index.html';
            break;
    }

    } else {
      console.log("falha no login")
    }

  } catch (err) {
    console.log(err)
  }
});