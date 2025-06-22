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
            <div class="group-card" data-category="${group.categoria}">
                <h2>${group.titulo}</h2>
                <p>${group.descricao}</p>
                <a href="${group.link}" class="group-link" target="_blank">
                    Participar do Grupo
                </a>
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

    function loadGroups() {
        fetch('/grupos')
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

    loadGroups();

    searchInput.addEventListener('input', (e) => {
        const termo = e.target.value;
        const filtrados = filterGroups(termo);
        renderGroups(filtrados);
    });

    document.getElementById('btnVisualizarGrupos').addEventListener('click', () => {
        const userId = 1;
        const meusGrupos = grupos.filter(g => g.id_usuario === userId);
        renderGroups(meusGrupos);
    });

    document.getElementById('btnCriarGrupo').addEventListener('click', () => {
        alert('Funcionalidade de criação de grupo ainda não implementada.');
    });
});
