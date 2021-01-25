const chalk = require('chalk')
const fs = require('fs');

const addNote = (title, body) => {
    const notes = loadNotes();
    //const duplicateNotes = notes.filter((note) => note.title === title)
    const duplicateNotes = notes.find((note) => note.title === title)

    if (!duplicateNotes) {
        notes.push({
            title: title,
            body: body
        });

        saveNotes(notes);

        console.log(chalk.green.bold.inverse('New Note added'));
    } else {
        console.log(chalk.red.bold.inverse('Note title already exist!'));
    }

}

const removeNote = (title) => {
    const notes = loadNotes();

    const notesToKeep = notes.filter((notes) => notes.title !== title)

    saveNotes(notesToKeep)

    if (notesToKeep.length !== notes.length) {
        console.log(chalk.green.bold.inverse('Note with title: ' + title + ' Removed'));
    } else {
        console.log(chalk.red.bold.inverse('No note with title: ' + title + ' found'));
    }
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.inverse("Your Notes:"));

    notes.forEach(note => {
        console.log(note.title);
    });
}

const readNotes = (title) => {
    const notes = loadNotes();

    const noteToRead = notes.find((note) => note.title === title)

    if(noteToRead){
        console.log(chalk.bold('title: ')+noteToRead.title);
        console.log(chalk.bold('body:  ')+ noteToRead.body);
    }
    else{
        console.log(chalk.bold.red('No such note found'));
    }
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
}

const saveNotes = ((notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
})

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes
}