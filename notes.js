const { default: chalk } = require('chalk')
const { Console } = require('console')
const fs = require('fs')
function log(...args){
    console.log(...args)
}


const readNote = (title) => {
    const notes = loadNotes()

    const findNote = notes.find((note) => note.title === title);
    
    if(findNote)
    {
        log(chalk.inverse("Title: " + findNote.title + " " + "Body: " + findNote.body))
    }else{
        log(chalk.red("Note no found"))
    }
}


const listNotes = () => {
    const notes = loadNotes();

    const consoleNotes = notes.forEach(note => 
      console.log(note.title)
    );
  
    if(notes.length > 0){
      return consoleNotes
    }
}

const getNotes = () => {
  
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicatedNote = notes.find((note) => note.title === title)
    
    
    if (!duplicatedNote){
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

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)

    } catch (e) {
        return []
    }
}

const removeNote = (title) => {

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
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}