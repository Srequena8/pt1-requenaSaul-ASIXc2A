document.getElementById('goRuleta').addEventListener('click', () => ruletaDeNoms(document.getElementById('toolContainer')));
document.getElementById('goTemporitzador').addEventListener('click', () => loadTemporizador(document.getElementById('toolContainer')));

function ruletaDeNoms(container) {
    container.innerHTML = `
        <h2>Ruleta de Noms</h2>
        <div class="ruleta-container" style="position: relative; width: 500px; height: 500px;">
            <canvas id="wheel" width="500" height="500"></canvas>
            <!-- Flecha apuntando hacia abajo -->
            <div class="flecha" style="position: absolute; top: 250px; left: 110%; transform: translateX(-50%) rotate(90deg); width: 0; height: 0; border-left: 15px solid transparent; border-right: 15px solid transparent; border-top: 25px solid #FF5733;"></div>
        </div>
        <button id="spinWheelBtn">Girar Ruleta</button>
        <p id="selectedName">Nom seleccionat: <span></span></p>
    `;

    const canvas = document.getElementById('wheel');
    const ctx = canvas.getContext('2d');
    const spinButton = document.getElementById('spinWheelBtn');
    const selectedNameDiv = document.getElementById('selectedName').querySelector('span');
    const noms = ['Ava', 'Sophia', 'William', 'Mason', 'Emily', 'Michael', 'Emma', 'Olivia', 'Jacob', 'Benjamin'];
    const spinSound = new Audio('https://www.soundjay.com/button/beep-07.wav'); // Sonido para la ruleta
    let angleActual = 0;
    let girant = false;

    // Dibujar la ruleta
    function dibuixaRuleta() {
        const numNoms = noms.length;
        const anglePas = (2 * Math.PI) / numNoms;

        for (let i = 0; i < numNoms; i++) {
            const angle = i * anglePas;

            // Dibujar el segmento
            ctx.beginPath();
            ctx.moveTo(250, 250);
            ctx.arc(250, 250, 250, angle, angle + anglePas);
            ctx.closePath();
            ctx.fillStyle = i % 2 === 0 ? '#FFDDC1' : '#FFABAB';
            ctx.fill();

            // Añadir el texto
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

    // Girar la ruleta
    function giraRuleta() {
        if (girant) return;
        girant = true;
        spinSound.play();

        const tempsGir = 3000; // Tiempo total en ms
        const inici = Date.now();
        const rotacionsCompletas = 5; // Número de rotaciones completas antes de parar
        const angleFinal = Math.random() * 360; // Ángulo aleatorio final

        function anima() {
            const tempsTranscorregut = Date.now() - inici;
            const tempsRestant = tempsGir - tempsTranscorregut;

            if (tempsTranscorregut < tempsGir) {
                const velocitatActual = 20 * (tempsRestant / tempsGir); // Desaceleración
                angleActual += velocitatActual;
                angleActual %= 360;
                renderitza();
                requestAnimationFrame(anima);
            } else {
                angleActual = (rotacionsCompletas * 360 + angleFinal) % 360;
                alignaNomAmbFlecha(); // Alinear el nombre seleccionado con la flecha
                girant = false;
            }
        }
        anima();
    }

    // Alinear el nombre seleccionado con la flecha
    function alignaNomAmbFlecha() {
        const numNoms = noms.length;
        const anglePorNombre = 360 / numNoms;
        const indiceSeleccionado = Math.floor(((360 - angleActual) / anglePorNombre) % numNoms);

        // Calcular el ángulo final para alinear el nombre seleccionado
        const ajusteAngulo = (indiceSeleccionado + 0.5) * anglePorNombre; // Centrar el segmento bajo la flecha
        angleActual = 360 - ajusteAngulo;
        angleActual %= 360;

        renderitza(); // Renderizar la ruleta ajustada
        const nombreSeleccionado = noms[indiceSeleccionado];
        selectedNameDiv.textContent = nombreSeleccionado;
    }

    // Renderizar la ruleta
    function renderitza() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(250, 250);document.getElementById('goRuleta').addEventListener('click', () => ruletaDeNoms(document.getElementById('toolContainer')));
        document.getElementById('goTemporitzador').addEventListener('click', () => loadTemporizador(document.getElementById('toolContainer')));
        
        async function ruletaDeNoms(container) {
            container.innerHTML = `
                <h2>Ruleta de Noms</h2>
                <div class="ruleta-container" style="position: relative; width: 500px; height: 500px;">
                    <canvas id="wheel" width="500" height="500"></canvas>
                    <!-- Flecha apuntando hacia abajo -->
                    <div class="flecha" style="position: absolute; top: 250px; left: 110%; transform: translateX(-50%) rotate(90deg); width: 0; height: 0; border-left: 15px solid transparent; border-right: 15px solid transparent; border-top: 25px solid #FF5733;"></div>
                </div>
                <button id="spinWheelBtn">Girar Ruleta</button>
                <p id="selectedName">Nom seleccionat: <span></span></p>
            `;
        
            const canvas = document.getElementById('wheel');
            const ctx = canvas.getContext('2d');
            const spinButton = document.getElementById('spinWheelBtn');
            const selectedNameDiv = document.getElementById('selectedName').querySelector('span');
            const spinSound = new Audio('https://www.soundjay.com/button/beep-07.wav'); // Sonido para la ruleta
            let noms = [];
            let angleActual = 0;
            let girant = false;
        
            try {
                // Cargar nombres desde un archivo JSON
                const response = await fetch('nombres.json');
                const data = await response.json();
                noms = data.nombres;
            } catch (error) {
                console.error('Error cargando los nombres:', error);
                noms = ['Error', 'Cargando']; // Nombres de fallback en caso de error
            }
        
            // Dibujar la ruleta
            function dibuixaRuleta() {
                const numNoms = noms.length;
                const anglePas = (2 * Math.PI) / numNoms;
        
                for (let i = 0; i < numNoms; i++) {
                    const angle = i * anglePas;
        
                    // Dibujar el segmento
                    ctx.beginPath();
                    ctx.moveTo(250, 250);
                    ctx.arc(250, 250, 250, angle, angle + anglePas);
                    ctx.closePath();
                    ctx.fillStyle = i % 2 === 0 ? '#FFDDC1' : '#FFABAB';
                    ctx.fill();
        
                    // Añadir el texto
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
        
            // Girar la ruleta
            function giraRuleta() {
                if (girant) return;
                girant = true;
                spinSound.play();
        
                const tempsGir = 3000; // Tiempo total en ms
                const inici = Date.now();
                const rotacionsCompletas = 5; // Número de rotaciones completas antes de parar
                const angleFinal = Math.random() * 360; // Ángulo aleatorio final
        
                function anima() {
                    const tempsTranscorregut = Date.now() - inici;
                    const tempsRestant = tempsGir - tempsTranscorregut;
        
                    if (tempsTranscorregut < tempsGir) {
                        const velocitatActual = 20 * (tempsRestant / tempsGir); // Desaceleración
                        angleActual += velocitatActual;
                        angleActual %= 360;
                        renderitza();
                        requestAnimationFrame(anima);
                    } else {
                        angleActual = (rotacionsCompletas * 360 + angleFinal) % 360;
                        alignaNomAmbFlecha(); // Alinear el nombre seleccionado con la flecha
                        girant = false;
                    }
                }
                anima();
            }
        
            // Alinear el nombre seleccionado con la flecha
            function alignaNomAmbFlecha() {
                const numNoms = noms.length;
                const anglePorNombre = 360 / numNoms;
                const indiceSeleccionado = Math.floor(((360 - angleActual) / anglePorNombre) % numNoms);
        
                // Calcular el ángulo final para alinear el nombre seleccionado
                const ajusteAngulo = (indiceSeleccionado + 0.5) * anglePorNombre; // Centrar el segmento bajo la flecha
                angleActual = 360 - ajusteAngulo;
                angleActual %= 360;
        
                renderitza(); // Renderizar la ruleta ajustada
                const nombreSeleccionado = noms[indiceSeleccionado];
                selectedNameDiv.textContent = nombreSeleccionado;
            }
        
            // Renderizar la ruleta
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
            renderitza(); // Inicializar la ruleta
        }
        
        function loadTemporizador(container) {
            container.innerHTML = `
                <h2>Rellotge Temporitzador</h2>
                <p>Introdueix el temps en segons:</p>
                <input type="number" id="timeInput" min="1" placeholder="Temps en segons">
                <button id="startTimer">Iniciar Temporitzador</button>
                <h3 id="timerDisplay">00:00</h3>
                <p id="currentTime">Hora actual: <span></span></p>
            `;
        
            let timerInterval;
            let clockInterval;
        
            const currentTimeSpan = document.getElementById('currentTime').querySelector('span');
        
            // Actualizar la hora en tiempo real
            function updateClock() {
                const now = new Date();
                const hours = String(now.getHours()).padStart(2, '0');
                const minutes = String(now.getMinutes()).padStart(2, '0');
                const seconds = String(now.getSeconds()).padStart(2, '0');
                currentTimeSpan.textContent = `${hours}:${minutes}:${seconds}`;
            }
        
            // Iniciar la actualización de la hora
            clockInterval = setInterval(updateClock, 1000);
            updateClock();
        
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
        
        ctx.rotate((angleActual * Math.PI) / 180);
        ctx.translate(-250, -250);
        dibuixaRuleta();
        ctx.restore();
    }

    spinButton.addEventListener('click', giraRuleta);
    renderitza(); // Inicializar la ruleta
}

function loadTemporizador(container) {
    container.innerHTML = `
        <h2>Rellotge Temporitzador</h2>
        <p>Introdueix el temps en segons:</p>
        <input type="number" id="timeInput" min="1" placeholder="Temps en segons">
        <button id="startTimer">Iniciar Temporitzador</button>
        <h3 id="timerDisplay">00:00</h3>
        <p id="currentTime">Hora actual: <span></span></p>
    `;

    let timerInterval;
    let clockInterval;

    const currentTimeSpan = document.getElementById('currentTime').querySelector('span');

    // Actualizar la hora en tiempo real
    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        currentTimeSpan.textContent = `${hours}:${minutes}:${seconds}`;
    }

    // Iniciar la actualización de la hora
    clockInterval = setInterval(updateClock, 1000);
    updateClock();

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
