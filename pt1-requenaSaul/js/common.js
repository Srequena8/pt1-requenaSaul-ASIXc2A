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
