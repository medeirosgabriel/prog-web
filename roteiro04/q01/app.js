const p = {
    nome: "Ana",
    nascimento: [20,8,2002],
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

console.log(p.toString())
