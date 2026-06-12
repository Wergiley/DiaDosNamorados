document.addEventListener('DOMContentLoaded', () => {

    // Banco de Imagens PNG para os efeitos
    const pngItems = [
        'img/petalas-rosa.webp',
        'img/petalas-girassol.webp',
        'img/coracao-turquesa.webp',
        'img/coracao.webp'
    ];

    const envelopeWrapper = document.getElementById('envelopeWrapper');
    const envelopeImg = document.querySelector('.envelope-img-bg'); // Captura a imagem do envelope
    const backgroundMusic = document.getElementById('background-music');
    let isOpened = false;

    // Caminhos das imagens do seu envelope (Ajuste os nomes se forem diferentes)
    const imagemEnvelopeFechado = 'img/envelope-antigo.webp';
    const imagemEnvelopeAberto = 'img/envelope-aberto.webp';

    // === 1. EFEITO DE FUNDO CONTÍNUO (PNGs Flutuantes) ===
    const createFloatingElement = () => {
        const img = document.createElement('img');
        img.classList.add('floating-png-item');
        
        img.src = pngItems[Math.floor(Math.random() * pngItems.length)];
        img.style.left = Math.random() * 100 + 'vw';
        
        const size = Math.random() * 20 + 20; 
        img.style.width = `${size}px`;
        img.style.height = `${size}px`;
        
        const duration = Math.random() * 6 + 6; 
        img.style.animationDuration = `${duration}s`;
        
        document.body.appendChild(img);
        setTimeout(() => { img.remove(); }, duration * 1000);
    };
    setInterval(createFloatingElement, 500);

    // === SYSTEM: SISTEMA DE EXPLOSÃO EMBUTIDO INTEGRADO ===
    const launchExplosionParticles = (clickX, clickY) => {
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('img');
            particle.src = pngItems[Math.floor(Math.random() * pngItems.length)];
            particle.classList.add('click-png-item');
            
            particle.style.left = `${clickX}px`;
            particle.style.top = `${clickY}px`;
            
            const size = Math.random() * 15 + 20;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 120 + 50;
            const moveX = Math.cos(angle) * distance;
            const moveY = Math.sin(angle) * distance;
            
            particle.style.setProperty('--x', `${moveX}px`);
            particle.style.setProperty('--y', `${moveY}px`);
            particle.style.animation = 'explosionEffect 1.5s ease-out forwards';
            
            document.body.appendChild(particle);
            setTimeout(() => { particle.remove(); }, 1500);
        }
    };

    // === 2. GERENCIADOR DE INTERAÇÃO (TROCA DE IMAGEM INCLUÍDA) ===
    document.addEventListener('click', (e) => {
        
        const clicouNoLacre = e.target.classList.contains('envelope-lacre-btn') || e.target.closest('.envelope-lacre-btn');

        // SE A CARTA ESTIVER FECHADA e houver o clique no lacre -> ABRE
        if (!envelopeWrapper.classList.contains('open') && clicouNoLacre) {
            
            if (backgroundMusic) {
                backgroundMusic.volume = 0.5;
                backgroundMusic.play().catch(error => console.log("Permissão de áudio:", error));
            }

            // MÁGICA VISUAL: Troca a imagem para o envelope aberto
            if (envelopeImg) {
                envelopeImg.src = imagemEnvelopeAberto;
            }

            envelopeWrapper.classList.add('open');
            
            if (!isOpened) {
                launchExplosionParticles(e.pageX, e.pageY);
                isOpened = true;
            }
            return; 
        }

        // SE A CARTA JÁ ESTIVER ABERTA
        if (envelopeWrapper.classList.contains('open')) {
            // Se o clique foi dentro do papel da carta, ignora para deixar ler/rolar
            if (e.target.closest('.letter-card-interactive')) {
                return;
            }
            
            // MÁGICA VISUAL RETRÔ: Volta a imagem para o envelope fechado ao clicar fora
            if (envelopeImg) {
                envelopeImg.src = imagemEnvelopeFechado;
            }
            // SE A CARTA JÁ ESTIVER ABERTA
        if (envelopeWrapper.classList.contains('open')) {
            // Se o clique foi dentro do papel da carta, ignora para deixar ler/rolar
            if (e.target.closest('.letter-card-interactive')) {
                return;
            }
            // Se clicou em qualquer outro lugar fora da carta, FECHA suavemente
            envelopeWrapper.classList.remove('open');
            
            // >>> ADICIONE APENAS ESSA LINHA ABAIXO <<<
            isOpened = false; 

            return;
        }
            envelopeWrapper.classList.remove('open');
            return;
        }

        // === 3. SE O ENVELOPE ESTIVER FECHADO E CLICAR NO FUNDO ===
        if (!clicouNoLacre && !e.target.closest('#envelopeWrapper')) {
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
        }
    });
});