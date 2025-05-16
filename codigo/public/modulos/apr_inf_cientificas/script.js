js:
const container = document.getElementById('card-container');

fetch("http://localhost:3000/conteudo/")
.then(response => response.json())
.then(data => {
data.forEach(conteudo=> {
        if(conteudo.categoria == "artigo"){
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
        }
        else{
            console.log("oi");
        }
    })
})
.catch(error => {
console.error('Erro ao carregar os conteudo:', error);
container.innerHTML = "<p>Erro ao carregar conteudo. Verifique o servidor.</p>";
});