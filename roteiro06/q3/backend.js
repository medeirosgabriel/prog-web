async function fetch_disciplinas() {
    return new Promise((res, rej) => {
        setTimeout(() => {
            const db = localStorage.getItem("cc_db")
            const disciplinas = JSON.parse(db).disciplinas;
            res(disciplinas);
        }, latencia());
    });
}

async function add_disciplina(disciplina) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            const db = localStorage.getItem("cc_db")
            const disciplinas = JSON.parse(db).disciplinas;
            disciplinas.push(disciplina);
            localStorage.setItem("cc_db", JSON.stringify({disciplinas}));
            res(disciplina);
        }, latencia());
    });
}

async function del_disciplina(idx) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            const db = localStorage.getItem("cc_db")
            const disciplinas = JSON.parse(db).disciplinas;
            disciplinas.splice(idx, 1);
            localStorage.setItem("cc_db", JSON.stringify({disciplinas}));
            res(disciplinas);
        }, latencia());
    });
}

// Este é o objeto exportado por este módulo.
export const backend = {
    add_disciplina,
    fetch_disciplinas,
    del_disciplina
};

// Código de inicialização do mock do BD no localStorage.
(function init_mock_backend() {
    const cc_db = localStorage.getItem("cc_db");
    if (!cc_db) {
        const db = {disciplinas: []};
        localStorage.setItem("cc_db", JSON.stringify(db));
    }
}());

// Gera um número aleatório a ser usado para simular a 
// latência do acesso à API em cada acesso.
function latencia() {
    const MAX_TEMPO = 1000;
    return Math.trunc(Math.random() * MAX_TEMPO);
}

window._show = function () {
    // Esta função é apenas para fins de depuração. Ela permite acompanhar o
    // valor do conteúdo do banco de dados mock (mantido, na verdade, no
    // localStorage). Para usá-la, rode `_show()` no console do browser, após
    // abrir a página do app.
    const db = JSON.parse(localStorage.getItem("cc_db"));
    console.clear();
    console.log(new Date());
    console.table(db.disciplinas);
    setTimeout(show, 250);
};
