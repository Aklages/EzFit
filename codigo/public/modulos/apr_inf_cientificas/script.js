const artigoList = document.getElementById('artigo-list');
const buscaInput = document.getElementById('busca-artigo');

let artigos = [];

// Carrega os artigos da categoria "artigo"
fetch('/conteudos?categoria=artigo')
  .then(res => res.json())
  .then(data => {
    artigos = data;
    renderArtigos(artigos);
  });

function renderArtigos(lista) {
  artigoList.innerHTML = '';

  if (lista.length === 0) {
    artigoList.innerHTML = '<p>Nenhum artigo encontrado.</p>';
    return;
  }

  lista.forEach(artigo => {
    const div = document.createElement('div');
    div.classList.add('artigo-card');
    div.style.cursor = 'pointer';
    div.style.textAlign = 'center';
    div.style.marginBottom = '20px';

    div.innerHTML = `
      <img src="${artigo.imagem}" alt="${artigo.titulo}" style="max-width:100%; border-radius:8px;" />
      <p style="margin-top:8px;">${artigo.titulo}</p>
    `;

    // Redireciona para o link ao clicar
    div.addEventListener('click', () => {
      window.open(artigo.link, '_blank');
    });

    artigoList.appendChild(div);
  });
}

// Filtro de busca
buscaInput.addEventListener('input', function() {
  const termo = this.value.toLowerCase();
  const filtrados = artigos.filter(a => a.titulo.toLowerCase().includes(termo));
  renderArtigos(filtrados);
});
