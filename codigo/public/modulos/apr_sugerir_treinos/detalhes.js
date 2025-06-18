document.getElementById('formSugerirTreino').addEventListener('submit', function (e) {
    e.preventDefault();

    const local = document.getElementById('localTreino').value;
    const tempo = parseInt(document.getElementById('tempoTreino').value, 10);
    const tipo = document.getElementById('tipoAtividade').value;

    const resultadoDiv = document.getElementById('resultadoSugestao');
    resultadoDiv.innerHTML = `<p>Buscando sugestões para você...</p>`;

    fetch('/treinos')
        .then(res => res.json())
        .then(treinos => {
            
            const sugestoes = treinos.filter(t => {
                const localMatch = t.local.toLowerCase().includes(local.toLowerCase());
                const tempoMatch = t.tempo_livre_m <= tempo + 10 && t.tempo_livre_m >= tempo - 10;
                const tipoMatch = t.objetivo.toLowerCase().includes(tipo.toLowerCase());

                return localMatch && tempoMatch && tipoMatch;
            });

            let treino;
            if (sugestoes.length > 0) {
                treino = sugestoes[0];
            } else {
                treino = treinos[0];
            }

            // Monta resultado do treino
            let html = `
                <h5>Sugestão de treino para você:</h5>
                <p><strong>Objetivo:</strong> ${treino.objetivo}</p>
                <p><strong>Local:</strong> ${treino.local}</p>
                <p><strong>Tempo:</strong> ${treino.tempo_livre_m} minutos</p>
                <h6>Exercícios disponíveis:</h6>
            `;

            // função que busca os exercícios, AINDA NÃO ESTA 100% PRONTA, TENHO QUE CONSERTAR O JSON E ARRUMAR ISSO (Nota dia 10/06)
            fetch('/exercicios')
                .then(res => res.json())
                .then(exercicios => {
                    exercicios.forEach(ex => {
                        html += `
                            <div style="border: 1px solid #ddd; padding: 8px; margin-bottom: 5px; border-radius: 4px;">
                                <p><strong>Nome:</strong> ${ex.nome}</p>
                                <p><strong>Repetições:</strong> ${ex.repeticoes}</p>
                                <p><strong>Duração (min):</strong> ${ex.duracao_min}</p>
                            </div>
                        `;
                    });
                    resultadoDiv.innerHTML = html;
                })
                .catch(err => {
                    resultadoDiv.innerHTML = `<p class="text-danger">Erro ao buscar exercícios: ${err.message}</p>`;
                });
        })
        .catch(err => {
            resultadoDiv.innerHTML = `<p class="text-danger">Erro ao buscar treinos: ${err.message}</p>`;
        });
});
