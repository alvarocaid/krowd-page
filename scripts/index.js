let signupType = "usuario";

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
        window.location.href = "user-home.html"; // Redirige al home de usuario
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

    // Validación personalizada
    if (!email || !username || !password || !password2 || password !== password2) {
        document.getElementById("signupErrorMessage").innerHTML = "Verifica que todos los campos sean válidos.";
        document.getElementById("signupErrorPopup").style.display = "flex";
        return;
    }

    // Si todo está bien, redirigir directamente
    closeSignupPopup();
    if (signupType === "creador") {
        window.location.href = "user-Panel-Creadores.html";
    } else {
        window.location.href = "user-home.html";
    }
}

// Nuevas funciones para login con redes sociales
function loginWithGoogle() {
    // Cerrar el popup antes de redirigir
    closePopup();
    
    // Simulación de autenticación exitosa con Google
    // En una implementación real, aquí harías la autenticación con Google OAuth
    setTimeout(() => {
        window.location.href = 'user-home.html';
    }, 500);
}

function loginWithFacebook() {
    // Cerrar el popup antes de redirigir
    closePopup();
    
    // Simulación de autenticación exitosa con Facebook
    // En una implementación real, aquí harías la autenticación con Facebook Login
    setTimeout(() => {
        window.location.href = 'user-home.html';
    }, 500);
}

// Función para filtrar streams por categoría
function filterByCategory(category) {
    const streamCards = document.querySelectorAll('.stream-card');
    const filterItems = document.querySelectorAll('.filter-item');
    const searchInput = document.getElementById('searchInput');
    const sections = document.querySelectorAll('.category-section');
    
    // Limpiar búsqueda al usar filtros
    searchInput.value = '';
    document.getElementById('clearSearchBtn').style.display = 'none';
    
    // Remover clase activa de todos los filtros
    filterItems.forEach(item => item.classList.remove('active'));
    
    // Agregar clase activa al filtro seleccionado
    const activeFilter = document.querySelector(`[data-category="${category}"]`);
    if (activeFilter) {
        activeFilter.classList.add('active');
    }
    
    // Mostrar/ocultar secciones completas según el filtro
    sections.forEach(section => {
        if (category === 'all') {
            section.style.display = 'block';
        } else {
            const sectionId = section.id;
            const sectionCategory = getSectionCategory(sectionId);
            if (sectionCategory === category) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        }
    });
    
    // Actualizar títulos de secciones
    updateSectionTitles(category);
    
    // Remover mensaje de sin resultados
    const existingMessage = document.querySelector('.no-results-message');
    if (existingMessage) {
        existingMessage.remove();
    }
}

// Función para obtener la categoría de una sección basada en su ID
function getSectionCategory(sectionId) {
    const categoryMap = {
        'videojuegos-section': 'Videojuegos',
        'justchatting-section': 'Just Chatting',
        'irl-section': 'IRL',
        'musica-section': 'Música',
        'arte-section': 'Arte',
        'charlas-section': 'Charlas'
    };
    return categoryMap[sectionId] || '';
}

// Función para actualizar títulos de secciones según el filtro
function updateSectionTitles(category) {
    const sections = document.querySelectorAll('.category-section');
    
    sections.forEach(section => {
        const title = section.querySelector('h1');
        const sectionCategory = getSectionCategory(section.id);
        
        if (category === 'all') {
            title.textContent = sectionCategory;
        } else if (sectionCategory === category) {
            title.textContent = `${category} - Streams en Vivo`;
        }
    });
}

// Función para actualizar títulos durante la búsqueda
function updateSectionTitlesForSearch(searchTerm) {
    const sections = document.querySelectorAll('.category-section');
    
    sections.forEach(section => {
        const title = section.querySelector('h1');
        const sectionCategory = getSectionCategory(section.id);
        
        if (searchTerm === '') {
            title.textContent = sectionCategory;
        } else {
            title.textContent = `${sectionCategory} - Resultados para "${searchTerm}"`;
        }
    });
}

