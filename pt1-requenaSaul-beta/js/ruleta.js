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
