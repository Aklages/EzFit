const usuarioId = usuarioCorrente.id;

const locaisContainer = document.getElementById('favoritos-locais');
const videosContainer = document.getElementById('favoritos-videos');
const artigosContainer = document.getElementById('favoritos-artigos');

function carregarFavoritos() {
  fetch(`/favoritos?usuarioId=${usuarioId}`)
    .then(res => res.json())
    .then(favoritos => {
      const locaisIds = favoritos.filter(f => f.categoria === 'local').map(f => f.favorito);
      const videoIds  = favoritos.filter(f => f.categoria === 'video').map(f => f.favorito);
      const artigoIds = favoritos.filter(f => f.categoria === 'artigo').map(f => f.favorito);

      if (locaisIds.length > 0) {
        fetch(`/locais?id=${locaisIds.join('&id=')}`)
          .then(res => res.json())
          .then(locais => {
            renderLocais(locais);
            adicionarEventosRemocao(); // após render
          });
      }

      if (videoIds.length > 0) {
        fetch(`/conteudos?id=${videoIds.join('&id=')}&categoria=video`)
          .then(res => res.json())
          .then(videos => {
            renderVideos(videos);
            adicionarEventosRemocao();
          });
      }

      if (artigoIds.length > 0) {
        fetch(`/conteudos?id=${artigoIds.join('&id=')}&categoria=artigo`)
          .then(res => res.json())
          .then(artigos => {
            renderArtigos(artigos);
            adicionarEventosRemocao();
          });
      }
    });
}

function renderLocais(locais) {
  locaisContainer.innerHTML = '';
  locais.forEach(local => {
    const card = document.createElement('div');
    card.className = 'col-md-4';
    card.innerHTML = `
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">${local.nome}</h5>
          <p class="card-text">${local.tipo}</p>
          <a href="${local.link}" target="_blank" class="btn btn-sm btn-ver">Ver Local</a>
        </div>
        <div class="card-footer text-end">
          <button class="btn btn-sm btn-remover remover-btn" data-id="${local.id}" data-cat="local">Remover</button>
        </div>
      </div>
    `;
    locaisContainer.appendChild(card);
  });
}

function renderVideos(videos) {
  videosContainer.innerHTML = '';
  videos.forEach(video => {
    const card = document.createElement('div');
    card.className = 'col-md-6';
    card.innerHTML = `
      <div class="card mb-3">
        <div class="ratio ratio-16x9">
          <iframe src="${video.link}" frameborder="0" allowfullscreen style="border-radius: 8px;"></iframe>
        </div>
        <div class="card-body">
          <h5 class="card-title">${video.titulo}</h5>
        </div>
        <div class="card-footer text-end">
          <button class="btn btn-sm btn-remover remover-btn" data-id="${video.id}" data-cat="video">Remover</button>
        </div>
      </div>
    `;
    videosContainer.appendChild(card);
  });
}

function renderArtigos(artigos) {
  artigosContainer.innerHTML = '';
  artigos.forEach(artigo => {
    const card = document.createElement('div');
    card.className = 'col-md-4';
    card.innerHTML = `
      <div class="card mb-3">
        <img src="${artigo.imagem}" class="card-img-top" alt="${artigo.titulo}" style="border-radius: 8px 8px 0 0;">
        <div class="card-body">
          <h5 class="card-title">${artigo.titulo}</h5>
          <a href="${artigo.link}" target="_blank" class="btn btn-sm btn-ver">Ler Artigo</a>
        </div>
        <div class="card-footer text-end">
          <button class="btn btn-sm btn-remover remover-btn" data-id="${artigo.id}" data-cat="artigo">Remover</button>
        </div>
      </div>
    `;
    artigosContainer.appendChild(card);
  });
}

function adicionarEventosRemocao() {
  document.querySelectorAll('.remover-btn').forEach(button => {
    button.addEventListener('click', () => {
      const favorito = button.dataset.id;
      const categoria = button.dataset.cat;

      fetch(`/favoritos?usuarioId=${usuarioId}&favorito=${favorito}&categoria=${categoria}`)
        .then(res => res.json())
        .then(data => {
          if (data.length > 0) {
            fetch(`/favoritos/${data[0].id}`, {
              method: "DELETE"
            }).then(() => location.reload());
          }
        });
    });
  });
}

carregarFavoritos();