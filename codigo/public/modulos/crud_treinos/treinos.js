const baseTreinos = '/treinos';
const baseExercicios = '/exercicios';
const baseRelacionamento = '/treinos_exercicios';

function displayMessage(msg, type = 'warning') {
  const container = document.getElementById('msg');
  container.innerHTML = `<div class="alert alert-${type}" role="alert">${msg}</div>`;
  setTimeout(() => container.innerHTML = '', 4000);
}

function fetchExercicios(callback) {
  fetch(baseExercicios)
    .then(res => res.json())
    .then(callback);
}

function fetchRelacionamentos(callback) {
  fetch(baseRelacionamento)
    .then(res => res.json())
    .then(callback);
}

function createTreino(treino, exercicios, callback) {
  fetch(baseTreinos, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(treino)
  })
    .then(res => res.json())
    .then(novoTreino => {
      const promessas = exercicios.map(eid =>
        fetch(baseRelacionamento, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ treinoId: novoTreino.id, exercicioId: parseInt(eid) })
        })
      );
      Promise.all(promessas).then(callback);
    });
}

function updateTreino(id, treino, exercicios, callback) {
  fetch(`${baseTreinos}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(treino)
  })
    .then(() => {
      // Remove todos relacionamentos anteriores
      fetch(`${baseRelacionamento}?treinoId=${id}`)
        .then(res => res.json())
        .then(rel => {
          const deletions = rel.map(r =>
            fetch(`${baseRelacionamento}/${r.id}`, { method: 'DELETE' })
          );
          Promise.all(deletions).then(() => {
            const additions = exercicios.map(eid =>
              fetch(baseRelacionamento, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ treinoId: parseInt(id), exercicioId: parseInt(eid) })
              })
            );
            Promise.all(additions).then(callback);
          });
        });
    });
}

function deleteTreino(id, callback) {
  fetch(`${baseTreinos}/${id}`, { method: 'DELETE' })
    .then(() => {
      fetch(`${baseRelacionamento}?treinoId=${id}`)
        .then(res => res.json())
        .then(rel => {
          const deletions = rel.map(r =>
            fetch(`${baseRelacionamento}/${r.id}`, { method: 'DELETE' })
          );
          Promise.all(deletions).then(callback);
        });
    });
}

function readTreinos(callback) {
  Promise.all([
    fetch(baseTreinos).then(res => res.json()),
    fetch(baseRelacionamento).then(res => res.json()),
    fetch(baseExercicios).then(res => res.json())
  ]).then(([treinos, rels, exercicios]) => {
    callback(treinos.map(treino => {
      const exs = rels.filter(r => r.treinoId === treino.id).map(r => {
        return exercicios.find(e => e.id === r.exercicioId)?.nome;
      }).filter(Boolean);
      return { ...treino, exercicios: exs };
    }));
  });
}

function populateTable(data) {
  const tbody = document.getElementById('table-treinos');
  tbody.innerHTML = '';
  data.forEach(item => {
    tbody.innerHTML += `
      <tr data-id="${item.id}" data-exercicios='${JSON.stringify(item.exercicios)}'>
        <td>${item.id}</td>
        <td>${item.objetivo}</td>
        <td>${item.dias}</td>
        <td>${item.tempo_livre_m} min</td>
        <td>${item.local}</td>
        <td>${item.exercicios.join(', ')}</td>
      </tr>`;
  });
}

function initTreinoPage() {
  const form = document.getElementById('form-treino');
  const btnInsert = document.getElementById('btnInsert');
  const btnUpdate = document.getElementById('btnUpdate');
  const btnDelete = document.getElementById('btnDelete');
  const btnClear  = document.getElementById('btnClear');
  const selectExercicios = document.getElementById('selectExercicios');

  fetchExercicios(exs => {
    exs.forEach(e => {
      const option = document.createElement('option');
      option.value = e.id;
      option.textContent = e.nome;
      selectExercicios.appendChild(option);
    });
  });

  function getSelectedExercicios() {
    return Array.from(selectExercicios.selectedOptions).map(opt => opt.value);
  }

  btnInsert.addEventListener('click', () => {
    const treino = {
      objetivo: document.getElementById('inputObjetivo').value,
      dias: parseInt(document.getElementById('inputDias').value),
      tempo_livre_m: parseInt(document.getElementById('inputTempoLivre').value),
      local: document.getElementById('inputLocal').value
    };
    const exercicios = getSelectedExercicios();
    createTreino(treino, exercicios, () => {
      displayMessage('Inserido com sucesso!', 'success');
      refresh();
    });
  });

  btnUpdate.addEventListener('click', () => {
    const id = document.getElementById('inputId').value;
    if (!id) return displayMessage('Selecione um item para alterar.', 'info');
    const treino = {
      objetivo: document.getElementById('inputObjetivo').value,
      dias: parseInt(document.getElementById('inputDias').value),
      tempo_livre_m: parseInt(document.getElementById('inputTempoLivre').value),
      local: document.getElementById('inputLocal').value
    };
    const exercicios = getSelectedExercicios();
    updateTreino(id, treino, exercicios, () => {
      displayMessage('Alterado com sucesso!', 'success');
      refresh();
    });
  });

  btnDelete.addEventListener('click', () => {
    const id = document.getElementById('inputId').value;
    if (!id) return displayMessage('Selecione um item para excluir.', 'info');
    deleteTreino(id, () => {
      displayMessage('Excluído com sucesso!', 'success');
      refresh();
    });
  });

  btnClear.addEventListener('click', () => form.reset());

  document.getElementById('grid-treinos').addEventListener('click', e => {
    const row = e.target.closest('tr');
    if (!row) return;
    const cols = row.children;
    document.getElementById('inputId').value = cols[0].innerText;
    document.getElementById('inputObjetivo').value = cols[1].innerText;
    document.getElementById('inputDias').value = cols[2].innerText;
    document.getElementById('inputTempoLivre').value = parseInt(cols[3].innerText);
    document.getElementById('inputLocal').value = cols[4].innerText;
    
    const exNomes = row.dataset.exercicios ? JSON.parse(row.dataset.exercicios) : [];
    Array.from(selectExercicios.options).forEach(opt => {
      opt.selected = exNomes.includes(opt.textContent);
    });
  });

  function refresh() {
    form.reset();
    readTreinos(populateTable);
  }

  refresh();
}

window.addEventListener('load', initTreinoPage);
