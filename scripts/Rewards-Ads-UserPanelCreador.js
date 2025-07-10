const toggle = document.getElementById('rewardToggle');
const statusMessage = document.getElementById('statusMessage');

toggle.addEventListener('change', function() {
    if (this.checked) {
        statusMessage.className = 'green-text';
        statusMessage.textContent = 'Recibiras ingresos en el apartado de analisis';
    } else {
        statusMessage.className = 'error-text';
        statusMessage.textContent = 'No recibiras ingresos';
    }
});