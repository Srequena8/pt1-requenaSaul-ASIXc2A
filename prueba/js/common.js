document.getElementById('goRuleta').addEventListener('click', () => loadRuleta(document.getElementById('toolContainer')));
document.getElementById('goTemporitzador').addEventListener('click', () => loadTemporizador(document.getElementById('toolContainer')));

function loadRuleta(container) {
    container.innerHTML = `
        <h2>Ruleta de Noms</h2>
        <div class="ruleta-container">
            <div id="ruleta" class="ruleta"></div>
            <div class="flecha"></div>
        </div>
        <button id="spinWheelBtn">Girar Ruleta</button>
        <p id="selectedName">Nom seleccionat: <span></span></p>
    `;

    const names = ["Anna", "Joan", "Maria", "Pere", "Laura", "Toni"];
    const numSegments = names.length;
    const segmentAngle = 360 / numSegments;
    const ruleta = document.getElementById('ruleta');

    // Generar segmentos
    ruleta.innerHTML = names.map((name, i) => `
        <div class="segment" style="transform: rotate(${i * segmentAngle}deg)">
            <span style="transform: rotate(${segmentAngle / 2}deg)">${name}</span>
        </div>
    `).join('');

    // Girar ruleta
    document.getElementById('spinWheelBtn').addEventListener('click', () => {
        const randomIndex = Math.floor(Math.random() * names.length);
        const angle = 360 * 5 + randomIndex * segmentAngle;
        ruleta.style.transition = 'transform 4s ease-out';
        ruleta.style.transform = `rotate(${angle}deg)`;

        setTimeout(() => {
            document.querySelector('#selectedName span').textContent = names[randomIndex];
            ruleta.style.transition = 'none';
            ruleta.style.transform = `rotate(${randomIndex * segmentAngle}deg)`;
        }, 4000);
    });
}

function loadTemporizador(container) {
    container.innerHTML = `
        <h2>Rellotge Temporitzador</h2>
        <p>Introdueix el temps en segons:</p>
        <input type="number" id="timeInput" min="1" placeholder="Temps en segons">
        <button id="startTimer">Iniciar Temporitzador</button>
        <h3 id="timerDisplay">00:00</h3>
    `;

    let timerInterval;

    document.getElementById('startTimer').addEventListener('click', () => {
        clearInterval(timerInterval);
        let timeLeft = parseInt(document.getElementById('timeInput').value) || 0;

        const timerDisplay = document.getElementById('timerDisplay');
        timerDisplay.textContent = formatTime(timeLeft);

        timerInterval = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = formatTime(timeLeft);

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                alert("Temps finalitzat!");
            }
        }, 1000);
    });

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
}
