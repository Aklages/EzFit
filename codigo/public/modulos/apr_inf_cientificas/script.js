// URL do JSON Server
const URL = 'http://localhost:3000/conteudos/';
const container = document.getElementById('card-container');
// Buscar dados do JSON Server e gerar cards
fetch(URL)
.then(response => response.json())
.then(data => {
data.forEach(conteudo=> {
const card = document.createElement('div');
card.classList.add('card');

card.innerHTML = `
<img src="${conteudo.imagem}" alt="${conteudo.titulo}">
<div class="card-content">
<h2>${conteudo.titulo}</h2>
<p>${conteudo.descricao}</p>
</div>
`;

container.appendChild(card);
});
})
.catch(error => {
console.error('Erro ao carregar os conteudo:', error);
container.innerHTML = "<p>Erro ao carregar conteudo. Verifique o servidor.</p>";
});
