const form = document.getElementById('reportForm');
const popup = document.getElementById('report-popup');
const backdrop = document.getElementById('popup-backdrop');
const input = form.querySelector('.report-input');
const popupMessage = document.getElementById('popup-message');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value.trim() === '') {
        showPopup(
            `<span class="popup-title popup-error">Usted hizo entrega de un formulario vacio.</span><br>
            <span class="popup-error">Porfavor, agregue una sencilla descripción si tuvo algun incoveniente</span>`
        );
    } else {
        showPopup(
            `<span class="popup-title">Usted hizo entrega de un reporte</span><br>
            ¡Agradecemos su feedback!`
        );
        input.value = '';
    }
});

function showPopup(message) {
    popupMessage.innerHTML = message;
    popup.style.display = 'flex';
    backdrop.style.display = 'block';
}

function closePopup() {
    popup.style.display = 'none';
    backdrop.style.display = 'none';
}