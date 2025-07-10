let adInterval;
let credits = 0;
let isFollowing = false;

// Función para cargar el estado de seguimiento desde localStorage
function loadFollowState() {
    const streamerName = 'ByteRaptor'; // Nombre del streamer actual
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
    const streamerName = 'ByteRaptor'; // Nombre del streamer actual
    localStorage.setItem(`following_${streamerName}`, isFollowing.toString());
}

// Función para cambiar el estado de seguimiento
function toggleFollow() {
    const followBtn = document.getElementById('followBtn');
    const followText = document.getElementById('followText');
    const followIcon = document.getElementById('followIcon');
    
    // Agregar animación
    followBtn.classList.add('animate');
    
    if (!isFollowing) {
        // Cambiar a estado "Siguiendo"
        isFollowing = true;
        followText.textContent = 'Siguiendo';
        followIcon.textContent = 'favorite';
        followBtn.classList.add('following');
        
        // Mostrar notificación
        showFollowNotification('¡Ahora sigues a ByteRaptor!', 'favorite');
        
    } else {
        // Cambiar a estado "Seguir"
        isFollowing = false;
        followText.textContent = 'Seguir';
        followIcon.textContent = 'favorite_border';
        followBtn.classList.remove('following');
        
        // Mostrar notificación
        showFollowNotification('Has dejado de seguir a ByteRaptor', 'heart_broken');
    }
    
    // Guardar estado
    saveFollowState();
    
    // Remover animación después de completarse
    setTimeout(() => {
        followBtn.classList.remove('animate');
    }, 600);
}

// Función para mostrar notificación de seguimiento
function showFollowNotification(message, icon) {
    // Crear elemento de notificación si no existe
    let notification = document.getElementById('followNotification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'followNotification';
        notification.className = 'follow-notification';
        document.body.appendChild(notification);
    }
    
    // Configurar contenido
    notification.innerHTML = `
        <span class="material-symbols-outlined">${icon}</span>
        ${message}
    `;
    
    // Mostrar notificación
    notification.classList.add('show');
    
    // Ocultar después de 3 segundos
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Busca el elemento de créditos en la navbar
function updateCreditsDisplay() {
    const creditsItem = Array.from(document.querySelectorAll('.user-info .user-item')).find(el => el.textContent.includes('Créditos'));
    if (creditsItem) {
        creditsItem.innerHTML = `<span class="material-symbols-outlined">stars</span> ${credits} Créditos`;
    }
}

function showAdPopup() {
    document.getElementById('adPopup').style.display = 'flex';
    let seconds = 5;
    document.getElementById('adTimer').textContent = `0:0${seconds}`;
    document.getElementById('closeAdBtn').style.display = 'none';
    // Mensaje inicial
    const adMsg = document.querySelector('#adPopup .popup-box > div > div:nth-child(4)');
    adMsg.textContent = 'Gracias por apoyar al creador';
    adMsg.style.color = '#fff';
    adInterval = setInterval(() => {
        seconds--;
        document.getElementById('adTimer').textContent = `0:0${seconds}`;
        if (seconds <= 0) {
            clearInterval(adInterval);
            document.getElementById('adTimer').textContent = '0:00';
            document.getElementById('closeAdBtn').style.display = 'block';
            adMsg.textContent = '¡Ganaste +10 créditos!';
            adMsg.style.color = '#01D2FC';
        }
    }, 1000);
}

function closeAdPopup() {
    document.getElementById('adPopup').style.display = 'none';
    clearInterval(adInterval);
    // Suma 10 créditos solo si el mensaje de ganaste créditos está visible
    const adMsg = document.querySelector('#adPopup .popup-box > div > div:nth-child(4)');
    if (adMsg.textContent.includes('Ganaste')) {
        credits += 10;
        updateCreditsDisplay();
    }
}

// Mostrar popup de canje exitoso
function showRedeemPopup() {
    document.getElementById('redeemPopup').style.display = 'flex';
    // Ya NO se cierra solo, solo con el botón de cerrar
}

function closeRedeemPopup() {
    document.getElementById('redeemPopup').style.display = 'none';
}

// Mostrar popup de créditos insuficientes
function showInsufficientCreditsPopup() {
    document.getElementById('insufficientCreditsPopup').style.display = 'flex';
}

function closeInsufficientCreditsPopup() {
    document.getElementById('insufficientCreditsPopup').style.display = 'none';
}

// Asigna el evento a todos los botones "Canjear"
document.querySelectorAll('.reward-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        // Obtener el costo de la recompensa
        const costSpan = this.parentElement.querySelector('.reward-cost');
        if (costSpan) {
            const match = costSpan.textContent.match(/(\d+)/);
            const cost = match ? parseInt(match[1], 10) : 0;
            if (credits >= cost) {
                credits -= cost;
                updateCreditsDisplay();
                showRedeemPopup();
            } else {
                showInsufficientCreditsPopup();
            }
        }
    });
});

// Inicializa los créditos y el estado de seguimiento al cargar la página
window.onload = function() {
    // Cargar créditos
    const creditsItem = Array.from(document.querySelectorAll('.user-info .user-item')).find(el => el.textContent.includes('Créditos'));
    if (creditsItem) {
        const match = creditsItem.textContent.match(/(\d+)\s*Créditos/);
        credits = match ? parseInt(match[1], 10) : 0;
        updateCreditsDisplay();
    }
    
    // Cargar estado de seguimiento
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
