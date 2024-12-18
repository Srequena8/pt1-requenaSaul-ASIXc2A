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
