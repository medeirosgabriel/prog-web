import { backend } from './backend.js';
import { pubsub } from './pubsub.js';

const $template = document.createElement("template");

$template.innerHTML = `
    <h1>Cadastro</h1>
    <div>
      Nome: <input id="nome" type="text">
      Período: <input id="periodo" type="text", size="3">
      <span></span>
      <button>&hellip;</button>
    </div>
    <p>(<span id="contagem">&hellip;</span> disciplinas)</p>
`;

class PW_Cadastro extends HTMLElement {
    async connectedCallback() {
        let clone = $template.content.cloneNode(true);
        this.appendChild(clone);
        
        pubsub.subscribe(this, "delete")

        this.$nome = this.querySelector("#nome");
        this.$periodo = this.querySelector("#periodo");
        this.$button = this.querySelector("button");
        this.$contagem = this.querySelector("#contagem");

        this.disciplinas = await backend.fetch_disciplinas();
        this.$button.addEventListener("click", () => this.handle_click());
        this.$nome.addEventListener("change", () => this.$periodo.focus());
        this.$periodo.addEventListener("change", () => this.$button.focus());
        this.$nome.focus();

        this.update();
    }

    async handle_click() {
        const nome = this.$nome.value;
        const periodo = this.$periodo.value;
        if (!nome) {
            this.$nome.focus();
            return;
        }
        if (!periodo) {
            this.$periodo.focus();
            return;
        }
        this.$nome.disabled = true;
        this.$periodo.disabled = true;
        this.$button.style.backgroundColor = 'yellow';
        this.$button.innerText = "salvando...";
        await backend.add_disciplina({nome, periodo});
        this.disciplinas.push({nome, periodo});
        this.$nome.value = "";
        this.$periodo.value = "";
        this.$nome.disabled = false;
        this.$periodo.disabled = false;
        this.$nome.focus();

        pubsub.post("add", this.disciplinas)

        this.update();
    }

    update() {
        this.$button.style.backgroundColor = '';
        this.$button.innerText = "Salva disciplina";
        this.$contagem.innerText = this.disciplinas.length;
    }

    async receive(disciplinas) {
        this.disciplinas = disciplinas;
        this.update();
    }
}

customElements.define("pw-cadastro", PW_Cadastro);
