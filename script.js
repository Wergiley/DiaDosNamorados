document.addEventListener('DOMContentLoaded', () => {

    // Banco de Imagens PNG para os efeitos
    const pngItems = [
        'img/petalas-rosa.png',
        'img/petalas-girassol.png',
        'img/coracao-turquesa.png',
        'img/coracao.png'
    ];

    // === 1. EFEITO DE FUNDO CONTÍNUO (PNGs Flutuantes) ===
    const createFloatingElement = () => {
        const img = document.createElement('img');
        img.classList.add('floating-png-item');
        
        // Sorteia o arquivo PNG do fundo
        img.src = pngItems[Math.floor(Math.random() * pngItems.length)];
        img.style.left = Math.random() * 100 + 'vw';
        
        const size = Math.random() * 20 + 20; // tamanho entre 20px e 40px
        img.style.width = `${size}px`;
        img.style.height = `${size}px`;
        
        const duration = Math.random() * 6 + 6; // tempo de subida
        img.style.animationDuration = `${duration}s`;
        
        document.body.appendChild(img);
        setTimeout(() => { img.remove(); }, duration * 1000);
    };
    setInterval(createFloatingElement, 500);

   // === 2. INTERAÇÃO DO ENVELOPE + EXPLOSÃO MÁGICA + MÚSICA ===
    const envelopeWrapper = document.getElementById('envelopeWrapper');
    const backgroundMusic = document.getElementById('background-music'); // Captura a música
    let isOpened = false;
    
    document.addEventListener('click', (e) => {
        if (envelopeWrapper.classList.contains('open')) return;

        if (e.target.classList.contains('envelope-lacre-btn') || e.target.closest('.envelope-lacre-btn')) {
            
            // MÁGICA DA MÚSICA: Dá o play no áudio assim que o lacre é clicado
            if (backgroundMusic) {
                backgroundMusic.volume = 0.5; // Define o volume em 50% para não começar estourado
                backgroundMusic.play().catch(error => {
                    console.log("O navegador bloqueou o autoplay inicial:", error);
                });
            }

            // Ativa as classes CSS de abertura
            envelopeWrapper.classList.add('open');
            
            // Dispara a explosão de amor!
            if (!isOpened) {
                createExplosion(e.pageX, e.pageY);
                isOpened = true;
            }
        }
    });
    // === 3. EFEITO DE CLIQUE TRADICIONAL NAS OUTRAS PARTES DA TELA ===
    document.addEventListener('click', (e) => {
        if (e.target.closest('#envelopeWrapper') && !envelopeWrapper.classList.contains('open')) return;
        if (e.target.closest('.letter-card-interactive')) return;

        const img = document.createElement('img');
        img.classList.add('click-png-item');
        img.src = pngItems[Math.floor(Math.random() * pngItems.length)];
        
        img.style.left = `${e.pageX}px`;
        img.style.top = `${e.pageY}px`;
        
        const size = Math.random() * 10 + 25;
        img.style.width = `${size}px`;
        img.style.height = `${size}px`;
        
        document.body.appendChild(img);
        setTimeout(() => { img.remove(); }, 1200);
    });
});