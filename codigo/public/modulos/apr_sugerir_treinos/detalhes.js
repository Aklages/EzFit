let suggestedTreinoId = null; // Variável para armazenar o ID do treino sugerido

document.getElementById('formSugerirTreino').addEventListener('submit', function (e) {
    e.preventDefault();

    const localPreferido = document.getElementById('localTreino').value;
    const tempoPreferido = parseInt(document.getElementById('tempoTreino').value, 10);
    const diasPreferidos = parseInt(document.getElementById('diasTreino').value, 10);
    const tipoPreferido = document.getElementById('tipoAtividade').value; // 'hipertrofia' ou 'cardio'

    const resultadoDiv = document.getElementById('resultadoSugestao');
    const divEscolherTreino = document.getElementById('divEscolherTreino');
    
    resultadoDiv.innerHTML = `<p>Buscando a melhor sugestão para você...</p>`;
    divEscolherTreino.style.display = 'none'; // Esconde o botão de escolher enquanto busca

    fetch('/treinos')
        .then(res => res.json())
        .then(treinos => {
            let melhorTreino = null;
            let maiorPontuacao = -Infinity;

            treinos.forEach(treino => {
                let pontuacao = 0;

                // --- Mapeamento do Objetivo do Treino para 'hipertrofia' ou 'cardio' ---
                let objetivoTreinoMapeado;
                if (treino.objetivo === 'ganhar_musculo' || treino.objetivo === 'hipertrofia_avancada' || treino.objetivo === 'intensivo') {
                    objetivoTreinoMapeado = 'hipertrofia';
                } else if (treino.objetivo === 'perder_peso' || treino.objetivo === 'aumentar_resistencia' || treino.objetivo === 'cardio_puro' || treino.objetivo === 'leve_diario' || treino.objetivo === 'condicionamento_fisico' || treino.objetivo === 'iniciante' || treino.objetivo === 'manter_saude') {
                    objetivoTreinoMapeado = 'cardio';
                } else if (treino.objetivo === 'hipertrofia' || treino.objetivo === 'cardio') {
                    objetivoTreinoMapeado = treino.objetivo; // Se já está no formato, usa direto
                } else if (treino.objetivo === 'tudo') {
                    objetivoTreinoMapeado = null; // Não há um mapeamento direto, será tratado abaixo
                }
                
                // --- Critério 1: Dias da Semana (Peso MÁXIMO) ---
                if (treino.dias === diasPreferidos) {
                    pontuacao += 500;
                } else {
                    pontuacao -= Math.abs(treino.dias - diasPreferidos) * 100;
                }

                // --- Critério 2: Tipo de Atividade / Objetivo (Peso ALTO) ---
                if (objetivoTreinoMapeado === tipoPreferido) {
                    pontuacao += 300;
                } else if (treino.objetivo === 'tudo') {
                    pontuacao += 50; 
                } else {
                    pontuacao -= 150; 
                }

                // --- Critério 3: Local de Treino (Peso MÉDIO) ---
                if (treino.local.toLowerCase() === localPreferido.toLowerCase()) {
                    pontuacao += 150;
                } else {
                    pontuacao -= 50;
                }

                // --- Critério 4: Tempo Disponível (Peso MENOR, com flexibilidade) ---
                const tempoDiff = Math.abs(treino.tempo_livre_m - tempoPreferido);
                if (tempoDiff <= 15) {
                    pontuacao += (15 - tempoDiff) * 5;
                } else {
                    pontuacao -= tempoDiff * 2; 
                }

                // Atualiza o melhor treino encontrado
                if (pontuacao > maiorPontuacao) {
                    maiorPontuacao = pontuacao;
                    melhorTreino = treino;
                }
            });

            if (!melhorTreino || maiorPontuacao < -200) {
                resultadoDiv.innerHTML = `<p class="text-info">Não foi possível encontrar um treino que se encaixe bem com todas as suas preferências. Por favor, tente ajustar os critérios de busca.</p>`;
                suggestedTreinoId = null; // Reseta o ID do treino sugerido
                divEscolherTreino.style.display = 'none'; // Garante que o botão esteja oculto
                return;
            }
            
            // Armazena o ID do treino sugerido na variável global
            suggestedTreinoId = melhorTreino.id;

            let html = `
                <h5>Sua Sugestão de Treino:</h5>
                <p><strong>Objetivo:</strong> ${melhorTreino.objetivo.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}</p>
                <p><strong>Local:</strong> ${melhorTreino.local.replace(/\b\w/g, char => char.toUpperCase())}</p>
                <p><strong>Tempo:</strong> ${melhorTreino.tempo_livre_m} minutos</p>
                <p><strong>Dias por semana:</strong> ${melhorTreino.dias} dias</p>
                <h6>Exercícios:</h6>
            `;

            fetch(`/treinos_exercicios?treinoId=${melhorTreino.id}`)
                .then(res => res.json())
                .then(treinosExercicios => {
                    const exercicioIds = treinosExercicios.map(te => te.exercicioId);
                    
                    if (exercicioIds.length === 0) {
                        html += `<p class="text-muted">Nenhum exercício associado a este treino.</p>`;
                        resultadoDiv.innerHTML = html;
                        divEscolherTreino.style.display = 'block'; // Mostra o botão mesmo sem exercícios se o treino foi sugerido
                        return;
                    }

                    const fetchExerciciosPromises = exercicioIds.map(id => 
                        fetch(`/exercicios/${id}`).then(res => res.json())
                    );

                    Promise.all(fetchExerciciosPromises)
                        .then(exerciciosDetalhes => {
                            exerciciosDetalhes.forEach(ex => {
                                html += `
                                    <div style="border: 1px solid #ddd; padding: 8px; margin-bottom: 5px; border-radius: 4px;">
                                        <p><strong>Nome:</strong> ${ex.nome}</p>
                                        <p><strong>Repetições:</strong> ${ex.repeticoes ? ex.repeticoes : 'N/A'}</p>
                                        <p><strong>Duração (min):</strong> ${ex.duracao_min ? ex.duracao_min : 'N/A'}</p>
                                    </div>
                                `;
                            });
                            resultadoDiv.innerHTML = html;
                            divEscolherTreino.style.display = 'block'; // Mostra o botão "Escolher este Treino"
                        })
                        .catch(err => {
                            resultadoDiv.innerHTML = `<p class="text-danger">Erro ao carregar detalhes dos exercícios: ${err.message}</p>`;
                            console.error('Erro ao carregar detalhes dos exercícios:', err);
                            suggestedTreinoId = null;
                            divEscolherTreino.style.display = 'none';
                        });
                })
                .catch(err => {
                    resultadoDiv.innerHTML = `<p class="text-danger">Erro ao buscar associações de treino-exercício: ${err.message}</p>`;
                    console.error('Erro ao buscar treinos_exercicios:', err);
                    suggestedTreinoId = null;
                    divEscolherTreino.style.display = 'none';
                });
        })
        .catch(err => {
            resultadoDiv.innerHTML = `<p class="text-danger">Erro ao buscar treinos: ${err.message}</p>`;
            console.error('Erro ao buscar treinos:', err);
            suggestedTreinoId = null;
            divEscolherTreino.style.display = 'none';
        });
});

// Listener para o novo botão "Escolher este Treino"
document.getElementById('btnEscolherTreino').addEventListener('click', function() {
    if (suggestedTreinoId) {
        let usuario = JSON.parse(sessionStorage.getItem('usuarioCorrente'));
        fetch(`/usuarios/${usuario.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ treino: suggestedTreinoId }) // Atualiza o campo 'treino' do usuário
        })
        .then(res => res.json())
        .then(usuarioAtualizado => {
            console.log("Usuário atualizado com novo treino:", usuarioAtualizado);
            sessionStorage.setItem('usuarioCorrente', JSON.stringify(usuarioAtualizado)); // Atualiza o sessionStorage
            alert('Treino escolhido com sucesso!');
            window.location.href = "/modulos/apr_treinos/index.html"; // Redireciona para a página de apresentação do treino
        })
        .catch(err => {
            alert('Erro ao salvar o treino. Tente novamente.');
            console.error('Erro ao salvar o treino:', err);
        });
    } else {
        alert('Nenhum treino foi sugerido ainda.');
    }
});