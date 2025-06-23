const artigoList = document.getElementById('artigo-list');
const buscaInput = document.getElementById('busca-artigo');

let artigos = [];

function checarfavorito(endpoint, id){
    const id_usuario = usuarioCorrente.id;
    const query = `/favoritos?categoria=${endpoint}&favorito=${id}&usuarioId=${id_usuario}`;

    return fetch(query)
        .then(res => res.json())
        .then(data => {
            if (data.length > 0) {
                return { classe: "fa-solid", idFavorito: data[0].id };
            } else {
                return { classe: "fa-regular", idFavorito: null };
            }
        });
}

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
    checarfavorito("artigo", artigo.id)
    .then(favData => {
      const div = document.createElement('div');
      div.classList.add('artigo-card');
      div.style.cursor = 'pointer';
      div.style.textAlign = 'center';
      div.style.marginBottom = '20px';
      div.style.position = 'relative';

      div.innerHTML = `
        <div class="d-flex justify-content-end" style="position: absolute; right: 10px; top: 10px;">
          <i id="fav-artigo-${artigo.id}" class="${favData.classe} fa-heart heart-icon" style="font-size: 1.5rem; color: #e74c3c; transition: transform 0.2s;"></i>
        </div>
        <img src="${artigo.imagem}" alt="${artigo.titulo}" style="max-width:100%; border-radius:8px;" />
        <p style="margin-top:8px;">${artigo.titulo}</p>
      `;

      const heartIcon = div.querySelector(`#fav-artigo-${artigo.id}`);
      heartIcon.addEventListener('click', (e) => {
        e.stopPropagation(); // Impede o clique de abrir o link

        heartIcon.style.transform = 'scale(1.3)';
        setTimeout(() => heartIcon.style.transform = 'scale(1)', 150);

        if (heartIcon.classList.contains("fa-regular")) {
          // Adiciona favorito
          fetch("/favoritos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              usuarioId: usuarioCorrente.id,
              favorito: artigo.id,
              categoria: "artigo"
            })
          }).then(() => {
            heartIcon.classList.remove("fa-regular");
            heartIcon.classList.add("fa-solid");
          });
        } else {
          // Remove favorito
          fetch(`/favoritos?usuarioId=${usuarioCorrente.id}&favorito=${artigo.id}&categoria=artigo`)
            .then(res => res.json())
            .then(data => {
              if (data.length > 0) {
                fetch(`/favoritos/${data[0].id}`, {
                  method: "DELETE"
                }).then(() => {
                  heartIcon.classList.remove("fa-solid");
                  heartIcon.classList.add("fa-regular");
                });
              }
            });
        }
      });

      // Clique no restante do card abre o link
      div.addEventListener('click', () => {
        window.open(artigo.link, '_blank');
      });

      artigoList.appendChild(div);
    });
  });
}

// Filtro de busca
buscaInput.addEventListener('input', function() {
  const termo = this.value.toLowerCase();
  const filtrados = artigos.filter(a => a.titulo.toLowerCase().includes(termo));
  renderArtigos(filtrados);
});
