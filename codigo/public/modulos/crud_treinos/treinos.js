const baseUrl = "https://8c1a12b8-f84f-48f6-9b1e-c9af42686c2c-00-3l7cwykkjqkvx.worf.replit.dev";

document.addEventListener("DOMContentLoaded", () => {
  listarTreinos();

  const form = document.getElementById("treinoForm");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const treino = getDadosFormulario();
    console.log("Dados para enviar:", treino); // debug dos dados enviados

    try {
      const response = await fetch(`${baseUrl}/treinos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(treino)
      });

      if (!response.ok) {
        const errorText = await response.text(); // tenta extrair mensagem de erro do backend
        throw new Error(`Erro ao criar treino: ${response.status} - ${errorText}`);
      }

      listarTreinos();
      form.reset();
    } catch (error) {
      console.error("Erro ao criar treino:", error);
      alert("Erro ao criar treino: " + (error.message || JSON.stringify(error)));
    }
  });
});

function getDadosFormulario() {
  return {
    id: Number(document.getElementById("id").value),
    objetivo: document.getElementById("objetivo").value,
    dias: Number(document.getElementById("dias").value),
    tempo_livre: Number(document.getElementById("tempo_livre").value),
    local: document.getElementById("local").value,
    exercicios: parseExercicios(document.getElementById("exercicios").value)
  };
}

async function listarTreinos() {
  try {
    const response = await fetch(`${baseUrl}/treinos`);
    if (!response.ok) throw new Error(`Erro ao buscar treinos: ${response.status}`);

    const treinos = await response.json();
    const tbody = document.querySelector("#treinosTable tbody");
    tbody.innerHTML = "";

    treinos.forEach((t) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${t.id}</td>
        <td>${t.objetivo}</td>
        <td>${t.dias}</td>
        <td>${t.tempo_livre}</td>
        <td>${t.local}</td>
        <td>
          <ul>
            ${t.exercicios.map(e => `<li>${e.nome} - ${e.repeticoes} repetições</li>`).join('')}
          </ul>
        </td>
      `;
      tbody.appendChild(tr);
    });

  } catch (error) {
    console.error("Erro ao buscar treinos:", error);
  }
}

async function atualizarTreino() {
  const treino = getDadosFormulario();

  try {
    const response = await fetch(`${baseUrl}/treinos/${treino.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(treino)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro HTTP ${response.status}: ${errorText}`);
    }

    alert("Treino atualizado com sucesso!");
    listarTreinos();
  } catch (error) {
    console.error("Erro ao atualizar treino:", error.message);
    alert("Erro ao atualizar treino: " + error.message);
  }
}

async function deletarTreino() {
  const id = document.getElementById("id").value;
  if (!id) return alert("Informe o ID para deletar");

  try {
    const response = await fetch(`${baseUrl}/treinos/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) throw new Error(`Erro ao deletar treino: ${response.status}`);
    listarTreinos();
  } catch (error) {
    console.error("Erro ao deletar treino:", error);
    alert("Erro ao deletar treino: " + error.message);
  }
}

function parseExercicios(texto) {
  if (!texto.trim()) return [];

  return texto.split(',').map(item => {
    const partes = item.trim().split(' ');
    const repeticoes = Number(partes.pop());
    const nome = partes.join(' ');
    return { nome, repeticoes };
  });
}
