const fs = require('fs')
const data = require('./data.json')
const { age, graduation } = require('./utils')

exports.show = (request, response) => {
    const { id } = request.params

    const foundTeacher = data.teachers.find((teacher) => teacher.id == id)

    if(!foundTeacher) return response.send('Teacher not found')

    const teacher = {
        ...foundTeacher,
        age: age(foundTeacher.birth),
        graduation: graduation(foundTeacher.graduation),
        services: foundTeacher.services.split(','),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundTeacher.created_at)
    }

    return response.render('teachers/show', { teacher })
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
    const id = Number(data.teachers.length + 1)

    data.teachers.push({
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

        return response.redirect('/teachers')
    })
}