// URL da API JSONServer - Substitua pela URL correta da sua API
const apiUrl = 'http://localhost:3000/locais';


function displayMessage(mensagem) {
    let msg = document.getElementById('msg');
    msg.innerHTML = '<div class="alert alert-warning">' + mensagem + '</div>';
}

function readLocal(processaDados) {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            processaDados(data);
        })
        .catch(error => {
            console.error('Erro ao ler locais via API JSONServer:', error);
            displayMessage("Erro ao ler locais");
        });
}

function createLocal(local, refreshFunction) {
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(local),
    })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text) });
            }
            return response.json();
        })
        .then(data => {
            displayMessage("Local inserido com sucesso");
            if (refreshFunction)
                refreshFunction();
        })
        .catch(error => {
            console.error('Erro ao inserir local via API JSONServer:', error);
            displayMessage("Erro ao inserir local: " + error.message);
        });
}

function updateLocal(id, local, refreshFunction) {
    fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(local),
    })
        .then(response => response.json())
        .then(data => {
            displayMessage("Local alterado com sucesso");
            if (refreshFunction)
                refreshFunction();
        })
        .catch(error => {
            console.error('Erro ao atualizar local via API JSONServer:', error);
            displayMessage("Erro ao atualizar local");
        });
}

function deleteLocal(id, refreshFunction) {
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            displayMessage("Local removido com sucesso");
            if (refreshFunction)
                refreshFunction();
        })
        .catch(error => {
            console.error('Erro ao remover local via API JSONServer:', error);
            displayMessage("Erro ao remover local");
        });
}
