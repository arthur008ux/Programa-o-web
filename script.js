document.addEventListener("DOMContentLoaded", carregarAlunos);

    function AdicionarAluno() {
        let nomeInput = document.getElementById("alunoinput");
        let numeroInput = document.getElementById("numeroinput");
        let turmaSelect = document.getElementById('sala');
        let nome = nomeInput.value.trim();
        let numero = numeroInput.value.trim();
        let turma  = turmaSelect.value.trim();

        if (nome === "" || numero === "" || turma === "") return;

        let alunos = JSON.parse(localStorage.getItem("alunos")) || [];

        alunos.push({ nome, numero, turma, concluida: false });
        localStorage.setItem("alunos", JSON.stringify(alunos));

        nomeInput.value = "";
        numeroInput.value = "";
        turma.value = "";
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
            if (aluno.turma == "Informática"){
            alunoInfo.innerHTML = `${aluno.nome} <sup>nº</sup> <u class='numero'>${aluno.numero}</u> <u class="turma">${aluno.turma}</u>`;
            }
            else if (aluno.turma == "agropecuária"){
                alunoInfo.innerHTML = `${aluno.nome} <sup>nº</sup> <u class='numero'>${aluno.numero}</u> <u class="turma2">${aluno.turma}</u>`;

            }
            else if (aluno.turma == "Energias Renováveis"){
                alunoInfo.innerHTML = `${aluno.nome} <sup>nº</sup> <u class='numero'>${aluno.numero}</u> <u class="turma3">${aluno.turma}</u>`;
            }
            else if (aluno.turma == "Finanças"){
                alunoInfo.innerHTML = `${aluno.nome} <sup>nº</sup> <u class='numero'>${aluno.numero}</u> <u class="turma4">${aluno.turma}</u>`;
            }
            else if (aluno.turma == "Administração"){
                alunoInfo.innerHTML = `${aluno.nome} <sup>nº</sup> <u class='numero'>${aluno.numero}</u> <u class="turma5">${aluno.turma}</u>`;
            }    
            li.appendChild(alunoInfo);
            
            if (aluno.concluida) {
                li.classList.add("concluida");
            }

            li.onclick = function() {
                aluno.concluida = !aluno.concluida;
                alunos[index] = aluno;
                localStorage.setItem("alunos", JSON.stringify(alunos) );
                renderizarAlunos();
            };

            let btnRemover = document.createElement("button");
            btnRemover.setAttribute('id', 'casa');
            btnRemover.textContent = "Remover";
            
            
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