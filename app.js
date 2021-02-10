const chalk = require('chalk');
const { argv } = require('yargs');
const yargs = require('yargs');
const yargsParser = require('yargs-parser');
const notes = require('./notes.js');

//customize yargs version
yargs.version('1.1.0');

//add, remove, read, list

//create add command
yargs.command({
    command:'add',
    describe:'Adds a new note',
    builder:{
        title:{
            describe:'Note title',
            demandOption:true,
            type:'string'            
        },
        body:{
            describe:'Body of the note',
            demandOption:true,
            type:'string'
        }
    },   
    handler(argv){
        notes.addNote(argv.title,argv.body);        
    }

})

//create remove command
yargs.command({
    command:'remove',
    describe:'Removes a note',
    builder: {
        title:{
            describe:'Note title',
            demandOption:true,
            type:'string'            
        }
    },    
    handler(argv){
        notes.removeNote(argv.title);
    }
})

//create read command
yargs.command({
    command:'read',
    describe:'Reads a note',
    builder: {        
        title:{
            describe:'Note title',
            demandOption:true,
            type:'string'            
        }        
    },
    handler(argv){        
        notes.readNote(argv.title);
    }
})

//create  list command
yargs.command({
    command:'list',
    describe:'Lists the notes',
    handler(){
        //console.log('Listing out all notes');
        notes.listNotes();
    }
})

yargs.parse();