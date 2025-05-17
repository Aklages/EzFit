const listaGrupos = document.querySelector('#listaGrupos');

// Método POST - Cria um grupo novo
document.getElementById('btn_criarGrupo').addEventListener('click', () => {
    const nome = document.getElementById('nomeGrupo').value;
    const link = document.getElementById('linkGrupo').value;
    const descricao = document.getElementById('descricaoGrupo').value;
    const categoria = document.getElementById('categoriaGrupo').value;

    if (!categoria) {
        alert('Por favor, selecione uma categoria para o grupo.');
        return;
    }

    const novoGrupo = {
        id_usuario: 1,
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

    if (idGrupo === '') {
        alert('Insira o ID do grupo para alterar!');
        return;
    }

    if (!categoria) {
        alert('Selecione uma categoria.');
        return;
    }

    const grupoAlterado = {
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
                carregarGrupos();  // Recarregar os grupos após a exclusão
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
            grupos.forEach(grupo => {
                const item = document.createElement('li');
                const textoGrupo = `
                                ID: ${grupo.id}
                                - Usuário: ${grupo.id_usuario}
                                - Título: ${grupo.titulo}
                                - Descrição: ${grupo.descricao}
                                - Categoria: ${grupo.categoria}
                                - Link: ${grupo.link}
                            `;
                item.textContent = textoGrupo;
                listaGrupos.appendChild(item);
            });
        })
        .catch(erro => console.error('Erro ao carregar grupos:', erro));
}

// Deixei essa linha abaixo p que o evento load seja chamado assim que a pag toda carregar
window.addEventListener('load', carregarGrupos);