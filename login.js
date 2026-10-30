const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');
const signupMessage = document.getElementById('signup-message');
const loginMessage = document.getElementById('login-message');

const USERS_KEY = 'mypo-users';
const SESSION_KEY = 'mypo-session';

function getUsers() {
    try {
        return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    } catch (error) {
        console.error('Unable to read saved accounts.', error);
        return [];
    }
}

async function hashPassword(password) {
    const bytes = new TextEncoder().encode(password);
    const hash = await crypto.subtle.digest('SHA-256', bytes);
    return Array.from(new Uint8Array(hash), byte => byte.toString(16).padStart(2, '0')).join('');
}

function showMessage(element, message, type) {
    element.textContent = message;
    element.className = `form-message ${type}`;
}

registerBtn.addEventListener('click', ()=>{
    container.classList.add("active");
    signupMessage.textContent = '';
});

loginBtn.addEventListener('click', ()=>{
    container.classList.remove("active");
    loginMessage.textContent = '';
});

signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim().toLowerCase();
    const password = document.getElementById('signup-password').value;
    const users = getUsers();

    if (!name || !email || password.length < 8) {
        showMessage(signupMessage, 'Enter your name, a valid email, and a password with at least 8 characters.', 'error');
        return;
    }
    if (users.some(user => user.email === email)) {
        showMessage(signupMessage, 'An account already exists for this email. Please sign in.', 'error');
        return;
    }

    users.push({ name, email, passwordHash: await hashPassword(password), createdAt: new Date().toISOString() });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    localStorage.setItem(SESSION_KEY, JSON.stringify({ name, email }));
    showMessage(signupMessage, 'Account created. Welcome to MYPO!', 'success');
    signupForm.reset();
    setTimeout(() => { window.location.href = 'index.html'; }, 700);
});

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('login-email').value.trim().toLowerCase();
    const password = document.getElementById('login-password').value;
    const user = getUsers().find(item => item.email === email);

    if (!user || user.passwordHash !== await hashPassword(password)) {
        showMessage(loginMessage, 'Email or password is incorrect.', 'error');
        return;
    }

    localStorage.setItem(SESSION_KEY, JSON.stringify({ name: user.name, email: user.email }));
    showMessage(loginMessage, `Welcome back, ${user.name}!`, 'success');
    loginForm.reset();
    setTimeout(() => { window.location.href = 'index.html'; }, 700);
});