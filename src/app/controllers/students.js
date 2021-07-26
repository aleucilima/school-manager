const { age, grade, date } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
    index(request, response) {
        return response.render('students/index')
    },
    create(request, response) {
        return response.render('students/create')
    },
    post(request, response) {
        const keys = Object.keys(request.body)
        
        for(key of keys) {
            if (request.body[key] == '')
                return response.send('Please, fill all fields')
        }
        
        const query = `
            INSERT INTO teachers (
                avatar_url,
                name,
                birth_date,
                education_level,
                class_type,
                subjects_taught,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `
        const values = [

        ]
    },
    show(request, response) {
        return
    },
    edit(request, response) {
        return
    },
    put(request, response) {
        const { id } = request.body
        let index = 0
    
        const foundStudent = data.students.find((student, foundIndex) => {
            if (student.id == id) {
                index = foundIndex
                return true
            }
        })
        return
    },
    delete(request, response) {
        const { id } = request.body
    
        const filteredStudents = data.students.filter((student) => student.id != id)

        return
    }
}