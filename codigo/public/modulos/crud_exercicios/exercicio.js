const baseUrl = "https://8c1a12b8-f84f-48f6-9b1e-c9af42686c2c-00-3l7cwykkjqkvx.worf.replit.dev";

document.addEventListener("DOMContentLoaded", () => {
  listarExercicios();

  const form = document.getElementById("exercicioForm");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const exercicio = getDadosFormulario();

    try {
      const response = await fetch(`${baseUrl}/exercicios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(exercicio)
      });

      if (!response.ok) throw new Error("Erro ao criar exercício.");

      listarExercicios();
      form.reset();
    } catch (error) {
      console.error("Erro ao criar:", error);
      alert(error.message);
    }
  });
});

function getDadosFormulario() {
  return {
    id: Number(document.getElementById("id").value),
    nome: document.getElementById("nome").value,
    duracao: Number(document.getElementById("duracao").value),
    repeticoes: Number(document.getElementById("repeticoes").value)
  };
}

async function listarExercicios() {
  try {
    const response = await fetch(`${baseUrl}/exercicios`);
    if (!response.ok) throw new Error("Erro ao listar.");

    const dados = await response.json();
    const tbody = document.querySelector("#exerciciosTable tbody");
    tbody.innerHTML = "";

    dados.forEach((e) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${e.id}</td>
        <td>${e.nome}</td>
        <td>${e.duracao} min</td>
        <td>${e.repeticoes}</td>
      `;
      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error(error);
  }
}

async function atualizarExercicio() {
  const exercicio = getDadosFormulario();

  try {
    const response = await fetch(`${baseUrl}/exercicios/${exercicio.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(exercicio)
    });

    if (!response.ok) throw new Error("Erro ao atualizar.");
    alert("Atualizado com sucesso!");
    listarExercicios();
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
}

async function deletarExercicio() {
  const id = document.getElementById("id").value;
  if (!id) return alert("Informe o ID para deletar");

  try {
    const response = await fetch(`${baseUrl}/exercicios/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) throw new Error("Erro ao deletar.");
    alert("Deletado com sucesso!");
    listarExercicios();
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
}
