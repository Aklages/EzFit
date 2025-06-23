const videoList = document.getElementById('video-list');
const buscaInput = document.getElementById('busca-video');

let videos = [];

function checarfavorito(endpoint, id) {
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

// Carrega os vídeos do db.json
fetch('/conteudos?categoria=video')
  .then(res => res.json())
  .then(data => {
    videos = data;
    renderVideos(videos);
  });

function renderVideos(lista) {
  videoList.innerHTML = '';
  if (lista.length === 0) {
    videoList.innerHTML = '<p>Nenhum vídeo encontrado.</p>';
    return;
  }

  lista.forEach(video => {
    checarfavorito("video", video.id)
      .then(favData => {
        const div = document.createElement('div');
        div.classList.add('video-card');
        div.style.textAlign = 'center';
        div.style.marginBottom = '20px';
        div.style.position = 'relative';

        div.innerHTML = `
          <div class="d-flex justify-content-end">
            <i id="fav-video-${video.id}" class="${favData.classe} fa-heart heart-icon"></i>
          </div>
          <iframe src="${video.link}" frameborder="0" allowfullscreen style="width:100%; height:315px; border-radius:8px;"></iframe>
          <p style="margin-top:8px;">${video.titulo}</p>
        `;

        const heartIcon = div.querySelector(`#fav-video-${video.id}`);
        heartIcon.addEventListener('click', (e) => {
          e.stopPropagation(); // impede clique de propagar

          if (heartIcon.classList.contains("fa-regular")) {
            // Adiciona aos favoritos
            fetch("/favoritos", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                usuarioId: usuarioCorrente.id,
                favorito: video.id,
                categoria: "video"
              })
            }).then(() => {
              heartIcon.classList.remove("fa-regular");
              heartIcon.classList.add("fa-solid");
            });
          } else {
            // Remove dos favoritos
            fetch(`/favoritos?usuarioId=${usuarioCorrente.id}&favorito=${video.id}&categoria=video`)
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

        videoList.appendChild(div);
      });
  });
}

// Filtro de busca
buscaInput.addEventListener('input', function () {
  const termo = this.value.toLowerCase();
  const filtrados = videos.filter(v => v.titulo.toLowerCase().includes(termo));
  renderVideos(filtrados);
});
