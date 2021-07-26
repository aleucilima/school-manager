module.exports = {
    age: function(timestamp) {
        const today = new Date()
        const birthDate = new Date(timestamp)

        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()

        if (month < 0 || month == 0 && today.getDate() < birthDate.getDate()){
            age = age - 1
        }
        
        return age
    },

    graduation: function (degree){
        switch(degree) {
            case ('H'): return 'Ensino Médio Completo'
            case ('G'): return 'Ensino Superior Completo'
            case ('M'): return 'Mestrado'
            case ('D'): return 'Doutorado'
        }
    },

    grade: function(degree) {
        switch (degree) {
            case ('fifth'): return '5º Ano do Ensino Fundamental'
            case ('sixth'): return '6º Ano do Ensino Fundamental'
            case ('seventh'): return '7º Ano do Ensino Fundamental'
            case ('eighth'): return '8º Ano do Ensino Fundamental'
            case ('ninth'): return '9º Ano do Ensino Fundamental'
            case ('first'): return '1º Ano do Ensino Médio'
            case ('second'): return '2º Ano do Ensino Médio'
            case ('third'): return '3º Ano do Ensino Médio'
        }
    },

    date: function(timestamp) {
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`
        }
    }
}