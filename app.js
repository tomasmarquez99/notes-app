const validator = require('validator');
const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js');

//Customize yargs version
yargs.version('1.1.0')

//create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        },
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

//Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note to remove title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        console.log(argv.title)
        notes.removeNote(argv.title)

    }
})

//create list command
yargs.command({
    command: 'list',
    describe: 'Listing notes',
    handler() {
        console.log(chalk.bgBlue("Your notes"))
        notes.listNotes()
    }
})

//Create read command
yargs.command({
    command: 'read',
    describe: 'Reading notes',
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.readNote(argv.title)
    }
})


//add, remove, read, list


yargs.parse()

