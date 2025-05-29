const form = document.getElementById('loginForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

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

        if (res.ok && data.token) {
          sessionStorage.setItem('token', data.token);
          sessionStorage.setItem('token', data.role);
          console.log("Login correto!");

          switch (data.role) {
            case 'technician':
                window.location.href = '/src/technician.html';
                break;
            case 'client':
                window.location.href = '/pages/client.html';
                break;
            case 'operation manager':
                window.location.href = '/pages/manager.html';
                break;
            default:
                console.warn('Role desconhecida:', data.role);
                window.location.href = '/pages/dashboard.html';
                break;
        }

        } else {
          console.log("falha no login")
        }

      } catch (err) {
        console.log(err)
      }
});