const form = document.getElementById('reportForm');
const popup = document.getElementById('report-popup');
const backdrop = document.getElementById('popup-backdrop');
const input = form.querySelector('.report-input');
const popupMessage = document.getElementById('popup-message');
const lastReportsList = document.getElementById('lastReportsList');

// Lista para almacenar los últimos 3 problemas (solo textos)
let lastReports = [
    "No puedo iniciar sesión en mi cuenta",
    "El chat no carga correctamente",
    "No se guardan los cambios de perfil"
];

// Renderiza la lista de problemas con estados fijos y orden fijo
function renderLastReports() {
    lastReportsList.innerHTML = "";
    const estados = ["pending", "rejected", "done"];
    const etiquetas = ["Pendiente", "Rechazado", "Realizado"];
    for (let i = 0; i < 3; i++) {
        if (lastReports[i]) {
            const div = document.createElement('div');
            div.className = 'last-report';
            div.innerHTML = `
                <div class="report-text">${lastReports[i]}</div>
                <div class="report-status ${estados[i]}">${etiquetas[i]}</div>
            `;
            lastReportsList.appendChild(div);
        }
    }
}

// Inicializa la lista al cargar
renderLastReports();

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const value = input.value.trim();
    if (value === '') {
        showPopup(
            `<span class="popup-title popup-error">Usted hizo entrega de un formulario vacio.</span><br>
            <span class="popup-error">Porfavor, agregue una sencilla descripción si tuvo algun incoveniente</span>`
        );
    } else {
        // Agrega el nuevo problema al inicio de la lista
        lastReports.unshift(value);
        // Mantén solo los 3 más recientes
        lastReports = lastReports.slice(0, 3);
        renderLastReports();
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