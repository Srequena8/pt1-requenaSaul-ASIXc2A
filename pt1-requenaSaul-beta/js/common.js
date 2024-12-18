document.getElementById('goRuleta').addEventListener('click', () => loadTool('ruleta'));
document.getElementById('goTemporitzador').addEventListener('click', () => loadTool('temporitzador'));

function loadTool(tool) {
    const container = document.getElementById('toolContainer');
    container.innerHTML = ''; // Limpiar el contenido anterior
    if (tool === 'ruleta') {
        loadRuleta(container);
    } else if (tool === 'temporitzador') {
        loadTemporitzador(container);
    }
}
function loadRuleta(container) {
    container.innerHTML = `
        <h2>Ruleta de Noms</h2>
        <button id="loadNamesBtn">Carregar Noms</button>
        <button id="spinWheelBtn">Girar Ruleta</button>
        <div id="wheel"></div>
        <p id="selectedName">Nom seleccionat: <span></span></p>
    `;

    document.getElementById('loadNamesBtn').addEventListener('click', async () => {
        const response = await fetch('data/noms.txt');
        const names = await response.text();
        localStorage.setItem('names', JSON.stringify(names.split('\n')));
        alert('Noms carregats correctament!');
    });

    document.getElementById('spinWheelBtn').addEventListener('click', () => {
        const names = JSON.parse(localStorage.getItem('names') || '[]');
        if (names.length === 0) return alert('Carrega primer els noms!');
        const randomIndex = Math.floor(Math.random() * names.length);
        document.querySelector('#selectedName span').textContent = names[randomIndex];
    });
}
function loadTemporitzador(container) {
    container.innerHTML = `
        <h2>Rellotge Temporitzador</h2>
        <div id="clock"></div>
        <input type="time" id="endTimeInput">
        <input type="number" id="countdownMinutes" placeholder="Minuts per a la tasca">
        <button id="startTimerBtn">Inicia Temporitzador</button>
    `;

    setInterval(() => {
        const now = new Date();
        document.getElementById('clock').textContent = now.toLocaleTimeString();
    }, 1000);

    document.getElementById('startTimerBtn').addEventListener('click', () => {
        const endTimeInput = document.getElementById('endTimeInput').value;
        const countdownMinutes = parseInt(document.getElementById('countdownMinutes').value, 10);

        let endTime;
        if (endTimeInput) {
            endTime = new Date(`1970-01-01T${endTimeInput}`);
        } else if (!isNaN(countdownMinutes)) {
            endTime = new Date(Date.now() + countdownMinutes * 60000);
        } else {
            return alert('Especifica l\'hora o el compte enrere!');
        }

        const interval = setInterval(() => {
            const diff = endTime - new Date();
            if (diff <= 0) {
                clearInterval(interval);
                alert('Temps finalitzat!');
            }
        }, 1000);
    });
}
