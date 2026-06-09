document.addEventListener('DOMContentLoaded', () => {

    // === 1. EFEITO DE FUNDO: Corações e Girassóis flutuando sozinhos ===
    const createFloatingElement = () => {
        const element = document.createElement('div');
        element.classList.add('floating-bg-item');

        // Sorteia se vai nascer um coração turquesa, rosa ou um girassol
        const items = ['💖', '🩵', '🌻', '💕'];
        element.innerHTML = items[Math.floor(Math.random() * items.length)];

        // Posição horizontal aleatória (de 0% a 100% da largura da tela)
        element.style.left = Math.random() * 100 + 'vw';
        
        // Tamanho aleatório para dar sensação de profundidade
        const size = Math.random() * 20 + 10; // entre 10px e 30px
        element.style.fontSize = `${size}px`;

        // Duração da subida aleatória para não subirem todos juntos
        const duration = Math.random() * 5 + 5; // entre 5s e 10s
        element.style.animationDuration = `${duration}s`;

        // Opacidade um pouco transparente para não atrapalhar a leitura do texto
        element.style.opacity = Math.random() * 0.4 + 0.2;

        document.body.appendChild(element);

        // Remove o elemento depois que ele terminar de subir para não travar o site
        setTimeout(() => {
            element.remove();
        }, duration * 1000);
    };

    // Cria um elemento novo a cada 400 milissegundos
    setInterval(createFloatingElement, 400);


    // === 2. EFEITO DE CLIQUE: Corações que nascem onde o usuário clica ===
    document.addEventListener('click', (e) => {
        const heart = document.createElement('span');
        heart.classList.add('click-heart-turq');
        
        const heartIcons = ['🩵', '💖', '💘', '🩵', '❤️', '💕'];
        heart.innerHTML = heartIcons[Math.floor(Math.random() * heartIcons.length)];
        
        heart.style.left = `${e.pageX}px`;
        heart.style.top = `${e.pageY}px`;
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 1200);
    });
});