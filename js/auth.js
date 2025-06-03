// Authentication functionality
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Check if user is already logged in
    checkAuthStatus();
});

function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    
    // Find user in sample data
    const user = appData.users.find(u => 
        u.username === username && 
        u.password === password && 
        u.role === role
    );
   
    if (user) {
        var user1 = {'username':username, 'role':role};
        setCurrentUser(user1);
        redirectToDashboard(role);
    } else {
        showError('Invalid credentials or role mismatch');
    }
}

function redirectToDashboard(role) {
    const dashboardUrls = {
        'developer': 'pages/developer/dashboard.html',
        'sponsor': 'pages/sponsor/dashboard.html',
        'moderator': 'pages/moderator/dashboard.html'
    };
    
    window.location.href = dashboardUrls[role];
}

function logout() {
    setCurrentUser(null);
    window.location.href = '../../index.html';
}

function checkAuthStatus() {
    const currentPath = window.location.pathname;
    const isLoginPage = currentPath.includes('index.html') || currentPath === '/' || currentPath.endsWith('/');
    
    if (!getCurrentUser() && !isLoginPage) {
        window.location.href = '../../index.html';
    }
}

function requireAuth() {
    if (!getCurrentUser()) {
        window.location.href = '../../index.html';
        return false;
    }
    return true;
}

function showError(message) {
    // Create or update error alert
    let alert = document.querySelector('.alert-error');
    if (!alert) {
        alert = document.createElement('div');
        alert.className = 'alert alert-error';
        document.querySelector('.login-form').insertBefore(alert, document.querySelector('.login-form').firstChild);
    }
    alert.textContent = message;
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        if (alert.parentNode) {
            alert.parentNode.removeChild(alert);
        }
    }, 5000);
}