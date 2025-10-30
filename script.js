// Handle Login
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value.trim();

      const user = JSON.parse(localStorage.getItem(email));

      if (!user) {
        alert('No account found. Please sign up first.');
      } else if (user.password !== password) {
        alert('Incorrect password.');
      } else {
        sessionStorage.setItem('loggedInUser', JSON.stringify(user));
        alert('Login successful!');
        window.location.href = 'dashboard.html';
      }
    });
  }
});



// Handle Registration
document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('fullname').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();
      const confirmPassword = document.getElementById('confirmPassword').value.trim();

      if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
      }

      if (localStorage.getItem(email)) {
        alert('User already exists! Please login.');
        return;
      }

      const newUser = { name, email, password };
      localStorage.setItem(email, JSON.stringify(newUser));

      alert('Registration successful! You can now login.');
      window.location.href = 'index.html';
    });
  }
});


const user = JSON.parse(sessionStorage.getItem('loggedInUser'));
if (user) document.getElementById('user-name').textContent = user.name;
// Display User Name on Dashboard
