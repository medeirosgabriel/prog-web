class Pessoa {
    constructor(nome, nascimento) {
        this.nome = nome
        this.nascimento = nascimento
    }

    idade() {
        const dt = new Date()
        const date = dt.getDate()
        const month = dt.getMonth() + 1
        const year = dt.getFullYear()

        if (date < this.nascimento[0] && month < this.nascimento[1]) {
            return year - this.nascimento[2] - 1 
        } else {
            return year - this.nascimento[2]
        }
    }

    toString() {
        return `${this.nome} tem ${this.idade()} anos`
    }
}

export function cria_pessoa(nome, nascimento) {
    const p = new Pessoa(nome, nascimento)
    return p
}
