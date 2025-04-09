# Introdução

Informações básicas do projeto.

* **Projeto:** EzFit
* **Repositório GitHub:** [Repositório EzFit](https://github.com/ICEI-PUC-Minas-PPLES-TI/plf-es-2025-1-ti1-0385100-ezfit.git)
* **Membros da equipe:**

  * [André Kirst](https://github.com/Aklages)
  * Bruno Henrique
  * Diego Volponi
  * Lucca Maximo
  * Matheus Henrique
  * [Victor Amaral](https://github.com/Vamarall)


A documentação do projeto é estruturada da seguinte forma:

1. Introdução
2. Contexto
3. Product Discovery
4. Product Design
5. Metodologia
6. Solução
7. Referências Bibliográficas

✅ [Documentação de Design Thinking (MIRO)](files/processo-dt.pdf)

# Contexto

Detalhes sobre o espaço de problema, os objetivos do projeto, sua justificativa e público-alvo.

## Problema

O sedentarismo é um problema crescente na sociedade moderna, impulsionado por estilos de vida cada vez mais digitais, rotinas estressantes e a falta de motivação para a prática regular de atividades físicas. Embora muitas pessoas desejem adotar hábitos mais saudáveis, fatores como a escassez de tempo e a ausência de estímulos dificultam o início e a manutenção de uma rotina ativa. Esse cenário contribui para o aumento de problemas de saúde física e mental, tornando urgente a busca por soluções que incentivem mudanças de comportamento.

## Objetivos

O objetivo geral deste trabalho é desenvolver uma aplicação web que auxilie jovens adultos na superação do sedentarismo, oferecendo recomendações personalizadas de atividades físicas com base nas necessidades e preferências individuais dos usuários.

Como objetivos específicos, destacam-se:

* Implementar um sistema de recomendação de atividades físicas considerando fatores como distância, tempo disponível e objetivos pessoais de saúde ou desempenho.
* Propor funcionalidades que incentivem o engajamento do usuário, como vídeos motivacionais, informações científicas sobre os impactos do sedentarismo.
* Disponibilizar a criação e participação de comunidades/grupos de interesse com foco em práticas esportivas coletivas.

## Justificativa

A motivação para a criação do EzFit surgiu a partir da observação da realidade de muitos
jovens adultos, que se encontram desmotivados ou sem tempo. Diversos estudos e levantamentos mostram
as graves consequências do sedentarismo, como obesidade, ansiedade e baixa produtividade.

O grupo realizou entrevistas com pessoas sedentárias que apontaram a falta de tempo e a falta de motivação como as principais
barreiras para iniciar a pratica de exercícios físicos.

Dessa forma, o EzFit se justifica como uma solução inovadora e relevante para esse público,
utilizando recursos tecnológicos para recomendar exercícios físicos de acordo com a disponibilidade do usuário.

## Público-Alvo

O público-alvo da aplicação é composto por jovens adultos, geralmente entre 18 e 25 anos, que desejam adotar hábitos de vida mais saudáveis, mas enfrentam dificuldades para iniciar ou manter uma rotina de atividades físicas. Entre os principais desafios estão a falta de tempo, a ausência de motivação e o desconhecimento sobre quais práticas são mais adequadas para seu perfil e objetivos.

Esses usuários possuem, em geral, familiaridade com tecnologia, estando habituados ao uso de smartphones, redes sociais e plataformas digitais em geral. Por isso, espera-se que tenham facilidade em interagir com a aplicação proposta, principalmente se ela oferecer uma navegação intuitiva e recursos que promovam engajamento.

Exemplos de usuários usando a história de usuário + persona:
Felipe, 22 anos, estagiário, deseja encontrar tempo e motivação para praticar exercícios físicos.
Pedro, 25 anos, Analista financeiro, deseja praticar exercícios físicos para ficar em forma.

# Product Discovery

## Etapa de Entendimento
### Matriz CSD:
![matrizcsd](images/matriz_csd.jpg)

### Mapa de Stakeholders:
![stakeholders](images/mapa_stakeholders.jpg)


### Entrevistas qualitativas:
![entrevista](images/entrevista_1.jpg)
![entrevista](images/entrevista_2.jpg)
![entrevista](images/entrevista_3.jpg)
![entrevista](images/entrevista_4.jpg)
![entrevista](images/entrevista_5.jpg)
![entrevista](images/entrevista_6.jpg)

### Highlights de pesquisa:
![highlight](images/highlight_geral.jpg)

## Etapa de Definição

### Personas

![persona](images/persona_felipe.jpg)
![valor](images/valor_felipe.jpg)

![persona](images/persona_amanda.jpg)
![valor](images/valor_amanda.jpg)

![persona](images/persona_pedro.jpg)
![valor](images/valor_pedro.jpg)

# Product Design

Nesse momento, vamos transformar os insights e validações obtidos em soluções tangíveis e utilizáveis. Essa fase envolve a definição de uma proposta de valor, detalhando a prioridade de cada ideia e a consequente criação de wireframes, mockups e protótipos de alta fidelidade, que detalham a interface e a experiência do usuário.

## Histórias de Usuários

Com base na análise das personas foram identificadas as seguintes histórias de usuários:

| EU COMO...`PERSONA`     | QUERO/PRECISO ...`FUNCIONALIDADE`              | PARA ...`MOTIVO/VALOR`                       |
| ---------------------   | ------------------------------------------     | --------------------------------------       |
| Amanda                  | Praticar atividades em grupo                   | Continuar tendo interação social             |
| Pedro                   | Praticar alguma atividade física               | Perder a barriga e me manter em forma        |
| Felipe                  | Encontrar tempo e motivação                    | Ter uma boa saúde                            |
| Trabalhador CLT 6x1     | Encontrar motivação para exercitar             | Melhorar a minha saúde                       |
| Estudante e estagiário  | Encontrar tempo para exercitar                 | Melhorar a minha saúde                       |
| Jovem diabético         | Manter uma regularidade nas atividades físicas | Controlar minha saúde e manter meu bem estar |
| Estudante universitário | começar uma atividade física                   | Melhorar meus rendimentos nos estudos        |
| Jovem acima do peso     | Fazer atividades físicas                       | Perder peso e melhorar minha autoestima      |
| Jovem adulto            | Incluir exercício físico na rotina             | Evitar doenças hereditárias                  |

## Proposta de Valor

##### Proposta para Persona FELIPE

![proposta](images/proposta_valor_felipe.jpg)

##### Proposta para Persona AMANDA

![proposta](images/proposta_valor_amanda.jpg)

##### Proposta para Persona PEDRO

![proposta](images/proposta_valor_pedro.jpg)

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais

| ID     | Descrição do Requisito                                   | Prioridade |
| ------ | ---------------------------------------------------------- | ---------- |
| RF-001 | A aplicação deve conter uma área de registro | ALTA       |
| RF-002 | A aplicação deve conter propostas de exercícios físicos | ALTA     |
| RF-003 | A aplicação deve conter uma opção de criar rotinas de atividades físicas | ALTA     |
| RF-004 | A aplicação deve conter uma opção de organizar/criar rotina das atividades físicas do usuário | ALTA     |
| RF-005 | A aplicação deve conter um filtro baseado em tempo disponível e localização próxima | ALTA     |
| RF-006 | A aplicação deve conter informações científicas sobre sedentarismo | MÉDIA     |
| RF-007 | A aplicação deve conter uma aba de comunidade, para os usuarios interagirem em grupos de interesse | MÉDIA     |
| RF-008 | A aplicação deve recomendar treinos baseados nas preferência. (Treino em casa, treino na academia) | MÉDIA     |
| RF-009 | A aplicação deve recomendar vídeos motivacionais ou artigos com o intuito de evitar a desmotivação para a prática de atividades fisicas  | MÉDIA     |
| RF-010 | O sistema deve gerar um arquivo csv sobre o treino recomendado  | MÉDIA     |
| RF-011 | A aplicação deve conter uma opção de adicionar amigos | BAIXA     |
| RF-012 | A aplicação deve conter uma opção de olhar perfis de outras pessoas | BAIXA     |

### Requisitos não Funcionais

| ID      | Descrição do Requisito                                                              | Prioridade |
| ------- | ------------------------------------------------------------------------------------- | ---------- |
| RNF-001 | A aplicação será desenvolvida com html, css e bootstrap. | ALTA     |
| RNF-002 | O site será responsível e terá uma visualização adequada para diferentes dispositivos.          | ALTA      |
| RNF-003 | O site deve estar de acordo com as normas da LGPD          | ALTA      |
| RNF-004 | O site deve ter suporte para mais de um idioma          | BAIXA      |
| RNF-005 | O site terá modo noturno          | BAIXA      |

## Projeto de Interface

Artefatos relacionados com a interface e a interacão do usuário na proposta de solução.

### Wireframes

Estes são os protótipos de telas do sistema.

##### TELA HOMEPAGE

Tela inicial, para convencer o usuário a criar seu cadastro no site.

![tela](images/homepage.jpg)

##### TELA REGISTRO

Tela para criar cadastro no site.

![tela](images/registro.jpg)

##### TELA LOGIN

Tela para logar no site.

![tela](images/login.jpg)

##### TELA USUARIO_LOGADO

Tela principal do usuário, com os cards que leva as outras telas com as funcionalidades principais.

![tela](images/usuariologado.jpg)

##### TELA CONFIGURAÇÕES

Tela para configurar sua conta.

![tela](images/config.jpg)

##### TELA MONTAR_TREINO

Tela para montar o treino do usuário usando nosso algoritmo.

![tela](images//monte.jpg)

##### TELA TREINOS

Tela para visualizar os treinos.

![tela](images/treino.jpg)

##### TELA LOCALIZAÇÃO

Tela para encontrar localizações com possibilidade de praticar exercícios físicos.

![tela](images/localizacao.jpg)

##### TELA COMUNIDADE

Tela para encontrar grupos de interesse.

![tela](images/comunidade.jpg)

##### TELA CRIAR_GRUPO

Tela para criar grupos.

![tela](images/criar.jpg)

##### TELA VER_GRUPOS

Tela para visualizar os grupos criados pelo usuário.

![tela](images/meus.jpg)

##### TELA MOTIVAÇÃO

Tela com conteúdos para motivar o usuário.

![tela](images/motivacao.jpg)

##### TELA CONSCIENTIZAÇÃO

Tela com conteúdos para conscientizar o usuário.

![tela](images/motivosparatreinar.jpg)

### User Flow

![userflow](images/userflow.jpg)

### Protótipo Interativo

[Protótipo Interativo EzFit](https://www.figma.com/proto/q5gZfvlqbbKevA76tNFEP8/EzFit?node-id=0-1&t=im2LzitrSZq5L4yf-1)

# Metodologia

Detalhes sobre a organização do grupo e o ferramental empregado.

## Ferramentas

Relação de ferramentas empregadas pelo grupo durante o projeto.

| Ambiente                    | Plataforma | Link de acesso                                     |
| --------------------------- | ---------- | -------------------------------------------------- |
| Processo de Design Thinking | Miro       | https://miro.com/XXXXXXX ⚠️ EXEMPLO ⚠️        |
| Repositório de código     | GitHub     | https://github.com/XXXXXXX ⚠️ EXEMPLO ⚠️      |
| Hospedagem do site          | Render     | https://site.render.com/XXXXXXX ⚠️ EXEMPLO ⚠️ |
| Protótipo Interativo       | MarvelApp  | https://marvelapp.com/XXXXXXX ⚠️ EXEMPLO ⚠️   |
|                             |            |                                                    |

> ⚠️ **APAGUE ESSA PARTE ANTES DE ENTREGAR SEU TRABALHO**
>
> Liste as ferramentas empregadas no desenvolvimento do projeto, justificando a escolha delas, sempre que possível. Inclua itens como: (1) Editor de código, (2) )ferramentas de comunicação, (3) )ferramentas de diagramação, (4) )plataformas de hospedagem, entre outras.

## Gerenciamento do Projeto

Divisão de papéis no grupo e apresentação da estrutura da ferramenta de controle de tarefas (Kanban).

![Exemplo de Kanban](images/exemplo-kanban.png)

> ⚠️ **APAGUE ESSA PARTE ANTES DE ENTREGAR SEU TRABALHO**
>
> Nesta parte do documento, você deve apresentar  o processo de trabalho baseado nas metodologias ágeis, a divisão de papéis e tarefas, as ferramentas empregadas e como foi realizada a gestão de configuração do projeto via GitHub.
>
> Coloque detalhes sobre o processo de Design Thinking e a implementação do Framework Scrum seguido pelo grupo. O grupo poderá fazer uso de ferramentas on-line para acompanhar o andamento do projeto, a execução das tarefas e o status de desenvolvimento da solução.
>
> **Orientações**:
>
> - [Sobre Projects - GitHub Docs](https://docs.github.com/pt/issues/planning-and-tracking-with-projects/learning-about-projects/about-projects)
> - [Gestão de projetos com GitHub | balta.io](https://balta.io/blog/gestao-de-projetos-com-github)
> - [(460) GitHub Projects - YouTube](https://www.youtube.com/playlist?list=PLiO7XHcmTsldZR93nkTFmmWbCEVF_8F5H)
> - [11 Passos Essenciais para Implantar Scrum no seu Projeto](https://mindmaster.com.br/scrum-11-passos/)
> - [Scrum em 9 minutos](https://www.youtube.com/watch?v=XfvQWnRgxG0)

# Solução Implementada

Esta seção apresenta todos os detalhes da solução criada no projeto.

## Vídeo do Projeto

O vídeo a seguir traz uma apresentação do problema que a equipe está tratando e a proposta de solução. ⚠️ EXEMPLO ⚠️

[![Vídeo do projeto](images/video.png)](https://www.youtube.com/embed/70gGoFyGeqQ)

> ⚠️ **APAGUE ESSA PARTE ANTES DE ENTREGAR SEU TRABALHO**
>
> O video de apresentação é voltado para que o público externo possa conhecer a solução. O formato é livre, sendo importante que seja apresentado o problema e a solução numa linguagem descomplicada e direta.
>
> Inclua um link para o vídeo do projeto.

## Funcionalidades

Esta seção apresenta as funcionalidades da solução.Info

##### Funcionalidade 1 - Cadastro de Contatos ⚠️ EXEMPLO ⚠️

Permite a inclusão, leitura, alteração e exclusão de contatos para o sistema

* **Estrutura de dados:** [Contatos](#ti_ed_contatos)
* **Instruções de acesso:**
  * Abra o site e efetue o login
  * Acesse o menu principal e escolha a opção Cadastros
  * Em seguida, escolha a opção Contatos
* **Tela da funcionalidade**:

![Tela de Funcionalidade](images/exemplo-funcionalidade.png)

> ⚠️ **APAGUE ESSA PARTE ANTES DE ENTREGAR SEU TRABALHO**
>
> Apresente cada uma das funcionalidades que a aplicação fornece tanto para os usuários quanto aos administradores da solução.
>
> Inclua, para cada funcionalidade, itens como: (1) titulos e descrição da funcionalidade; (2) Estrutura de dados associada; (3) o detalhe sobre as instruções de acesso e uso.

## Estruturas de Dados

Descrição das estruturas de dados utilizadas na solução com exemplos no formato JSON.Info

##### Estrutura de Dados - Contatos   ⚠️ EXEMPLO ⚠️

Contatos da aplicação

```json
  {
    "id": 1,
    "nome": "Leanne Graham",
    "cidade": "Belo Horizonte",
    "categoria": "amigos",
    "email": "Sincere@april.biz",
    "telefone": "1-770-736-8031",
    "website": "hildegard.org"
  }
  
```

##### Estrutura de Dados - Usuários  ⚠️ EXEMPLO ⚠️

Registro dos usuários do sistema utilizados para login e para o perfil do sistema

```json
  {
    id: "eed55b91-45be-4f2c-81bc-7686135503f9",
    email: "admin@abc.com",
    id: "eed55b91-45be-4f2c-81bc-7686135503f9",
    login: "admin",
    nome: "Administrador do Sistema",
    senha: "123"
  }
```

> ⚠️ **APAGUE ESSA PARTE ANTES DE ENTREGAR SEU TRABALHO**
>
> Apresente as estruturas de dados utilizadas na solução tanto para dados utilizados na essência da aplicação quanto outras estruturas que foram criadas para algum tipo de configuração
>
> Nomeie a estrutura, coloque uma descrição sucinta e apresente um exemplo em formato JSON.
>
> **Orientações:**
>
> * [JSON Introduction](https://www.w3schools.com/js/js_json_intro.asp)
> * [Trabalhando com JSON - Aprendendo desenvolvimento web | MDN](https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Objects/JSON)

## Módulos e APIs

Esta seção apresenta os módulos e APIs utilizados na solução

**Images**:

* Unsplash - [https://unsplash.com/](https://unsplash.com/) ⚠️ EXEMPLO ⚠️

**Fonts:**

* Icons Font Face - [https://fontawesome.com/](https://fontawesome.com/) ⚠️ EXEMPLO ⚠️

**Scripts:**

* jQuery - [http://www.jquery.com/](http://www.jquery.com/) ⚠️ EXEMPLO ⚠️
* Bootstrap 4 - [http://getbootstrap.com/](http://getbootstrap.com/) ⚠️ EXEMPLO ⚠️

> ⚠️ **APAGUE ESSA PARTE ANTES DE ENTREGAR SEU TRABALHO**
>
> Apresente os módulos e APIs utilizados no desenvolvimento da solução. Inclua itens como: (1) Frameworks, bibliotecas, módulos, etc. utilizados no desenvolvimento da solução; (2) APIs utilizadas para acesso a dados, serviços, etc.

# Referências

As referências utilizadas no trabalho foram:

* SOBRENOME, Nome do autor. Título da obra. 8. ed. Cidade: Editora, 2000. 287 p ⚠️ EXEMPLO ⚠️

> ⚠️ **APAGUE ESSA PARTE ANTES DE ENTREGAR SEU TRABALHO**
>
> Inclua todas as referências (livros, artigos, sites, etc) utilizados no desenvolvimento do trabalho.
>
> **Orientações**:
>
> - [Formato ABNT](https://www.normastecnicas.com/abnt/trabalhos-academicos/referencias/)
> - [Referências Bibliográficas da ABNT](https://comunidade.rockcontent.com/referencia-bibliografica-abnt/)
