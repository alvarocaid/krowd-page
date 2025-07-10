// Modal Vistas
const cuadradoVistas = document.getElementById('cuadrado-vistas');
const modalVistas = document.getElementById('modal-vistas');
const cerrarModalVistas = document.getElementById('cerrar-modal-vistas');

cuadradoVistas.addEventListener('click', () => {
    modalVistas.style.display = 'flex';
    cuadradoVistas.style.background = '#16c4fe';
    cuadradoVistas.style.color = '#222b45';
    cuadradoVistas.querySelector('span').style.color = '#222b45';
});
cerrarModalVistas.addEventListener('click', () => {
    modalVistas.style.display = 'none';
    cuadradoVistas.style.background = '#222b45';
    cuadradoVistas.style.color = '#fff';
    cuadradoVistas.querySelector('span').style.color = '#fff';
});

// Modal Ganancias
const cuadradoGanancias = document.getElementById('cuadrado-ganancias');
const modalGanancias = document.getElementById('modal-ganancias');
const cerrarModalGanancias = document.getElementById('cerrar-modal-ganancias');

cuadradoGanancias.addEventListener('click', () => {
    modalGanancias.style.display = 'flex';
    cuadradoGanancias.style.background = '#16c4fe';
    cuadradoGanancias.style.color = '#222b45';
    cuadradoGanancias.querySelector('span').style.color = '#222b45';
});
cerrarModalGanancias.addEventListener('click', () => {
    modalGanancias.style.display = 'none';
    cuadradoGanancias.style.background = '#222b45';
    cuadradoGanancias.style.color = '#fff';
    cuadradoGanancias.querySelector('span').style.color = '#fff';
});

// Modal Graficas
const cuadradoGraficas = document.getElementById('cuadrado-graficas');
const modalGraficas = document.getElementById('modal-graficas');
const cerrarModalGraficas = document.getElementById('cerrar-modal-graficas');

cuadradoGraficas.addEventListener('click', () => {
    modalGraficas.style.display = 'flex';
    cuadradoGraficas.style.background = '#16c4fe';
    cuadradoGraficas.style.color = '#222b45';
    cuadradoGraficas.querySelector('span').style.color = '#222b45';
    // Inicializar la gráfica solo si no existe
    if (!window.graficaModalInicializada) {
        const labels = ['Minecraft', 'Valorant', 'GTA V', 'LoL'];
        const views = [600, 400, 200, 150];
        const ctx = document.getElementById('chart-graficas').getContext('2d');
        window.graficaModalInicializada = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Views',
                    data: views,
                    backgroundColor: [
                        '#16c4fe',
                        '#ff4655',
                        '#43a047',
                        '#8c52ff'
                    ],
                    borderColor: [
                        '#0e7ca6',
                        '#b32b37',
                        '#2e7031',
                        '#5e3799'
                    ],
                    borderWidth: 2,
                    borderRadius: 12
                }]
            },
            options: {
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: {
                        ticks: { color: '#fff', font: { size: 20 } }
                    },
                    y: {
                        beginAtZero: true,
                        min: 0,
                        max: 600,
                        ticks: {
                            color: '#fff',
                            font: { size: 20 },
                            stepSize: 100
                        },
                        grid: {
                            color: 'rgba(255,255,255,0.1)',
                            drawBorder: false
                        }
                    }
                }
            }
        });
    }
});
cerrarModalGraficas.addEventListener('click', () => {
    modalGraficas.style.display = 'none';
    cuadradoGraficas.style.background = '#222b45';
    cuadradoGraficas.style.color = '#fff';
    cuadradoGraficas.querySelector('span').style.color = '#fff';
});
