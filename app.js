const notes = require('./notes');
const process = require('process');
const yargs = require('yargs');

yargs.command({
    command: 'add',
    describe: 'Add new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        notes.addNote(argv.title, argv.body);
    }
})

yargs.command({
    command: 'remove',
    describe: 'Removing note',
    handler: () => {
        console.log('Removing the note');
    }
})

yargs.command({
    command: 'list',
    describe: 'List notes',
    handler: () => {
        console.log('Listing notes');
    }
})

yargs.command({
    command: 'read',
    describe: 'Read a note',
    handler: () => {
        console.log('Reading a note');
    }
})

yargs.parse();



