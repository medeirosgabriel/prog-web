import { backend } from './backend.js';
import { pubsub } from './pubsub.js';

const $template = document.createElement("template");

$template.innerHTML = `
    <h1>Disciplinas</h1>
    <div></div>
    <p></p>
`;

class PW_Listagem extends HTMLElement {
    async connectedCallback() {
        let clone = $template.content.cloneNode(true);
        this.appendChild(clone);

        pubsub.subscribe(this, "add")

        this.$disciplinas = this.querySelector("div");
        this.$contagem = this.querySelector("p");
        //this.disciplinas = await backend.fetch_disciplinas();
        this.disciplinas = await backend.fetch_disciplinas();
        this.update();
    }

    update() {
        this.$disciplinas.innerHTML = "";
        this.disciplinas.forEach((d, i) => {
            const $d = document.createElement("pw-disciplina");
            $d.innerHTML = `
                <button>&times;</button>
                <pw-disc-nome>${d.nome}</pw-disc-nome>
                <pw-disc-periodo>${d.periodo}</pw-disc-periodo>
            `;
            this.$disciplinas.appendChild($d);
            const $b = $d.querySelector("button");
            $b.addEventListener("click", () => this.handle_click($d, i));
        });
        this.$contagem.innerText = `(${this.disciplinas.length} disciplinas)`;
    }

    async handle_click($d, i) {
        //alert("PW_Listagem::handle_click: a ser feito");
        //console.log("PW_Listagem::handle_click: a ser feito");
        this.disciplinas = await backend.del_disciplina(i)
        pubsub.post("delete", this.disciplinas)
        this.update()
    }

    async receive(disciplinas) {
        this.disciplinas = disciplinas;
        this.update();
    }
}

//setInterval(() => location.reload(true), 2000);
customElements.define("pw-listagem", PW_Listagem);
