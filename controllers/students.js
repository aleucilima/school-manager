const fs = require('fs')
const data = require('../data.json')
const { age, date, studentGraduation } = require('../utils')

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

    birth = Date.parse(request.body.birth)

    let id = 1
    const lastStudent = data.students[data.students.length - 1]

    if(lastStudent) {
        id = lastStudent.id + 1
    }

    data.students.push({
        id,
        ...request.body, 
        birth
    })
    
    
    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        if (err) return response.send('Write file error!')

        return response.redirect('/students')
    })
}

exports.show = (request, response) => {
    const { id } = request.params

    const foundStudent = data.students.find((student) => student.id == id)

    if(!foundStudent) return response.send('Student not found')

    const student = {
        ...foundStudent,
        age: age(foundStudent.birth),
        graduation: studentGraduation(foundStudent.graduation),
    }

    return response.render('students/show', { student })
}

exports.edit = (request, response) => {
    const { id } = request.params

    const foundStudent = data.students.find((student) => student.id == id)

    if(!foundStudent) return response.send('Student not found')

    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth).iso
    }

    return response.render('students/edit', { student })
}

exports.update = (request, response) => {
    const { id } = request.body
    let index = 0

    const foundStudent = data.students.find((student, foundIndex) => {
        if (student.id == id) {
            index = foundIndex
            return true
        }
    })

    if(!foundStudent) return response.send('Instructor not found')

    const student = {
        ...foundStudent,
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

    const filteredStudents = data.students.filter((student) => student.id != id)

    data.students = filteredStudents

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        if (err) return response.send('Write file error!')

        return response.redirect('/students')
    })
}