document.addEventListener('DOMContentLoaded', () => {
    const groupsContainer = document.getElementById('groupsContainer');
    const searchInput = document.querySelector('.search-bar');
    let grupos = []; 

    function renderGroups(groupList = grupos) {
        if (!groupList.length) {
            groupsContainer.innerHTML = `<p class="text-center">Nenhum grupo encontrado.</p>`;
            return;
        }

        groupsContainer.innerHTML = groupList.map(group => `
            <div class="card mb-3" style="max-width: 30rem; background-color: #AADEAD; color: black;">
                <div class="card-body">
                    <h5 class="card-title">${group.titulo}</h5>
                    <p class="card-text">${group.descricao}</p>
                    <a href="${group.link}" target="_blank" class="btn btn-success">
                        Link do WhatsApp
                    </a>
                </div>
            </div>
        `).join('');
    }

    function filterGroups(term) {
        const t = term.toLowerCase();
        return grupos.filter(group =>
            (group.categoria || '').toLowerCase().includes(t) ||
            (group.titulo || '').toLowerCase().includes(t) ||
            (group.descricao || '').toLowerCase().includes(t)
        );
    }

    function loadAllGroups() {
        fetch('http://localhost:3000/grupos') 
            .then(res => res.json())
            .then(data => {
                grupos = data; 
                renderGroups(); 
            })
            .catch(err => {
                groupsContainer.innerHTML = `<p class="text-danger">Erro ao carregar os grupos.</p>`;
                console.error(err);
            });
    }

    loadAllGroups();

    
    searchInput.addEventListener('input', (e) => {
        const termo = e.target.value;
        const filtrados = filterGroups(termo);
        renderGroups(filtrados);
    });

    
    document.getElementById('btnVisualizarGrupos').addEventListener('click', () => {
        const usuarioLogado = JSON.parse(sessionStorage.getItem('usuarioCorrente'));
        const idUsuarioLogado = usuarioLogado ? usuarioLogado.id : null;

        if (idUsuarioLogado) {
            const meusGrupos = grupos.filter(g => g.id_usuario === idUsuarioLogado);
            renderGroups(meusGrupos); 
        } else {
            alert('Por favor, faça login para visualizar seus grupos.');
            renderGroups([]); 
        }
    });

    
    document.getElementById('btnCriarGrupo').addEventListener('click', () => {
        window.location.href = "http://localhost:3000/modulos/crud_comunidade/index.html";
    });
});