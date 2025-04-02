document.addEventListener("DOMContentLoaded", carregarAlunos);

    function AdicionarAluno() {
        let nomeInput = document.getElementById("alunoinput");
        let numeroInput = document.getElementById("numeroinput");
        let nome = nomeInput.value.trim();
        let numero = numeroInput.value.trim();

        if (nome === "" || numero === "") return;

        let alunos = JSON.parse(localStorage.getItem("alunos")) || [];

        alunos.push({ nome, numero, concluida: false });
        localStorage.setItem("alunos", JSON.stringify(alunos));

        nomeInput.value = "";
        numeroInput.value = "";
        renderizarAlunos();
    }

    function carregarAlunos() {
        renderizarAlunos();
    }

    function renderizarAlunos() {
        let lista = document.getElementById("listaAlunos");
        lista.innerHTML = "";
        let alunos = JSON.parse(localStorage.getItem("alunos")) || [];

        alunos.forEach((aluno, index) => {
            let li = document.createElement("li");
            let alunoInfo = document.createElement("span");
            alunoInfo.classList.add("aluno-info");
            alunoInfo.innerHTML = `${aluno.nome} <sup>nº</sup> <u class='numero'>${aluno.numero}</u>`;
            
            li.appendChild(alunoInfo);
            
            if (aluno.concluida) {
                li.classList.add("concluida");
            }

            li.onclick = function() {
                aluno.concluida = !aluno.concluida;
                alunos[index] = aluno;
                localStorage.setItem("alunos", JSON.stringify(alunos));
                renderizarAlunos();
            };

            let btnRemover = document.createElement("button");
            btnRemover.textContent = "Remove";
            btnRemover.onclick = function(event) {
                event.stopPropagation();
                alunos.splice(index, 1);
                localStorage.setItem("alunos", JSON.stringify(alunos));
                renderizarAlunos();
            };

            li.appendChild(btnRemover);
            lista.appendChild(li);
        });
    }

    function limparAlunos() {
        localStorage.removeItem("alunos");
        renderizarAlunos();
    }