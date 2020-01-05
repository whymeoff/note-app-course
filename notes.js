const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
    return 'Your notes...';
}

const addNote = (title, body) => {
    const notes = loadNotes();
    const note = notes.find((el) => el.title === title)

    if (!note) {
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes);
    } else {
        console.log('Note title taken');
    }
}

const deleteNote = (title) => {
    let notes = loadNotes();
    let notesToKeep = notes.filter((el) => el.title !== title)
    if (notesToKeep.length < notes.length) {
        saveNotes(notesToKeep);
        console.log(chalk.bgGreen('Note removed!'));
    } else {
        console.log(chalk.bgRed('No note found!'));
    }
}

const listNotes = () => {
    const notes = loadNotes();

    if (notes.length != 0) {
        notes.map((el) => {
            console.log(`Title: ${el.title}`);
            console.log(`Body: ${el.body}\n`);
        })
    } else {
        console.log('Empty list!');
    }
}

const readNote = (title) => {
    const notes = loadNotes();
    let note = notes.find((el) => el.title === title);

    if (note) {
        console.log(`Title: ${note.title}`);
        console.log(`Body: ${note.body}`);
    } else {
        console.log('Can`t find a note!');
    }
}

const saveNotes = (notes) => {
    fs.writeFileSync('notes.json',JSON.stringify(notes));
}

const loadNotes = () => {
    try {
        return JSON.parse(fs.readFileSync('notes.json').toString());
    } catch(e) {
        return [];
    }
    
}
module.exports = {getNotes, addNote, deleteNote, listNotes, readNote};