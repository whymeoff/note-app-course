const fs = require('fs');

const getNotes = () => {
    return 'Your notes...';
}

const addNote = (title, body) => {
    const notes = loadNotes();

    const duplicateNotes = notes.filter((el) => {
        return el.title === title;
    })

    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes);
    } else {
        console.log('Note title taken');
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
module.exports = {getNotes, addNote};