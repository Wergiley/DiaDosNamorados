document.addEventListener('DOMContentLoaded', () => {

    // Banco de Imagens PNG para os efeitos
    const pngItems = [
        'imagens/girassol-decorativo.png',
        'imagens/coracao-turquesa.png',
        'imagens/coracao-rosa.png'
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

    // === 2. INTERAÇÃO DO ENVELOPE + EXPLOSÃO MÁGICA ===
    const envelopeWrapper = document.getElementById('envelopeWrapper');
    let isOpened = false;
    
    // Escutamos o clique de forma global na página
    document.addEventListener('click', (e) => {
        // Se o envelope já estiver aberto, não faz nada
        if (envelopeWrapper.classList.contains('open')) return;

        // VERIFICAÇÃO DE SEGURANÇA MÁXIMA: Só avança se o alvo exato do clique for o botão ou o texto dentro dele
        if (e.target.classList.contains('envelope-lacre-btn') || e.target.closest('.envelope-lacre-btn')) {
            
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