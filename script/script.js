
// Elementos do DOM
const categoryCards = document.querySelectorAll('.produto-card');
const productsSection = document.getElementById('cards-produtos');
const productsContainer = document.getElementById('cards-produtos-container');
const modal = new bootstrap.Modal(document.getElementById('productModal'));
const modalImage = document.getElementById('productModalLabel');
const modalTitle = document.getElementById('productModalLabel');
const modalBody = document.getElementById('productModalBody');

let categoriesData = {};

// Função para carregar o JSON
async function loadCategoriesData() {
    try {
        const response = await fetch('../src/resources/dados_produtos.json');
        if (!response.ok) throw new Error('Erro ao carregar o arquivo JSON');
        categoriesData = await response.json();
        
    } catch (error) {
        console.error('Erro:', error);
    }
}

// Função para mostrar produtos
function showProducts(category) {
    productsContainer.innerHTML = ''; // Limpa os produtos anteriores
    const products = categoriesData[category];

    products.forEach(product => {
        const productCard = `
            <div class="col-lg-3 col-md-6 col-sm-12">
                <div class="card produto-card-interno border-custom" style="width: 18rem;" data-product-id="${product.id}">
                    <img src="src/resources/img/produtos/${product.nomeArquivoImagem}" class="card-img-top" alt="..." style="width:300px; height: 300px; object-fit: contain;">
                    <div class="card-body">
                        <h5 class="card-title">${product.nome}</h5>
                        <p class="card-text">${product.preco}</p>
                    </div>
                </div>
            </div>
        `;
        productsContainer.innerHTML += productCard;
    });

    // Mostra a seção de produtos
    productsSection.classList.add('active');

    // Adiciona eventos aos novos cards de produto
    document.querySelectorAll('.produto-card-interno').forEach(card => {
        card.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            const selectedProduct = products.find(p => p.id == productId);
            modalTitle.textContent = selectedProduct.nome;
            modalBody.innerHTML = `
                <center><img src="src/resources/img/produtos/${selectedProduct.nomeArquivoImagem}" class="card-img-top" alt="..." style="margin-bottom:30px; width:300px; height: 300px; object-fit: contain;"> </center>
                <p><strong>Vazão máxima:</strong> ${selectedProduct.vazao_maxima}</p>
                <p><strong>Potência:</strong> ${selectedProduct.potencia}</p>
                <p><strong>Reservatorio de água:</strong> ${selectedProduct.reservatorio_agua}</p>
                <p><strong>Conjunto de hélices:</strong> ${selectedProduct.conjunto_helices}</p>
                <p><strong>Dimensão total (mm):</strong> ${selectedProduct.dimensoes_total_mm}</p>
                <p><strong>Peso sem água:</strong> ${selectedProduct.peso_sem_agua}</p>
                <p><strong>Preço:</strong> ${selectedProduct.preco}</p>
                <button onclick="window.location.href='https://api.whatsapp.com/send?phone=553496337574'" class="btn btn-success" style="margin-top:30px">Faça seu orçamento</button>
            `;
            modal.show();
        });
    });
}


// Eventos dos cards de categoria
categoryCards.forEach(card => {
    card.addEventListener('click', function() {
        const category = this.getAttribute('categoria');
        
        // Se a seção já está visível e é a mesma categoria, esconde
        if (productsSection.classList.contains('active') && 
            productsContainer.dataset.currentCategory === category) {
            productsSection.classList.remove('active');
        } else {
            showProducts(category);
            productsContainer.dataset.currentCategory = category;
        }
    });
});


// Carrega os dados ao iniciar
loadCategoriesData();