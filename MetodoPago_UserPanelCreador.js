// Toggle de Reward Ads (si existe en este panel)
const toggle = document.getElementById('rewardToggle');
const statusMessage = document.getElementById('statusMessage');

if (toggle && statusMessage) {
    toggle.addEventListener('change', function() {
        if (this.checked) {
            statusMessage.className = 'green-text';
            statusMessage.textContent = 'Recibiras ingresos en el apartado de analisis';
        } else {
            statusMessage.className = 'error-text';
            statusMessage.textContent = 'No recibiras ingresos';
        }
    });
}

// Validación del formulario de método de pago
const form = document.querySelector('.main-content form');
if (form) {
    const inputs = form.querySelectorAll('input[type="text"]');
    const button = form.querySelector('button[type="submit"]');

    // Crea el mensaje si no existe
    let msg = document.createElement('span');
    msg.style.display = "none";
    msg.style.marginLeft = "16px";
    msg.style.verticalAlign = "middle";
    form.appendChild(msg);

    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Evita recargar la página
        let allFilled = true;
        inputs.forEach(input => {
            if (input.value.trim().length < 1) {
                allFilled = false;
            }
        });
        if (allFilled) {
            msg.textContent = "Método de pago registrado exitosamente. Ya puedes recibir tus ingresos.";
            msg.style.color = "limegreen";
            msg.style.display = "inline-block";
        } else {
            msg.textContent = "Verifica los datos ingresados";
            msg.style.color = "crimson";
            msg.style.display = "inline-block";
        }
    });
}