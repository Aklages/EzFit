const treinoDiv = $("#treino");

let treinoId = JSON.parse(sessionStorage.getItem('usuarioCorrente')).treino;

fetch(`/treinos/${treinoId}`)
.then(res => res.json())
.then(treino => {
    treinoDiv.html(
        `
        <p>Objetivo do treino: ${treino.objetivo}</p>
        <p>Local do treino: ${treino.local}</p>
        <p>Tempo do treino: ${treino.tempo_livre_m}</p>
        <h3>Exercicios: </h3>
        `
    )
})

fetch(`/treinos_exercicios?treinoId=${treinoId}&_expand=exercicio`)
.then(res => res.json())
.then(exercicios => {
    exercicios.forEach(exercicio => {
        let ex = exercicio.exercicio;
        treinoDiv.append(
        `
        <p>nome: ${ex.nome}</p>
        <p>repeticoes: ${ex.repeticoes}</p>
        <p>duracao_min: ${ex.duracao_min}</p>
        `
    )
    });
})