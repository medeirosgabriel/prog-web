import {cria_pessoa} from "./utils.mjs"

(function main() {

    const p1 = cria_pessoa("Ana", [20, 8, 2002])
    const p2 = cria_pessoa("Bruno", [15, 6, 2001])
    const p3 = cria_pessoa("Clara", [18, 11, 2003])
    const l = [p1, p2, p3]

    for (let i = 0; i < l.length; i++) {
        console.log(l[i].toString())
    }
})()
