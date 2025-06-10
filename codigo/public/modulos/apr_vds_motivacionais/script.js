// script.js
fetch('http://localhost:3000/motivacionais')
  .then(response => response.json())
  .then(videos => {
    const container = document.getElementById('video-list');
    videos.forEach(video => {
      const iframe = document.createElement('iframe');
      iframe.src = video.url;
      iframe.title = video.titulo;
      iframe.allowFullscreen = true;
      container.appendChild(iframe);
    });
  })
  .catch(error => {
    console.error("Erro ao carregar os vídeos motivacionais:", error);
    document.getElementById('video-list').innerHTML = `<p>Erro ao carregar os vídeos. Tente novamente mais tarde.</p>`;
  });
