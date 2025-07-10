let isFollowing = false;
let signupType = "usuario";

// Funciones de Login/Signup
function openPopup() {
    document.getElementById("loginPopup").style.display = "flex";
}

function closePopup() {
    document.getElementById("loginPopup").style.display = "none";
}

function openErrorPopup() {
    document.getElementById("errorPopup").style.display = "flex";
}

function closeErrorPopup() {
    document.getElementById("errorPopup").style.display = "none";
}

function openSignupPopup() {
    document.getElementById("signupPopup").style.display = "flex";
}

function closeSignupPopup() {
    document.getElementById("signupPopup").style.display = "none";
}

function login() {
    const usuario = document.getElementById("usuario").value;
    const clave = document.getElementById("clave").value;

    if (usuario === "admin" && clave === "1234") {
        window.location.href = "user-home.html";
    } else {
        openErrorPopup();
    }
}

function showSignupPopup(type = "usuario") {
    signupType = type;
    closePopup();
    document.getElementById("signupPopup").style.display = "flex";
}

function closeWelcomePopup() {
    document.getElementById("welcomePopup").style.display = "none";
    if (signupType === "creador") {
        window.location.href = "user-Panel-Creadores.html";
    } else {
        window.location.href = "user-home.html";
    }
}

function closeSignupErrorPopup() {
    document.getElementById("signupErrorPopup").style.display = "none";
}

function signup() {
    const email = document.getElementById("signup-email").value.trim();
    const username = document.getElementById("signup-username").value.trim();
    const password = document.getElementById("signup-password").value;
    const password2 = document.getElementById("signup-password2").value;

    if (!email || !username || !password || !password2 || password !== password2) {
        document.getElementById("signupErrorMessage").innerHTML = "Verifica que todos los campos sean válidos.";
        document.getElementById("signupErrorPopup").style.display = "flex";
        return;
    }

    closeSignupPopup();
    if (signupType === "creador") {
        window.location.href = "user-Panel-Creadores.html";
    } else {
        window.location.href = "user-home.html";
    }
}

function loginWithGoogle() {
    closePopup();
    setTimeout(() => {
        window.location.href = 'user-home.html';
    }, 500);
}

function loginWithFacebook() {
    closePopup();
    setTimeout(() => {
        window.location.href = 'user-home.html';
    }, 500);
}

// Función para mostrar popup de login cuando se intenta seguir
function showLoginToFollow() {
    openPopup();
}

// Función para cargar el estado de seguimiento desde localStorage
function loadFollowState() {
    const streamerName = 'ByteRaptor';
    const savedState = localStorage.getItem(`following_${streamerName}`);
    
    if (savedState === 'true') {
        isFollowing = true;
        const followBtn = document.getElementById('followBtn');
        const followText = document.getElementById('followText');
        const followIcon = document.getElementById('followIcon');
        
        followText.textContent = 'Siguiendo';
        followIcon.textContent = 'favorite';
        followBtn.classList.add('following');
    }
}

// Función para guardar el estado de seguimiento en localStorage
function saveFollowState() {
    const streamerName = 'ByteRaptor';
    localStorage.setItem(`following_${streamerName}`, isFollowing.toString());
}

// Función para mostrar notificación de seguimiento
function showFollowNotification(message, icon) {
    let notification = document.getElementById('followNotification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'followNotification';
        notification.className = 'follow-notification';
        document.body.appendChild(notification);
    }
    
    notification.innerHTML = `
        <span class="material-symbols-outlined">${icon}</span>
        ${message}
    `;
    
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

window.onload = function() {
    loadFollowState();
};

// Video fallback script
function fallbackToStreamerImage() {
    console.log('Video failed to load, falling back to streamer image');
    const video = document.getElementById('streamVideo');
    const fallbackImg = document.getElementById('streamFallback');
    
    if (video && fallbackImg) {
        video.style.display = 'none';
        fallbackImg.style.display = 'block';
    }
}

// También verificar si el video puede cargar al inicio
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('streamVideo');
    
    if (video) {
        // Listener para errores de carga del video
        video.addEventListener('error', function() {
            fallbackToStreamerImage();
        });
        
        // Si el video no carga después de 3 segundos, usar fallback
        setTimeout(function() {
            if (video.networkState === HTMLMediaElement.NETWORK_NO_SOURCE || 
                video.error || 
                video.readyState === 0) {
                fallbackToStreamerImage();
            }
        }, 3000);
    }
});
