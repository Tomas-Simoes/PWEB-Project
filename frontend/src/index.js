
document.addEventListener('DOMContentLoaded', () => {
  console.log('dom loaded')
  const form = document.getElementById('loginForm');

  form.addEventListener('submit', async (e) => {
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      e.preventDefault(); 
      try {
          const res = await fetch('http://localhost:3000/api/auth/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ email, password })
          });
  
          const data = await res.json();
  
          if (res.ok && data.token) {
            sessionStorage.setItem('token', data.token);
            console.log("Login correto!");
          } else {
            console.log("falha no login")
          }
  
        } catch (err) {
          console.log(err)
        }
  });
})
