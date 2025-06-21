const baseURL = '/conteudos';

function displayMessage(msg, type = 'warning') {
    const container = document.getElementById('msg');
    container.innerHTML = `<div class="alert alert-${type}" role="alert">${msg}</div>`;
    setTimeout(() => container.innerHTML = '', 4000);
}

function createInfo(info, callback) {
    fetch(baseURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(info)
    })
    .then(res => res.json())
    .then(callback)
    .catch(() => displayMessage('Erro ao inserir.', 'danger'));
}

function readInfo(callback) {
    fetch(baseURL)
        .then(res => res.json())
        .then(callback)
        .catch(() => displayMessage('Erro ao carregar.', 'danger'));
}

function updateInfo(id, info, callback) {
    fetch(`${baseURL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(info)
    })
    .then(res => res.json())
    .then(callback)
    .catch(() => displayMessage('Erro ao alterar.', 'danger'));
}

function deleteInfo(id, callback) {
    fetch(`${baseURL}/${id}`, { method: 'DELETE' })
        .then(callback)
        .catch(() => displayMessage('Erro ao excluir.', 'danger'));
}

function populateTable(data) {
    const tbody = document.getElementById('table-info');
    tbody.innerHTML = '';
    data.forEach(item => {
        tbody.innerHTML += `
            <tr data-id="${item.id}">
                <td>${item.id}</td>
                <td>${item.titulo}</td>
                <td>${item.descricao}</td>
                <td>${item.categoria}</td>
                <td><a href="${item.link}" target="_blank">Ver link</a></td>
                <td><img src="${item.imagem}" width="100" /></td>
            </tr>`;
    });
}

function initInfoPage() {
    document.getElementById('btn_logout').addEventListener('click', logoutUser);
    document.getElementById('nomeUsuario').innerText = usuarioCorrente.nome;

    const form = document.getElementById('form-info');
    const btnInsert = document.getElementById('btnInsert');
    const btnUpdate = document.getElementById('btnUpdate');
    const btnDelete = document.getElementById('btnDelete');
    const btnClear  = document.getElementById('btnClear');

    btnInsert.addEventListener('click', () => {
        const info = {
            titulo: document.getElementById('inputTitulo').value,
            categoria: document.getElementById('inputCategoria').value,
            descricao: document.getElementById('inputDescricao').value,
            imagem: document.getElementById('inputImagem').value,
            link: document.getElementById('inputLink').value
        };
        createInfo(info, () => {
            displayMessage('Inserido com sucesso!', 'success');
            refresh();
        });
    });

    btnUpdate.addEventListener('click', () => {
        const id = document.getElementById('inputId').value;
        if (!id) return displayMessage('Selecione um item para alterar.', 'info');
        const info = {
            titulo: document.getElementById('inputTitulo').value,
            categoria: document.getElementById('inputCategoria').value,
            descricao: document.getElementById('inputDescricao').value,
            imagem: document.getElementById('inputImagem').value,
            link: document.getElementById('inputLink').value
        };
        updateInfo(id, info, () => {
            displayMessage('Alterado com sucesso!', 'success');
            refresh();
        });
    });

    btnDelete.addEventListener('click', () => {
        const id = document.getElementById('inputId').value;
        if (!id) return displayMessage('Selecione um item para excluir.', 'info');
        deleteInfo(id, () => {
            displayMessage('Excluído com sucesso!', 'success');
            refresh();
        });
    });

    btnClear.addEventListener('click', () => form.reset());

    document.getElementById('grid-info').addEventListener('click', e => {
        if (['TD', 'A', 'IMG'].includes(e.target.tagName)) {
            const row = e.target.closest('tr');
            const cols = row.children;
            document.getElementById('inputId').value        = cols[0].innerText;
            document.getElementById('inputTitulo').value    = cols[1].innerText;
            document.getElementById('inputDescricao').value = cols[2].innerText;
            document.getElementById('inputCategoria').value = cols[3].innerText;
            document.getElementById('inputLink').value      = cols[4].querySelector('a')?.href || '';
            document.getElementById('inputImagem').value    = cols[5].querySelector('img')?.src || '';
        }
    });

    function refresh() {
        form.reset();
        readInfo(populateTable);
    }

    refresh();
}

window.addEventListener('load', initInfoPage);
