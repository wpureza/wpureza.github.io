document.addEventListener("DOMContentLoaded", () => {

    // Seleciona todos os blocos que queremos animar
    const timelineBlocks = document.querySelectorAll(".timeline-block");

    // Verifica se a API IntersectionObserver é suportada
    if ("IntersectionObserver" in window) {
        
        // Configura o "observador"
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // Se o elemento (entry) está visível (isIntersecting)
                if (entry.isIntersecting) {
                    // Adiciona a classe que dispara a animação CSS
                    entry.target.classList.add("is-visible");
                    
                    // (Opcional) Deixa de observar o elemento
                    // para a animação não repetir
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null, // Observa em relação ao viewport
            threshold: 0.1 // Dispara quando 10% do item estiver visível
        });

        // Coloca o observador para "assistir" cada bloco
        timelineBlocks.forEach(block => {
            observer.observe(block);
        });

    } else {
        // Se o navegador for muito antigo e não suportar
        // apenas mostra todos os blocos de uma vez
        timelineBlocks.forEach(block => {
            block.classList.add("is-visible");
        });
    }
});
