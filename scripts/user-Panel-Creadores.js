function editarTexto(btn) {
    // Busca el span de texto dentro de la tarjeta
    const card = btn.closest('.card');
    const span = card.querySelector('span');
    if (!span) return;

    // Si ya hay un textarea, no hacer nada
    if (card.querySelector('textarea')) return;

    // Crear textarea con el texto actual
    const textarea = document.createElement('textarea');
    textarea.value = span.innerText;
    textarea.style.width = '100%';
    textarea.style.height = '300px';
    textarea.style.marginTop = '10px';
    textarea.style.fontSize = '15px';
    textarea.style.borderRadius = '8px';
    textarea.style.padding = '8px';
    textarea.style.boxSizing = 'border-box';

    // Botón para guardar
    const guardarBtn = document.createElement('button');
    guardarBtn.textContent = 'Guardar';
    guardarBtn.style.margin = '10px 8px 0 0';
    guardarBtn.style.background = '#16c4fe';
    guardarBtn.style.color = '#fff';
    guardarBtn.style.border = 'none';
    guardarBtn.style.borderRadius = '6px';
    guardarBtn.style.padding = '8px 18px';
    guardarBtn.style.fontWeight = 'bold';
    guardarBtn.style.cursor = 'pointer';

    // Botón para cancelar
    const cancelarBtn = document.createElement('button');
    cancelarBtn.textContent = 'Cancelar';
    cancelarBtn.style.margin = '10px 0 0 0';
    cancelarBtn.style.background = '#aaa';
    cancelarBtn.style.color = '#23272f';
    cancelarBtn.style.border = 'none';
    cancelarBtn.style.borderRadius = '6px';
    cancelarBtn.style.padding = '8px 18px';
    cancelarBtn.style.fontWeight = 'bold';
    cancelarBtn.style.cursor = 'pointer';

    // Contenedor para los botones
    const btnContainer = document.createElement('div');
    btnContainer.style.display = 'flex';
    btnContainer.style.justifyContent = 'flex-end';
    btnContainer.appendChild(guardarBtn);
    btnContainer.appendChild(cancelarBtn);

    // Oculta el span y muestra el textarea y botones
    span.style.display = 'none';
    card.insertBefore(textarea, btn.nextSibling);
    card.insertBefore(btnContainer, textarea.nextSibling);

    guardarBtn.onclick = function() {
        span.innerText = textarea.value;
        span.style.display = '';
        textarea.remove();
        btnContainer.remove();
    };
    cancelarBtn.onclick = function() {
        span.style.display = '';
        textarea.remove();
        btnContainer.remove();
    };
}

// Ir al panel de Gestor del Stream al hacer click
document.addEventListener('DOMContentLoaded', function() {
    var gestorBtn = document.getElementById('gestor-stream-btn');
    if (gestorBtn) {
        gestorBtn.addEventListener('click', function() {
            window.location.href = 'Gestor-del-Stream.html';
        });
    }
});
