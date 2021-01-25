const yargs = require('yargs');
const notes = require('./notes.js');

//create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note!',
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
    handler(argv) {
        notes.addNote(argv.title, argv.body);
    }
})

//create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note!',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title);
    }
})

//create list command
yargs.command({
    command: 'list',
    describe: 'Listing all note!',
    handler(argv) {
        notes.listNotes();
    }
})

//create read command
yargs.command({
    command: 'read',
    describe: 'Reading a note!',
    builder: {
        title: {
            describe:"Read a note",
            demandOption: true,
            type: 'string'
        }
    },
    handler() {
        notes.readNotes(argv.title);
    }
})

yargs.parse();
//console.log(yargs.argv);