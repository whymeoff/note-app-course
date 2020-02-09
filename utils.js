const fs = require('fs');

const createCrew = () => {
    const id = Math.floor(Date.now() / 100000 + Math.floor(Math.random() * (10000 - 0)) + 0).toString()
    const crews = loadFile('./db/crews.json')

    crews.push({
        id,
        driver: '',
        staff: [],
        calls: []
    })

    saveFile('./db/crews.json', crews)

    console.log('Success')
}

const createStaff = (name) => {
    const id = Math.floor(Date.now() / 100000 + Math.floor(Math.random() * (10000 - 0)) + 0).toString()
    const staff = loadFile('./db/staff.json')

    staff.push({
        id,
        name,
        crew: '',
        role: ''
    })

    saveFile('./db/staff.json', staff)

    console.log('Success')
}

const setDriver = (crewID, staffID) => {
    const crews = loadFile('./db/crews.json')
    const staff = loadFile('./db/staff.json')
    const crew = findById('./db/crews.json', crewID)
    const person = findById('./db/staff.json', staffID)

    if (crew !== -1 && person !== -1) {
        if (person[1].role !== '') {
            console.log('This person already have the crew!')
            return
        }
    
        if (crew[1].driver !== '') {
            console.log('This crew already have driver!')
            return
        }
    } else {
        console.log('Can`t find person or the crew!')
        return
    }

    crews[crew[0]].driver = person[1].id
    staff[person[0]].role = 'driver'
    staff[person[0]].crew = crew[1].id

    saveFile('./db/staff.json', staff)
    saveFile('./db/crews.json', crews)

    console.log('Success')
}

const setStaff = (crewID, staffID) => {
    const crews = loadFile('./db/crews.json')
    const staff = loadFile('./db/staff.json')
    const crew = findById('./db/crews.json', crewID)
    const person = findById('./db/staff.json', staffID)

    if (crew !== -1 && person !== -1) {
        if (crew[1].staff.length === 2) {
            console.log('Enough staff!')
            return
        }
        if (person[1].role !== '') {
            console.log('This person already have the crew!')
            return
        }
    } else {
        console.log('Can`t find person or the crew!')
        return
    }

    crews[crew[0]].staff.push(person[1].id)
    staff[person[0]].role = 'staff'
    staff[person[0]].crew = crew[1].id

    saveFile('./db/staff.json', staff)
    saveFile('./db/crews.json', crews)

    console.log('Success')
}

const freeStaff = (staffID) => {
    const crews = loadFile('./db/crews.json')
    const staff = loadFile('./db/staff.json')
    const person = findById('./db/staff.json', staffID)

    if (person !== -1) {
        if (person[1].role === '') {
            console.log('He(she) is already free!')
            return
        }
    } else {
        console.log('Can`t find this person!')
        return
    }

    staff[person[0]].role = ''
    staff[person[0]].crew = ''
    let flag = false

    for (let i = 0; i < crews.length; i++) {
        if (crews[i].driver === staffID) {
            crews[i].driver = ''
            break
        }
        for (let j = 0; j < crews[i].staff.length; j++) {
            if (crews[i].staff[j] === staffID) {
                if (j === 0) {
                    crews[i].staff.shift()
                } else {
                    crews[i].staff.pop()
                }
                flag = true
            }
        }
        if (flag) break
    }

    saveFile('./db/staff.json', staff)
    saveFile('./db/crews.json', crews)

    console.log('This person is free now')
}

const createCall = (crewID, description, address) => {
    const crews = loadFile('./db/crews.json')
    const calls = loadFile('./db/calls.json')
    const crew = findById('./db/crews.json', crewID)

    if (crew !== -1) {
        if (crew[1].calls.length === 3) {
            console.log('The crew already have 3 calls!')
            return
        }
        if (crew[1].driver === '' || crew[1].staff.length < 2) {
            console.log('This crew is incomplete, choose another!')
            return
        }
    } else {
        console.log('Can`t find this crew!')
    }

    const id = Math.floor(Date.now() / 100000 + Math.floor(Math.random() * (10000 - 0)) + 0).toString()

    calls.push({
        id, address, description, crew: crewID
    })

    crews[crew[0]].calls.push(id)

    saveFile('./db/calls.json', calls)
    saveFile('./db/crews.json', crews)
    console.log('Call is created')
}

