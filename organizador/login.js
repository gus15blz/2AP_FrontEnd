// Login Page JavaScript

// Toggle de senha
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.getElementById('togglePassword');
    const icon = toggleBtn.querySelector('i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.className = 'fas fa-eye-slash';
    } else {
        passwordInput.type = 'password';
        icon.className = 'fas fa-eye';
    }
}

// Validação de email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validação de senha
function validatePassword(password) {
    return password.length >= 6;
}

// Mostrar erro
function showError(input, message) {
    const formGroup = input.closest('.form-group');
    let errorElement = formGroup.querySelector('.error-message');
    
    if (!errorElement) {
        errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        formGroup.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    input.classList.add('error');
}

// Remover erro
function removeError(input) {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    if (errorElement) {
        errorElement.remove();
    }
    
    input.classList.remove('error');
}

// Validação em tempo real
function setupRealTimeValidation() {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    emailInput.addEventListener('input', function() {
        removeError(this);
        if (this.value && !validateEmail(this.value)) {
            showError(this, 'Por favor, insira um email válido');
        }
    });
    
    passwordInput.addEventListener('input', function() {
        removeError(this);
        if (this.value && !validatePassword(this.value)) {
            showError(this, 'A senha deve ter pelo menos 6 caracteres');
        }
    });
}

// Simular login
function simulateLogin(email, password) {
    return new Promise((resolve) => {
        // Simular delay de rede
        setTimeout(() => {
            // Simular validação (aceita qualquer email/senha válidos)
            if (validateEmail(email) && validatePassword(password)) {
                resolve({ success: true, user: { email, name: 'Usuário' } });
            } else {
                resolve({ success: false, message: 'Credenciais inválidas' });
            }
        }, 1500);
    });
}

// Mostrar modal de sucesso
function showSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.style.display = 'flex';
    
    // Redirecionar após 2 segundos
    setTimeout(() => {
        window.location.href = 'app.html';
    }, 2000);
}

// Login com Google
function loginWithGoogle() {
    console.log('Login com Google');
    // Simular login social
    setTimeout(() => {
        showSuccessModal();
    }, 1000);
}

// Login com GitHub
function loginWithGitHub() {
    console.log('Login com GitHub');
    // Simular login social
    setTimeout(() => {
        showSuccessModal();
    }, 1000);
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página de login carregada!');
    
    // Toggle de senha
    const togglePasswordBtn = document.getElementById('togglePassword');
    if (togglePasswordBtn) {
        togglePasswordBtn.addEventListener('click', togglePassword);
    }
    
    // Validação em tempo real
    setupRealTimeValidation();
    
    // Formulário de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const rememberMe = document.getElementById('rememberMe').checked;
            
            // Validação final
            let hasErrors = false;
            
            if (!validateEmail(email)) {
                showError(document.getElementById('email'), 'Por favor, insira um email válido');
                hasErrors = true;
            }
            
            if (!validatePassword(password)) {
                showError(document.getElementById('password'), 'A senha deve ter pelo menos 6 caracteres');
                hasErrors = true;
            }
            
            if (hasErrors) return;
            
            // Desabilitar botão de login
            const loginBtn = document.querySelector('.login-btn');
            loginBtn.disabled = true;
            loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Entrando...';
            
            try {
                const result = await simulateLogin(email, password);
                
                if (result.success) {
                    // Salvar dados do usuário
                    if (rememberMe) {
                        localStorage.setItem('userEmail', email);
                        localStorage.setItem('rememberMe', 'true');
                    }
                    
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('userName', result.user.name);
                    
                    showSuccessModal();
                } else {
                    // Mostrar erro
                    const errorDiv = document.createElement('div');
                    errorDiv.className = 'error-banner';
                    errorDiv.innerHTML = `
                        <i class="fas fa-exclamation-triangle"></i>
                        ${result.message}
                    `;
                    
                    loginForm.insertBefore(errorDiv, loginForm.firstChild);
                    
                    // Remover erro após 5 segundos
                    setTimeout(() => {
                        errorDiv.remove();
                    }, 5000);
                }
            } catch (error) {
                console.error('Erro no login:', error);
            } finally {
                // Reabilitar botão
                loginBtn.disabled = false;
                loginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Entrar';
            }
        });
    }
    
    // Login social
    const googleBtn = document.querySelector('.google-btn');
    const githubBtn = document.querySelector('.github-btn');
    
    if (googleBtn) {
        googleBtn.addEventListener('click', loginWithGoogle);
    }
    
    if (githubBtn) {
        githubBtn.addEventListener('click', loginWithGitHub);
    }
    
    // Verificar se já está logado
    if (localStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = 'app.html';
    }
    
    // Preencher email se "lembrar de mim" estiver ativo
    const savedEmail = localStorage.getItem('userEmail');
    const rememberMe = localStorage.getItem('rememberMe');
    
    if (savedEmail && rememberMe === 'true') {
        document.getElementById('email').value = savedEmail;
        document.getElementById('rememberMe').checked = true;
    }
    
    // Animações de entrada
    const loginContainer = document.querySelector('.login-container');
    if (loginContainer) {
        loginContainer.style.opacity = '0';
        loginContainer.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            loginContainer.style.transition = 'all 0.6s ease';
            loginContainer.style.opacity = '1';
            loginContainer.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Efeito parallax no background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.bg-shape');
        
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
});