// Función para mostrar mensaje de sin resultados
function showNoResultsMessage(totalVisible, searchTerm) {
    // Remover mensaje anterior si existe
    const existingMessage = document.querySelector('.no-results-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Mostrar mensaje solo si hay búsqueda activa y no hay resultados
    if (searchTerm !== '' && totalVisible === 0) {
        const content = document.querySelector('.content');
        const noResultsDiv = document.createElement('div');
        noResultsDiv.className = 'no-results-message';
        noResultsDiv.style.cssText = `
            text-align: center;
            padding: 40px;
            color: #666;
            font-size: 18px;
            background: rgba(1, 210, 252, 0.1);
            border-radius: 10px;
            margin: 20px 0;
        `;
        noResultsDiv.innerHTML = `
            <span class="material-symbols-outlined" style="font-size: 48px; color: #01D2FC; display: block; margin-bottom: 16px;">search_off</span>
            No se encontraron streams para "${searchTerm}"
            <br><small style="color: #999; margin-top: 8px; display: block;">Intenta con otro término de búsqueda</small>
        `;
        content.insertBefore(noResultsDiv, content.firstChild);
    }
}

// Función para buscar streams por nombre
function searchStreams() {
    const searchInput = document.getElementById('searchInput');
    const clearBtn = document.getElementById('clearSearchBtn');
    const searchTerm = searchInput.value.toLowerCase().trim();
    const streamCards = document.querySelectorAll('.stream-card');
    const filterItems = document.querySelectorAll('.filter-item');
    const sections = document.querySelectorAll('.category-section');
    
    // Mostrar/ocultar botón de limpiar
    if (searchTerm !== '') {
        clearBtn.style.display = 'flex';
        // Remover filtros activos durante búsqueda
        filterItems.forEach(item => item.classList.remove('active'));
    } else {
        clearBtn.style.display = 'none';
    }
    
    // Filtrar streams por nombre
    streamCards.forEach(card => {
        const streamTitle = card.querySelector('.stream-title').textContent.toLowerCase();
        const streamCategory = card.querySelector('.stream-category').textContent.toLowerCase();
        
        if (searchTerm === '' || streamTitle.includes(searchTerm) || streamCategory.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Mostrar/ocultar secciones según resultados de búsqueda
    let totalVisible = 0;
    sections.forEach(section => {
        const visibleCards = section.querySelectorAll('.stream-card:not([style*="display: none"])');
        if (visibleCards.length > 0) {
            section.style.display = 'block';
            totalVisible += visibleCards.length;
        } else {
            section.style.display = 'none';
        }
    });
    
    // Actualizar títulos de secciones para búsqueda
    updateSectionTitlesForSearch(searchTerm);
    
    // Mostrar mensaje si no hay resultados
    showNoResultsMessage(totalVisible, searchTerm);
}

// Función para manejar la tecla Enter en la búsqueda
function handleSearchKeyPress(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        searchStreams();
    }
}

// Función para limpiar la búsqueda
function clearSearch() {
    const searchInput = document.getElementById('searchInput');
    searchInput.value = '';
    searchStreams();
    // Reactivar filtro "Todos"
    filterByCategory('all');
}

// Función para redirigir a la página de canal para usuarios no registrados
function redirectToChannel() {
    window.location.href = 'canal-display-no-registrado.html';
}

// Inicializar filtro por defecto al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Activar el filtro "Todos" por defecto
    filterByCategory('all');
    
    // Agregar event listeners para las tarjetas de stream
    const streamCards = document.querySelectorAll('.stream-card');
    streamCards.forEach(card => {
        card.addEventListener('click', redirectToChannel);
    });
    
    // Agregar event listeners para los canales en vivo del sidebar
    const sidebarChannels = document.querySelectorAll('.channel');
    sidebarChannels.forEach(channel => {
        channel.addEventListener('click', redirectToChannel);
    });
});

// Cerrar popups al hacer clic fuera de ellos
window.onclick = function(event) {
    const loginPopup = document.getElementById('loginPopup');
    const errorPopup = document.getElementById('errorPopup');
    const signupPopup = document.getElementById('signupPopup');
    const welcomePopup = document.getElementById('welcomePopup');
    const signupErrorPopup = document.getElementById('signupErrorPopup');
    
    if (event.target == loginPopup) {
        closePopup();
    }
    if (event.target == errorPopup) {
        closeErrorPopup();
    }
    if (event.target == signupPopup) {
        closeSignupPopup();
    }
    if (event.target == welcomePopup) {
        closeWelcomePopup();
    }
    if (event.target == signupErrorPopup) {
        closeSignupErrorPopup();
    }
}