const callDone = (callID) => {
    const calls = loadFile('./db/calls.json')
    const crews = loadFile('./db/crews.json')

    let callsToKeep = calls.filter((el) => el.id !== callID)

    if (callsToKeep.length < calls.length) {
        saveFile('./db/calls.json', callsToKeep)
        console.log('Call removed!')
    } else {
        console.log('Call note found!')
        return
    }

    let flag = false

    for (let i = 0; i < crews.length; i++) {
        for (let j = 0; j < crews[i].calls.length; j++) {
            if (crews[i].calls[j] === callID) {
                crews[i].calls = crews[i].calls.filter(el => el !== crews[i].calls[j])
                flag = true
                break
            }
        }
        if (flag) break
    }

    saveFile('./db/crews.json', crews)
}

const listCalls = (crewID) => {
    const crew = findById('./db/crews.json', crewID)

    if (crew !== -1) {
        if (crew[1].calls.length === 0) {
            console.log('This crew have not calls!')
            return
        }
    } else {
        console.log('Can`t find this crew!')
        return
    }

    const calls = loadFile('./db/calls.json')

    for (let i = 0; i < crew[1].calls.length; i++) {
        for (let j = 0; j < calls.length; j++) {
            if (crew[1].calls[i] === calls[i].id) {
                console.log(`ID: ${calls[i].id}`)
                console.log(`Address: ${calls[i].address}`)
                console.log(`Description: ${calls[i].description}`)
                console.log(`Crew ID: ${calls[i].crew}\n`)
                break
            }
        }
    }
}

const listStaff = () => {
    const staff = loadFile('./db/staff.json')

    for (let i = 0; i < staff.length; i++) {
        console.log(`ID: ${staff[i].id}`)
        console.log(`Name: ${staff[i].name}`)
        console.log(`Crew: ${staff[i].crew || 'NULL'}`)
        console.log(`Role: ${staff[i].role|| 'NULL'}\n`)
    }
}

const listCrew = (free, empty) => {
    const crews = loadFile('./db/crews.json')

    if (crews.length === 0) {
        console.log('List of crews is empty!')
        return
    }
    
    let k = 0
    if (free) {
        for (let i = 0; i < crews.length; i++) {
            if (crews[i].calls.length < 3) {
                console.log(`ID: ${crews[i].id}`)
                console.log(`Driver: ${crews[i].driver}`)
                for (let j = 0; j < crews[i].staff.length; j++) {
                    console.log(`Staff[${j}]: ${crews[i].staff[j]}`)
                }
                for (let j = 0; j < crews[i].calls.length; j++) {
                    console.log(`Call[${j}]: ${crews[i].calls[j]}`)
                }
                console.log('\n')
                k++
            }
        }
        if (k === 0) console.log('Can not find free crews')
    }

    if (empty) {
        for (let i = 0; i < crews.length; i++) {
            if (crews[i].driver === '' || crews[i].staff.length < 2) {
                console.log(`ID: ${crews[i].id}`)
                console.log(`Driver: ${crews[i].driver || 'NULL'}`)
                for (let j = 0; j < crews[i].staff.length; j++) {
                    console.log(`Staff[${j}]: ${crews[i].staff[j] || 'NULL'}`)
                }
                console.log('\n')
                k++
            }
        }
        if (k === 0) console.log('Can not find empty crews')
    }
}

const findById = (path, id) => {
    const data = loadFile(path)

    for (let i = 0; i < data.length; i++) {
        if (data[i].id === id) {
            return [i, data[i]]
        }
    }

    return -1;
}

const loadFile = (path) => {
    try {
        return JSON.parse(fs.readFileSync(path).toString());
    } catch(e) {
        return [];
    }
}

const saveFile = (path, data) => {
    fs.writeFileSync(path, JSON.stringify(data));
}

module.exports = { createCrew, createStaff, setDriver, setStaff, freeStaff, createCall, callDone, listCalls, listStaff, listCrew };