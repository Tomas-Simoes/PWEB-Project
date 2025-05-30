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

    console.log(res.ok);
    console.log(data);
    if (res.ok && data.token) {
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('role', data.role);
      alert("Login successful!");

      switch (data.role) {
        case 'tech':
          window.location.href = '/techPage.html';
          break;
        case 'client':
          window.location.href = '/clientPage.html';
          break;
        case 'monitor':
          window.location.href = '/energyMonitoring.html';
          break;
        default:
          console.warn('Unknown role:', data.role);
          alert("Unknown role. Redirecting to homepage.");
          window.location.href = '/index.html';
          break;
      }

    } else {
      alert(data.error || "Login failed. Please check your credentials.");
    }

  } catch (err) {
    console.error(err);
    alert("An error occurred while trying to log in. Please try again later.");
  }
});
