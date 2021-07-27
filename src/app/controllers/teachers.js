const { age, graduation, date } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
    index(request, response) {
        return response.render('teachers/index')
    },
    create(request, response) {
        return response.render('teachers/create')
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
            birth,
            graduation,
            type_class,
            services,
            created_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id
    `
    const values = [
        request.body.avatar_url,
        request.body.name, 
        date(request.body.birth).iso,
        graduation(request.body.graduation), 
        request.body.type_class,
        request.body.services,
        date(Date.now()).iso
    ]

    db.query(query, values, (err, results) => {
        if (err) return response.send('Database error!')

        return response.redirect(`/teachers/${results.row[0].id}`)
    })

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
    
        const foundTeacher = data.teachers.find((teacher, foundIndex) => {
            if (teacher.id == id) {
                index = foundIndex
                return true
            }
        })
        return
    },
    delete(request, response) {
        const { id } = request.body
    
        const filteredTeachers = data.teachers.filter((teacher) => teacher.id != id)

        return
    }
}




