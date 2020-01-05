const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
    return 'Your notes...';
}

const addNote = (title, body) => {
    const notes = loadNotes();

    if (!findTitle(notes, title)) {
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

    if (findTitle(notes, title)) {
        notes = notes.filter((el) => {
            return el.title !== title;
        })
        saveNotes(notes);
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
    let note = findTitle(notes, title);

    if (note) {
        console.log(`Title: ${note.title}`);
        console.log(`Body: ${note.body}`);
    } else {
        console.log('Can`t find a note!');
    }
}

const findTitle = (notes, title) => {
    notes = notes.filter((el) => {
        return el.title === title;
    })
    if (notes.length === 0) return 0; else {
        return notes[0];
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