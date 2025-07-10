// Selecciona el botón y el input
const btnGuardar = document.querySelector('button');
const inputPortada = document.querySelectorAll('input[type="text"]')[0];
const miniModal = document.getElementById('mini-modal');
const modalBg = document.getElementById('modal-bg');
const cerrarModal = document.getElementById('cerrar-modal');
const modalMsg = document.getElementById('modal-msg');
const modalIcon = document.getElementById('modal-icon');

btnGuardar.addEventListener('click', function(e) {
    const portadaValue = inputPortada.value.trim();
    if (/\.(png|jpg)$/i.test(portadaValue)) {
        // Éxito
        modalMsg.textContent = "Canal actualizado exitosamente";
        modalIcon.textContent = "check";
        modalIcon.style.display = "inline-block";
        miniModal.style.display = 'block';
        modalBg.style.display = 'block';
    } else {
        // Error
        modalMsg.textContent = "Formato no admitido, usa PNG o JPG";
        modalIcon.style.display = "none";
        miniModal.style.display = 'block';
        modalBg.style.display = 'block';
    }
});

cerrarModal.onclick = function() {
    miniModal.style.display = 'none';
    modalBg.style.display = 'none';
};