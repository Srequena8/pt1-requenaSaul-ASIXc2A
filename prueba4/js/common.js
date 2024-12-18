document.getElementById('goRuleta').addEventListener('click', () => ruletaDeNoms(document.getElementById('toolContainer')));
document.getElementById('goTemporitzador').addEventListener('click', () => loadTemporizador(document.getElementById('toolContainer')));

function ruletaDeNoms(container) {
    container.innerHTML = `
        <h2>Ruleta de Noms</h2>
        <div class="ruleta-container">
            <canvas id="wheel" width="500" height="500"></canvas>
            <div class="flecha"></div>
        </div>
        <button id="spinWheelBtn">Girar Ruleta</button>
        <p id="selectedName">Nom seleccionat: <span></span></p>
    `;

    const canvas = document.getElementById('wheel');
    const ctx = canvas.getContext('2d');
    const spinButton = document.getElementById('spinWheelBtn');
    const selectedNameDiv = document.getElementById('selectedName').querySelector('span');
    const noms = ['Ava', 'Sophia', 'William', 'Mason', 'Emily', 'Michael', 'Emma', 'Olivia', 'Jacob', 'Benjamin'];
    const spinSound = new Audio('https://www.soundjay.com/button/beep-07.wav'); // So per la ruleta
    let angleActual = 0;
    let girant = false;

    // Dibuixar la ruleta
    function dibuixaRuleta() {
        const numNoms = noms.length;
        const anglePas = (2 * Math.PI) / numNoms;

        for (let i = 0; i < numNoms; i++) {
            const angle = i * anglePas;

            // Dibuixar el segment
            ctx.beginPath();
            ctx.moveTo(250, 250);
            ctx.arc(250, 250, 250, angle, angle + anglePas);
            ctx.closePath();
            ctx.fillStyle = i % 2 === 0 ? '#FFDDC1' : '#FFABAB';
            ctx.fill();
            
            // Afegir el text
            ctx.save();
            ctx.translate(250, 250);
            ctx.rotate(angle + anglePas / 2);
            ctx.textAlign = 'right';
            ctx.fillStyle = '#333';
            ctx.font = '18px Arial';
            ctx.fillText(noms[i], 230, 10);
            ctx.restore();
        }
    }

    // Fer girar la ruleta
    function giraRuleta() {
        if (girant) return;
        girant = true;
        spinSound.play();

        const tempsGir = 3000; // Temps total en ms
        const inici = Date.now();
        const velocitatInicial = 20;

        function anima() {
            const tempsTranscorregut = Date.now() - inici;

            if (tempsTranscorregut < tempsGir) {
                angleActual += velocitatInicial - (tempsTranscorregut / 100); // Redueix la velocitat
                angleActual %= 360;
                renderitza();
                requestAnimationFrame(anima);
            } else {
                girant = false;
                seleccionaNom();
            }
        }
        anima();
    }

    // Mostrar el nom seleccionat
    function seleccionaNom() {
        const numNoms = noms.length;
        const anglePerNom = 360 / numNoms;
        const indexSeleccionat = Math.floor(((360 - (angleActual % 360)) / anglePerNom) % numNoms);
        selectedNameDiv.textContent = noms[indexSeleccionat];
    }

    // Renderitza la ruleta
    function renderitza() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(250, 250);
        ctx.rotate((angleActual * Math.PI) / 180);
        ctx.translate(-250, -250);
        dibuixaRuleta();
        ctx.restore();
    }

    spinButton.addEventListener('click', giraRuleta);
    renderitza(); // Inicialitza la ruleta
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
