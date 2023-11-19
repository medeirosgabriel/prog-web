import { backend } from './backend.js';

const $cadastro = document.querySelector("pw-cadastro");
const $template = document.createElement("template");

$template.innerHTML = `
    <h1>Status</h1>
    <div></div>
`;

class PW_Resumo extends HTMLElement {
    async connectedCallback() {
        //alert("PW_Resumo::connectedCallback: a ser feito");
        //console.log("PW_Resumo::connectedCallback: a ser feito");
        let clone = $template.content.cloneNode(true);
        this.appendChild(clone);

        this.$resumo = this.querySelector("div");
        //this.disciplinas = await backend.fetch_disciplinas();
        this.disciplinas = await $cadastro.getDisciplinas();
        this.update();
    }

    update() {
        this.$resumo.innerHTML = "<div></div>"
        let group = {}

        this.disciplinas.forEach((d, i) => {
            if (!(d.periodo in group)) {
                group[d.periodo] = 1
            } else {    
                group[d.periodo] += 1
            }
        });

        let count_disc = 0
        let count_per = 0;

        for (const key in group) {
            const $periodo = document.createElement("pw-periodo");
            $periodo.innerHTML = `
                <pw-num>NUM</pw-num>
                <pw-text>disciplinas em</pw-text>
                <pw-text>PERIODO</pw-text>
                <br>
            `;
            const n = $periodo.querySelector("pw-num")
            const p = $periodo.querySelectorAll("pw-text")[1]

            n.textContent = `${group[key]}`
            p.textContent = `${key}`

            count_per += 1
            count_disc += group[key]

            this.$resumo.appendChild($periodo);
        }
        // adicione ainda um parágrafo contendo
        // o número total de períodos e de disciplinas
        // cadastradas
        let $quantities = document.createElement("p");
        $quantities.innerHTML = `(${count_per} periodos, ${count_disc} disciplinas)`
        this.$resumo.appendChild($quantities)
    }

    async notify() {
        this.disciplinas = await $cadastro.getDisciplinas();
        this.update();
    }
}

customElements.define("pw-status", PW_Resumo);
