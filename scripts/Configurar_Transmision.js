// Selección de categoría interactiva (todos seleccionados por defecto)
document.querySelectorAll('.categoria-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        this.classList.toggle('selected');
    });
});

// Botón micrófono (activo por defecto)
const btnMic = document.getElementById('btn-mic');
const iconMic = document.getElementById('icon-mic');
let micOn = true;
btnMic.addEventListener('click', function() {
    micOn = !micOn;
    if(micOn) {
        btnMic.classList.add('active');
        iconMic.textContent = 'mic';
        iconMic.classList.remove('off');
        iconMic.classList.add('on');
    } else {
        btnMic.classList.remove('active');
        iconMic.textContent = 'mic_off';
        iconMic.classList.remove('on');
        iconMic.classList.add('off');
    }
});

// Botón cámara (activo por defecto)
const btnCam = document.getElementById('btn-cam');
const iconCam = document.getElementById('icon-cam');
let camOn = true;
btnCam.addEventListener('click', function() {
    camOn = !camOn;
    if(camOn) {
        btnCam.classList.add('active');
        iconCam.textContent = 'videocam';
        iconCam.classList.remove('off');
        iconCam.classList.add('on');
    } else {
        btnCam.classList.remove('active');
        iconCam.textContent = 'videocam_off';
        iconCam.classList.remove('on');
        iconCam.classList.add('off');
    }
});

// Mostrar mini modal al transmitir con validación
const btnTransmitir = document.getElementById('btn-transmitir');
const miniModal = document.getElementById('mini-modal');
const modalBg = document.getElementById('modal-bg');
const mainContent = document.getElementById('main-content');
const titulo = document.getElementById('titulo');
const micInput = document.getElementById('mic-input');
const camInput = document.getElementById('cam-input');
const categorias = document.querySelectorAll('.categoria-btn');
const modalMsg = miniModal.querySelector('div');

btnTransmitir.addEventListener('click', function() {
    // Validar campos de texto
    const tituloOk = titulo.value.trim().length > 0;
    const micOk = micInput.value.trim().length > 0;
    const camOk = camInput.value.trim().length > 0;
    // Validar al menos una categoría seleccionada
    let categoriaOk = false;
    categorias.forEach(btn => {
        if(btn.classList.contains('selected')) categoriaOk = true;
    });

    if (!tituloOk || !micOk || !camOk || !categoriaOk) {
        // Mostrar mensaje de error
        modalMsg.innerHTML = 'Verificar tu configuración técnica antes de transmitir<br>(no seleccionaste un campo)';
        modalMsg.style.color = '#00cfff';
        modalMsg.style.fontSize = '2rem';
        modalMsg.style.fontWeight = 'bold';
        miniModal.querySelector('.material-symbols-outlined').style.display = 'none';
    } else {
        // Mostrar mensaje de éxito
        modalMsg.innerHTML = 'Estás en vivo. ¡Buena suerte!';
        modalMsg.style.color = '#00cfff';
        modalMsg.style.fontSize = '1.1rem';
        modalMsg.style.fontWeight = 'normal';
        miniModal.querySelector('.material-symbols-outlined').style.display = 'inline-block';
    }
    miniModal.style.display = 'block';
    modalBg.style.display = 'block';
    mainContent.style.filter = 'blur(2px)';
});

// Cerrar mini modal
document.getElementById('cerrar-modal').onclick = function() {
    miniModal.style.display = 'none';
    modalBg.style.display = 'none';
    mainContent.style.filter = 'none';
};