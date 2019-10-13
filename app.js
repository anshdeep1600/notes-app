const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

//Create add command
yargs.command({
    command: 'add',
    describe: 'Add new notes',
    builder: {
        title:{
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
        body:{
            describe: 'Note Content',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        notes.addNote(argv.title, argv.body)
    }
})

//Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Remove a note',
            demandOption: true,
            type: 'string'
        }
    }, 
    handler: (argv) => {
        notes.removeNote(argv.title)
    }
})

//List Command
yargs.command({
    command: 'list',
    describe: 'List of all the notes',
    handler: () => {
        notes.listNotes()
    }
})

//Read notes command
yargs.command({
    command: 'read',
    describe: 'Read individual note',
    builder:{
        title:{
            describe: 'Read a note',
            demandOption: true,
            type:'string'
        }
    },
    handler: (argv) => {
        notes.readNote(argv.title)
    }
})

yargs.parse()