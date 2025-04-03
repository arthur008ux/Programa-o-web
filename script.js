document.addEventListener("DOMContentLoaded", carregarAlunos);

function AdicionarAluno() {
    let nomeInput = document.getElementById("alunoinput");
    let numeroInput = document.getElementById("numeroinput");
    let turmaSelect = document.getElementById("sala");
    let nome = nomeInput.value.trim();
    let numero = numeroInput.value.trim();
    let turma = turmaSelect.value.trim();

    if (nome === "" || numero === "" || turma === "") return;

    let alunos = JSON.parse(localStorage.getItem("alunos")) || [];
    alunos.push({ nome, numero, turma, concluida: false });
    localStorage.setItem("alunos", JSON.stringify(alunos));

    nomeInput.value = "";
    numeroInput.value = "";
    turmaSelect.value = "";
    renderizarAlunos();
}

function carregarAlunos() {
    renderizarAlunos();
}

function renderizarAlunos() {
    let lista = document.getElementById("listaAlunos");
    lista.innerHTML = "";

    let header = document.createElement("div");
    header.setAttribute("id", "listaAlunosHeader");
    header.innerHTML = `
        <span>Nome</span>
        <span>Número</span>
        <span>Turma</span>
        <span>Ações</span>
    `;
    lista.appendChild(header);

    let alunos = JSON.parse(localStorage.getItem("alunos")) || [];

    alunos.forEach((aluno, index) => {
        let li = document.createElement("li");

        let nomeSpan = document.createElement("span");
        nomeSpan.textContent = aluno.nome;
        nomeSpan.classList.add("aluno-info");

        let numeroSpan = document.createElement("span");
        numeroSpan.textContent = aluno.numero;

        let turmaSpan = document.createElement("span");
        turmaSpan.textContent = aluno.turma;

        let btnRemover = document.createElement("button");
        btnRemover.setAttribute('id', 'casa');
        btnRemover.textContent = "❌";
        btnRemover.onclick = function (event) {
            event.stopPropagation();
            alunos.splice(index, 1);
            localStorage.setItem("alunos", JSON.stringify(alunos));
            renderizarAlunos();
        };

        li.appendChild(nomeSpan);
        li.appendChild(numeroSpan);
        li.appendChild(turmaSpan);
        li.appendChild(btnRemover);

        lista.appendChild(li);
    });
}


function limparAlunos() {
    localStorage.removeItem("alunos");
    renderizarAlunos();
}
