const fs = require('fs')
const chalk = require('chalk')

const getNotes = function () {
    return 'Your notes...'
}

const addNote = function(title, body){
    const notes = loadNotes()
    const duplicateNotes = notes.filter( note => note.title === title)
    const duplicateNote = notes.find(note => note.title === title)

    if(!duplicateNote){
        notes.push({
            title:title,
            body:body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    }else{
        console.log(chalk.red.inverse('Note title taken!'))
    }
}

const removeNote = function(title){
    const notes = loadNotes()
    const newNote = notes.filter(note => note.title != title)

    saveNotes(newNote)
    if(notes.length > newNote.length){
        console.log(chalk.green.inverse('Note removed!'))
        
    }else{
        console.log(chalk.red.inverse('No note found!'))
    }
}

const saveNotes= function(notes){
    const dataJson = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJson)
}

const loadNotes = function(){
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson= dataBuffer.toString()
        return JSON.parse(dataJson)
    }catch(e){
        return []
    }
}

const listNotes = function(){
    const notes = loadNotes()
    console.log(chalk.blue.inverse('Your notes:'))
    for (let note of notes){
        console.log(note.title)
    }
}
const readNote = (title) =>{
    const notes = loadNotes()
    const findNote = notes.find(note => note.title === title)
    if(findNote){
        console.log(chalk.blue('Title:') + findNote.title)
        console.log(chalk.yellow('Body:')+findNote.body)
    }else{
        console.log(chalk.red.inverse('Note not found!'))
    }

}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote:removeNote,
    listNotes:listNotes,
    readNote:readNote


}