const listaGrupos = document.querySelector('#listaGrupos');

// Método POST p/ criar um grupo novo
document.getElementById('btn_criarGrupo').addEventListener('click', () => {
    const nome = document.getElementById('nomeGrupo').value;
    const link = document.getElementById('linkGrupo').value;
    const descricao = document.getElementById('descricaoGrupo').value;
    const categoria = document.getElementById('categoriaGrupo').value;

    // Pega o ID do usuário do sessionStorage
    const usuarioLogado = JSON.parse(sessionStorage.getItem('usuarioCorrente'));
    const idUsuarioLogado = usuarioLogado ? usuarioLogado.id : null;

    if (!idUsuarioLogado) {
        alert('Usuário não logado. Por favor, faça login para criar um grupo.');
        return;
    }

    if (!categoria) {
        alert('Por favor, selecione uma categoria para o grupo.');
        return;
    }

    const novoGrupo = {
        id_usuario: idUsuarioLogado, // Usa o ID do usuário logado
        titulo: nome,
        descricao: descricao,
        link: link,
        categoria: categoria,
        imagem: ""
    };

    fetch('http://localhost:3000/grupos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoGrupo)
    })
        .then(res => res.json())
        .then(() => {
            carregarGrupos();
            alert('Grupo criado com sucesso!');
        })
        .catch(erro => console.error('Erro ao criar grupo:', erro));
});

// Método UPDATE
document.getElementById('btn_alterarGrupo').addEventListener('click', () => {
    const idGrupo = document.getElementById('idGrupo').value;
    const nome = document.getElementById('nomeGrupo').value;
    const link = document.getElementById('linkGrupo').value;
    const descricao = document.getElementById('descricaoGrupo').value;
    const categoria = document.getElementById('categoriaGrupo').value;

    // Pega o ID do usuário do sessionStorage - NECESSÁRIO TAMBÉM PARA O UPDATE!
    const usuarioLogado = JSON.parse(sessionStorage.getItem('usuarioCorrente'));
    const idUsuarioLogado = usuarioLogado ? usuarioLogado.id : null;

    if (idGrupo === '') {
        alert('Insira o ID do grupo para alterar!');
        return;
    }

    if (!categoria) {
        alert('Selecione uma categoria.');
        return;
    }

    // AQUI ESTÁ A CORREÇÃO: Inclua id_usuario no objeto grupoAlterado
    const grupoAlterado = {
        id_usuario: idUsuarioLogado, // Adicione esta linha
        titulo: nome,
        descricao: descricao,
        link: link,
        categoria: categoria,
        imagem: ""
    };

    fetch(`http://localhost:3000/grupos/${idGrupo}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(grupoAlterado)
    })
        .then(res => {
            if (res.ok) {
                alert('Grupo alterado com sucesso!');
                carregarGrupos();
            } else {
                alert('Erro ao alterar o grupo!');
            }
        })
        .catch(erro => console.error('Erro ao alterar grupo:', erro));
});

// Método DELETE
document.getElementById('btn_excluirGrupo').addEventListener('click', () => {
    const idGrupo = document.getElementById('idGrupo').value;
    if (idGrupo === '') {
        alert('Insira o ID do grupo para excluir!');
        return;
    }

    fetch(`http://localhost:3000/grupos/${idGrupo}`, {
        method: 'DELETE'
    })
        .then(res => {
            if (res.ok) {
                alert('Grupo excluído com sucesso!');
                carregarGrupos();
            } else {
                alert('Erro ao excluir o grupo!');
            }
        })
        .catch(erro => console.error('Erro ao excluir grupo:', erro));
});

// Método GET
function carregarGrupos() {
    fetch('http://localhost:3000/grupos')
        .then(res => res.json())
        .then(grupos => {
            listaGrupos.innerHTML = '';

            const usuarioLogado = JSON.parse(sessionStorage.getItem('usuarioCorrente'));
            const idUsuarioLogado = usuarioLogado ? usuarioLogado.id : null;

            if (!idUsuarioLogado) {
                console.warn('Usuário não logado. Nenhum grupo será exibido.');
                return;
            }

            const gruposDoUsuario = grupos.filter(grupo => grupo.id_usuario === idUsuarioLogado);

            if (gruposDoUsuario.length === 0) {
                const noGroupsMessage = document.createElement('p');
                noGroupsMessage.textContent = 'Você ainda não possui nenhum grupo criado.';
                noGroupsMessage.className = 'text-center text-muted mt-3';
                listaGrupos.appendChild(noGroupsMessage);
                return;
            }

            gruposDoUsuario.forEach(grupo => {
                const card = document.createElement('div');
                card.className = 'card shadow-sm rounded-4';
                card.style.backgroundColor = '#c4eec4';
                card.style.width = '250px';
                card.style.flex = '0 0 auto';

                // Adicionado link de entrar no card, como estava na versão original
                card.innerHTML = `
                    <div class="card-body">
                        <h5 class="card-title fw-bold">${grupo.titulo}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Categoria: ${grupo.categoria}</h6>
                        <p class="card-text">${grupo.descricao}</p>
                        <p class="card-text"><small class="text-muted">ID: ${grupo.id}</small></p>
                    </div>
                `;

                listaGrupos.appendChild(card);
            });
        })
        .catch(erro => console.error('Erro ao carregar grupos:', erro));
}

window.addEventListener('load', carregarGrupos);