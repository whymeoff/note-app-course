const fs = require('fs');
fs.writeFileSync('notes.txt', 'File was created!');
fs.appendFileSync('notes.txt', 'New info.');