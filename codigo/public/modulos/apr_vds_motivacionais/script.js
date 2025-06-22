// script.js
const videoList = document.getElementById('video-list');
const buscaInput = document.getElementById('busca-video');

let videos = [];

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
    const div = document.createElement('div');
    div.innerHTML = `
      <iframe src="${video.link}" frameborder="0" allowfullscreen></iframe>
      <p style="text-align:center; margin-top:8px;">${video.titulo}</p>
    `;
    videoList.appendChild(div);
  });
}

// Filtro de busca
buscaInput.addEventListener('input', function() {
  const termo = this.value.toLowerCase();
  const filtrados = videos.filter(v => v.titulo.toLowerCase().includes(termo));
  renderVideos(filtrados);
});
