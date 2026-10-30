(function () {
  const auth = window.MYPOAuth;
  const form = document.getElementById('profile-form');
  const message = document.getElementById('profile-message');
  const session = auth.getSession();

  if (!session) {
    window.location.href = 'login.html';
    return;
  }

  const users = auth.getUsers();
  const user = users.find(item => item.email === session.email);
  if (!user) {
    localStorage.removeItem(auth.SESSION_KEY);
    window.location.href = 'login.html';
    return;
  }

  document.getElementById('profile-name').value = user.name;
  document.getElementById('profile-email').value = user.email;

  function setMessage(text, type) {
    message.textContent = text;
    message.className = `profile-message ${type}`;
  }

  async function hashPassword(password) {
    const bytes = new TextEncoder().encode(password);
    const hash = await crypto.subtle.digest('SHA-256', bytes);
    return Array.from(new Uint8Array(hash), byte => byte.toString(16).padStart(2, '0')).join('');
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('profile-name').value.trim();
    const email = document.getElementById('profile-email').value.trim().toLowerCase();
    const password = document.getElementById('profile-password').value;
    const duplicate = users.find(item => item.email === email && item.email !== user.email);

    if (!name || !email || (password && password.length < 8)) {
      setMessage('Enter a name, a valid email, and an optional password with at least 8 characters.', 'error');
      return;
    }
    if (duplicate) {
      setMessage('That email is already used by another account.', 'error');
      return;
    }

    const oldEmail = user.email;
    user.name = name;
    user.email = email;
    if (password) user.passwordHash = await hashPassword(password);
    localStorage.setItem(auth.USERS_KEY, JSON.stringify(users));
    auth.saveSession(user);

    const reviews = JSON.parse(localStorage.getItem('mypo-reviews') || '[]');
    reviews.forEach(review => {
      if (review.email === oldEmail) {
        review.email = email;
        review.name = name;
      }
    });
    localStorage.setItem('mypo-reviews', JSON.stringify(reviews));
    setMessage('Your profile has been updated.', 'success');
    document.getElementById('profile-password').value = '';
  });

  document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem(auth.SESSION_KEY);
    window.location.href = 'index.html';
  });
})();
