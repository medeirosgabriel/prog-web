
function cria_pessoa(nome, nascimento) {
    const p = {
        nome: nome,
        nascimento: nascimento,
        idade: function () {
            const dt = new Date()
            const date = dt.getDate()
            const month = dt.getMonth() + 1
            const year = dt.getFullYear()

            if (date < this.nascimento[0] && month < this.nascimento[1]) {
                return year - this.nascimento[2] - 1 
            } else {
                return year - this.nascimento[2]
            }
        },
        toString: function () {
            return `${this.nome} tem ${this.idade()} anos`
        }
    }

    return p
}

const p1 = cria_pessoa("Ana", [20, 8, 2002])
const p2 = cria_pessoa("Bruno", [15, 6, 2001])
const p3 = cria_pessoa("Clara", [18, 11, 2003])
const l = [p1, p2, p3]

for (let i = 0; i < l.length; i++) {
    console.log(l[i].toString())
}
