// Datos de los canales
const channelData = {
    'PiruleTV': {
        avatar: '/assets/streamer6.png',
        name: 'PiruleTV',
        desc: 'Arte y música en vivo',
        tag: '# Música',
        followers: '15.2K',
        views: '2.8M',
        streams: '340',
        about: 'Creador de contenido enfocado en arte digital y música. Transmite regularmente sesiones de dibujo en vivo y composición musical. Apasionado por el arte conceptual y la música electrónica.',
        schedule: 'Lunes a Viernes: 7:00 PM - 10:00 PM (EST)'
    },
    'ProChonGuE': {
        avatar: '/assets/streamer7.png',
        name: 'ProChonGuE',
        desc: 'PixelArt en vivo',
        tag: '# PixelArt',
        followers: '8.7K',
        views: '1.2M',
        streams: '180',
        about: 'Artista especializado en pixel art. Crea sprites, fondos y animaciones en tiempo real. Enseña técnicas de pixel art y trabaja en proyectos de videojuegos independientes.',
        schedule: 'Martes y Jueves: 6:00 PM - 9:00 PM (EST)'
    },
    'MakaxX': {
        avatar: '/assets/streamer8.png',
        name: 'MakaxX',
        desc: 'Videojuegos en vivo',
        tag: '# Videojuegos',
        followers: '25.1K',
        views: '5.4M',
        streams: '520',
        about: 'Gamer profesional con experiencia en FPS y juegos de estrategia. Participa en torneos y enseña técnicas avanzadas. Especializado en Valorant, CS:GO y League of Legends.',
        schedule: 'Todos los días: 2:00 PM - 8:00 PM (EST)'
    },
    'CoderLive': {
        avatar: '/assets/streamer9.png',
        name: 'CoderLive',
        desc: 'Programación en vivo',
        tag: '# Programación',
        followers: '12.3K',
        views: '3.1M',
        streams: '290',
        about: 'Desarrollador de software con 8 años de experiencia. Programa en vivo proyectos web, móviles y de escritorio. Enseña JavaScript, Python, React y más tecnologías modernas.',
        schedule: 'Lunes, Miércoles y Viernes: 8:00 PM - 11:00 PM (EST)'
    }
};

// Función para abrir el modal
function openModal(channelName) {
    const channel = channelData[channelName];
    if (!channel) return;

    // Actualizar contenido del modal
    document.getElementById('modalAvatar').src = channel.avatar;
    document.getElementById('modalAvatar').alt = channel.name;
    document.getElementById('modalName').textContent = channel.name;
    document.getElementById('modalDesc').textContent = channel.desc;
    document.getElementById('modalTag').textContent = channel.tag;
    document.getElementById('modalFollowers').textContent = channel.followers;
    document.getElementById('modalViews').textContent = channel.views;
    document.getElementById('modalStreams').textContent = channel.streams;
    document.getElementById('modalAbout').textContent = channel.about;
    document.getElementById('modalSchedule').textContent = channel.schedule;

    // Verificar si ya sigue al canal
    const isFollowing = localStorage.getItem(`following_${channelName}`) === 'true';
    const followBtn = document.getElementById('modalFollowBtn');
    followBtn.textContent = isFollowing ? 'Siguiendo' : 'Seguir';
    followBtn.className = isFollowing ? 'modal-follow-btn following' : 'modal-follow-btn';
    followBtn.setAttribute('data-channel', channelName);

    // Mostrar modal
    document.getElementById('channelModal').classList.add('active');
}

// Función para cerrar el modal
function closeModal() {
    document.getElementById('channelModal').classList.remove('active');
}

// Función para seguir/dejar de seguir
function toggleFollow() {
    const followBtn = document.getElementById('modalFollowBtn');
    const channelName = followBtn.getAttribute('data-channel');
    const isFollowing = localStorage.getItem(`following_${channelName}`) === 'true';

    if (isFollowing) {
        localStorage.removeItem(`following_${channelName}`);
        followBtn.textContent = 'Seguir';
        followBtn.className = 'modal-follow-btn';
    } else {
        localStorage.setItem(`following_${channelName}`, 'true');
        followBtn.textContent = 'Siguiendo';
        followBtn.className = 'modal-follow-btn following';
    }
}

// Cerrar modal al hacer clic fuera de él
document.getElementById('channelModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Cerrar modal con la tecla Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Agregar event listeners a los botones "Ver Canal"
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.suggested-btn');
    buttons.forEach((button, index) => {
        const channelNames = ['PiruleTV', 'ProChonGuE', 'MakaxX', 'CoderLive'];
        button.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(channelNames[index]);
        });
    });
});
