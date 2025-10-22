document.addEventListener("DOMContentLoaded", () => {

    // Menu de navegação
    const menuButtons = document.querySelectorAll('.menu-btn');
    const sections = {
        certifications: document.getElementById('certifications'),
        experience: document.getElementById('experience'),
        skills: document.getElementById('skills')
    };

    menuButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active de todos os botões
            menuButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-white/25', 'border-white', 'shadow-lg');
                btn.classList.add('bg-white/10', 'border-white/30');
            });

            // Adiciona active ao botão clicado
            this.classList.add('active', 'bg-white/25', 'border-white', 'shadow-lg', 'shadow-white/20');
            this.classList.remove('bg-white/10', 'border-white/30');

            // Oculta todas as seções
            Object.values(sections).forEach(section => {
                if (section) {
                    section.classList.add('hidden');
                    section.classList.remove('animate-fade-in');
                }
            });

            // Mostra a seção correspondente com animação
            const sectionId = this.getAttribute('data-section');
            if (sections[sectionId]) {
                sections[sectionId].classList.remove('hidden');
                // Adiciona animação de entrada
                setTimeout(() => {
                    sections[sectionId].classList.add('animate-fade-in');
                }, 10);
            }
        });
    });

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
