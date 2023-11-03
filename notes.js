const { default: chalk } = require('chalk')
const fs = require('fs')
function log(...args){
    console.log(...args)
}

const getNotes = function () {
    return "Your notes..."
}

const addNote = function (title, body) {
    const notes = loadNotes()
    const duplicatedNotes = notes.filter(function(note){
        console.log(note)
        return note.title === title
       
    })

    if (duplicatedNotes.length === 0){
        notes.push({
            title: title,
            body: body
        })
        
        saveNotes(notes)
        console.log('New note added!')
    } else {
        console.log('Note title taken!')
    }

    

}

const saveNotes = function(notes){

    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)

}

const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)

    } catch (e) {
        return []
    }
}

const removeNote = function(title){

const notes = loadNotes();
const notesCount = notes.length;

const titleString = title.toString()
const noteRemoved = notes.filter( note => note.title !== titleString)
saveNotes(noteRemoved)
const newArrayCount = loadNotes().length
if(newArrayCount !== notesCount)
{log(chalk.bgGreen("Note removed!"))} else {
    log(chalk.bgRed("No note removed!"))
}


}



module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote
}