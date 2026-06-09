document.addEventListener('click', (e) => {
    // Cria o elemento que conterá o coração
    const heart = document.createElement('span');
    heart.classList.add('click-heart');
    
    // Define o caractere do coração
    heart.innerHTML = '❤️';
    
    // Define a posição exata onde o usuário clicou (ajustado pelo scroll da página)
    heart.style.left = `${e.pageX}px`;
    heart.style.top = `${e.pageY}px`;
    
    // Pequena variação aleatória de tamanho para um efeito mais natural e avançado
    const randomScale = Math.random() * 0.5 + 0.8; // entre 0.8 e 1.3
    heart.style.transform = `scale(${randomScale})`;

    // Lista de tons de rosa/vermelho para alternar dinamicamente as cores dos corações (opcional caso queira usar emojis diferentes ou ícones)
    // Como estamos usando emoji padrão '❤️', a cor é fixa, mas podemos variar os emojis:
    const heartTypes = ['❤️', '💖', '💘', '💕', '✨'];
    const randomHeart = heartTypes[Math.floor(Math.random() * heartTypes.length)];
    heart.innerHTML = randomHeart;
    
    // Adiciona o elemento ao body da página
    document.body.appendChild(heart);
    
    // Remove o coração do DOM após a animação terminar (1 segundo) para não pesar a página
    setTimeout(() => {
        heart.remove();
    }, 1000);
});