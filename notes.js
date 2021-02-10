const fs = require('fs');
const chulk = require('chalk');
const chalk = require('chalk');

const addNote = (title, body) => {
    const notes = loadNotes();

    const duplicateNote = notes.find((note)=> note.title === title);

    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        });    
        saveNote(notes);
        console.log(chalk.green.inverse('New note added'));        
    }
    else {
        console.log(chalk.red.inverse('Note title taken!'));
    }
}

const removeNote = (title) => {
    console.log(title);
    const notes = loadNotes();
    
    const keepNotes = notes.filter((note) => note.title !== title);
    
    if(notes.length > keepNotes.length){
        console.log(chalk.green.inverse('Note removed'));
        saveNote(keepNotes);
    }
    else
    {
        console.log(chalk.red.inverse('No note found'));
    }
}

const listNotes = ()=>{
    const notes = loadNotes();

    console.log(chalk.blueBright.inverse('YOUR NOTES'))
    notes.forEach((note) => console.log(chalk.blue(note.title)));
}

const readNote = (title) => {
    const notes = loadNotes();
    
    const theNote = notes.find((note)=> note.title === title);   

    if(theNote)
    {
        console.log(chalk.blue.inverse(theNote.title));
        console.log('');
        console.log(chalk.blue(theNote.body));        
    }
    else
    {
        console.log(chalk.red.inverse('Note not found'));        
    }
}

const saveNote = (notes) =>{
    const newDataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json',newDataJSON);
}

const loadNotes = () =>{
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }
    catch(e){
        return [];
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};