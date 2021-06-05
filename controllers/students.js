const fs = require('fs')
const data = require('../data.json')
const { age, graduation, date } = require('../utils')

exports.index = (request, response) => {
    return response.render('students/index', { students:data.students })
}

exports.create = (request, response) => {
    return response.render('students/create')
}

exports.post = (request, response) => {
    const keys = Object.keys(request.body)

    for(key of keys) {
        if (request.body[key] == '')
            return response.send('Please, fill all fields')
    }

    let { avatar_url, name, birth, graduation, type_class, services } = request.body

    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.students.length + 1)

    data.students.push({
        id,
        avatar_url,
        name,
        birth,
        graduation,
        type_class,
        services,
        created_at
    })
    
    
    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        if (err) return response.send('Write file error!')

        return response.redirect('/students')
    })
}

exports.show = (request, response) => {
    const { id } = request.params

    const foundstudent = data.students.find((student) => student.id == id)

    if(!foundstudent) return response.send('student not found')

    const student = {
        ...foundstudent,
        age: age(foundstudent.birth),
        graduation: graduation(foundstudent.graduation),
        services: foundstudent.services.split(','),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundstudent.created_at)
    }

    return response.render('students/show', { student })
}

exports.edit = (request, response) => {
    const { id } = request.params

    const foundstudent = data.students.find((student) => student.id == id)

    if(!foundstudent) return response.send('student not found')

    const student = {
        ...foundstudent,
        birth: date(foundstudent.birth)
    }

    return response.render('students/edit', { student })
}

exports.update = (request, response) => {
    const { id } = request.body
    let index = 0

    const foundstudent = data.students.find((student, foundIndex) => {
        if (student.id == id) {
            index = foundIndex
            return true
        }
    })

    if(!foundstudent) return response.send('Instructor not found')

    const student = {
        ...foundstudent,
        ...request.body,
        birth: Date.parse(request.body.birth)
    }

    data.students[index] = student

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        if (err) return response.send('Write error!')

        return response.redirect(`/students/${id}`)
    })
}

exports.delete = (request, response) => {
    const { id } = request.body

    const filteredstudents = data.students.filter((student) => student.id != id)

    data.students = filteredstudents

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        if (err) return response.send('Write file error!')

        return response.redirect('/students')
    })
}