const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body)  => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('Note ' + title + ' was added.'))
    } else {
        console.log(chalk.red.inverse('Note ' + title + ' already exists!!!'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()

    const notesToKeep =  notes.filter((note) => note.title !== title)
    if(notesToKeep.length < notes.length){
        saveNotes(notesToKeep)
        console.log(chalk.green.inverse('Note ' + title + ' was removed.'))
    }else{
        console.log(chalk.red.inverse('Note ' + title + ' was not found'))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.inverse.blue('Your Notes:'))
    notes.forEach((note) => {
        console.log(note.title)
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    const temp = notes.find((note) => note.title === title)

    if(temp){
        console.log('Title: ' + temp.title)
        console.log('Body:' + temp.body)
    } else{
        console.log(chalk.red.inverse(title + ' note was not found!!!'))
    }
}

const saveNotes = (notes) => {
										  
    fs.writeFileSync('notes.json', JSON.stringify(notes))
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}