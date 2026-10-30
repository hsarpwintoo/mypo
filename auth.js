(function () {
  const SESSION_KEY = 'mypo-session';
  const USERS_KEY = 'mypo-users';

  function getSession() {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
    } catch (error) {
      console.error('Unable to read the current session.', error);
      return null;
    }
  }

  function getUsers() {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    } catch (error) {
      console.error('Unable to read saved accounts.', error);
      return [];
    }
  }

  function saveSession(user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ name: user.name, email: user.email }));
  }

  function renderHeaderAccount() {
    const button = document.querySelector('.login-btn');
    if (!button) return;

    const session = getSession();
    button.removeAttribute('onclick');
    if (!session) {
      button.textContent = 'Login';
      button.onclick = () => { window.location.href = 'login.html'; };
      return;
    }

    button.textContent = session.name;
    button.title = 'Open your MYPO profile';
    button.classList.add('profile-btn');
    button.onclick = () => { window.location.href = 'profile.html'; };
  }

  window.MYPOAuth = { getSession, getUsers, saveSession, SESSION_KEY, USERS_KEY };
  document.addEventListener('DOMContentLoaded', renderHeaderAccount);
})();
