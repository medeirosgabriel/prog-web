import {cria_pessoa, Pessoa} from "./utils.mjs"

(function main() {

    const p1 = new Pessoa("Ana", [20, 8, 2002])
    const p2 = new Pessoa("Bruno", [15, 6, 2001])
    const p3 = new Pessoa("Clara", [18, 11, 2003])
    const l = [p1, p2, p3]

    for (let i = 0; i < l.length; i++) {
        console.log(l[i].toString())
    }
})()
