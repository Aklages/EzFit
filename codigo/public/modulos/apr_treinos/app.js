const treinoDiv = $("#resumoTreino");
const diasSemanaDiv = $("#diasSemana");
const diasNomes = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const treinoId = JSON.parse(sessionStorage.getItem('usuarioCorrente')).treino;

$("#button").on("click", function () {
    let usuario = JSON.parse(sessionStorage.getItem('usuarioCorrente'));
    fetch(`http://localhost:3000/usuarios/${usuario.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ treino: 0 })
    })
    .then(res => res.json())
    .then(usuarioAtualizado => {
        console.log(usuarioAtualizado);
        sessionStorage.setItem('usuarioCorrente', JSON.stringify(usuarioAtualizado));
        window.location.href = "http://localhost:3000/modulos/apr_sugerir_treinos/detalhes.html"
    })
});


let treinoSelecionado;
let exerciciosRelacionados = [];

let treinos = [];
let exercicios = [];
let relacoes = [];

carregarTreinos();
carregarExercicios();
carregarRelacoes();

function carregarTreinos() {
    fetch('/treinos')
        .then(res => res.json())
        .then(data => {
            treinos = data;
            processarDadosSeTudoCarregado();
        });
}

function carregarExercicios() {
    fetch('/exercicios')
        .then(res => res.json())
        .then(data => {
            exercicios = data;
            processarDadosSeTudoCarregado();
        });
}

function carregarRelacoes() {
    fetch('/treinos_exercicios')
        .then(res => res.json())
        .then(data => {
            relacoes = data;
            processarDadosSeTudoCarregado();
        });
}

function processarDadosSeTudoCarregado() {
    if (treinos.length && exercicios.length && relacoes.length) {
        treinoSelecionado = treinos.find(t => t.id == treinoId);

        const idsExercicios = relacoes
            .filter(te => te.treinoId == treinoId)
            .map(te => te.exercicioId);

        exerciciosRelacionados = exercicios.filter(ex => idsExercicios.includes(ex.id));

        exibirResumoTreino();
        exibirDiasSemana();
    }
}

function exibirResumoTreino() {
    treinoDiv.html(`
        <div class="p-3 border rounded shadow-sm mb-3 bg-light">
            <h3>Informações do Treino:</h3>
            <p><strong>Objetivo:</strong> ${treinoSelecionado.objetivo.replace("_", " ")}</p>
            <p><strong>Local:</strong> ${treinoSelecionado.local}</p>
            <p><strong>Duração:</strong> ${treinoSelecionado.tempo_livre_m} min</p>
        </div>
    `);
}

function exibirDiasSemana() {
    const qtdDias = treinoSelecionado.dias;
    const diasIndices = distribuirDias(qtdDias);

    for (let i = 0; i < 7; i++) {
        const isTreino = diasIndices.includes(i);
        const diaId = `dia-${i}`;
        const card = $(`
            <div class="card p-2 mb-2 ${isTreino ? 'bg-success text-white' : 'bg-light'}" style="width: 100%">
                <div class="d-flex justify-content-between align-items-center">
                    <h5 class="mb-0">${diasNomes[i]}</h5>
                    ${isTreino ? `<button class="btn btn-sm btn-light toggle-btn" data-target="${diaId}">▼</button>` : ""}
                </div>
                ${isTreino ? `<div class="mt-2 exercicios-dia d-none" id="${diaId}">${gerarExerciciosHTML()}</div>` : `<p class="text-center mb-0">Descanso</p>`}
            </div>
        `);

        diasSemanaDiv.append(card);
    }

    diasSemanaDiv.on("click", ".toggle-btn", function () {
        const targetId = $(this).data("target");
        const target = $(`#${targetId}`);
        target.toggleClass("d-none");
        const isOpen = !target.hasClass("d-none");
        $(this).text(isOpen ? "▲" : "▼");
    });
}

function gerarExerciciosHTML() {
    return exerciciosRelacionados.map(ex => `
        <div class="ps-3 mb-2">
            <p><strong>Nome:</strong> ${ex.nome}</p>
            ${ex.repeticoes ? `<p><strong>Repetições:</strong> ${ex.repeticoes}</p>` : ""}
            ${ex.duracao_min ? `<p><strong>Duração:</strong> ${ex.duracao_min} min</p>` : ""}
            <hr>
        </div>
    `).join("");
}

function distribuirDias(qtd) {
    const base = [1, 3, 5, 0, 2, 4, 6];
    return base.slice(0, qtd).sort((a, b) => a - b);
}

