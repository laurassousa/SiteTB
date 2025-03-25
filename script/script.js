 // Dados dos cards (pode vir de um banco de dados ou API)
 const cardDetails = 
 {
    1: {
        title: "Detalhes do Card 1",
        content: "Aqui estão os detalhes completos do Card 1. Esta section aparece suavemente quando o card é clicado."
    },
    2: {
        title: "Detalhes do Card 2",
        content: "Aqui estão os detalhes completos do Card 2 com uma transição suave."
    }
};

// Seleciona todos os cards e a section de detalhes
const cards = document.querySelectorAll('.card');
const detailsSection = document.getElementById('details');
const detailsTitle = document.getElementById('details-title');
const detailsContent = document.getElementById('details-content');

// Adiciona evento de clique em cada card
cards.forEach(card => {
    card.addEventListener('click', function() {
        const cardId = this.getAttribute('data-id');
        const details = cardDetails[cardId];

        // Atualiza o conteúdo
        detailsTitle.textContent = details.title;
        detailsContent.textContent = details.content;

        // Mostra a section com transição
        detailsSection.classList.add('active');

        // Opcional: Fecha após 5 segundos (remova se não quiser)
        setTimeout(() => {
            detailsSection.classList.remove('active');
        }, 5000);
    });
});

// Opcional: Fecha ao clicar na section
detailsSection.addEventListener('click', function() {
    this.classList.remove('active');
});