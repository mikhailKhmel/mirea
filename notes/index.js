const notesTable = document.querySelector(".notes-table");
const editBtn = document.querySelector(".edit-btn");
const noteTextArea = document.querySelector(".notes-edit");
const saveBtn = document.querySelector(".save-btn");

let notes = [{id: 1, text: 'hello'}];
let currentEditNote = null

function render() { 
    notesTable.innerHTML = '';
    for (let note of notes) {
        let newRow = notesTable.insertRow(0);
        let editBtnCell = newRow.insertCell(0);
        let editBtn = document.createElement('button');
        editBtn.textContent = 'Редактировать';
        editBtn.onclick = function() {editNote(note)}
        editBtnCell.appendChild(editBtn);
        let noteText = newRow.insertCell(0);
        noteText.appendChild(document.createTextNode(note.text));
        let noteId = newRow.insertCell(0);
        noteId.appendChild(document.createTextNode(note.id));
    }
    noteTextArea.value = '';
    saveBtn.textContent = 'Добавить заметку';
}

function saveNote() {
    if (saveBtn.textContent !== 'Сохранить изменения') {
        const newNote = noteTextArea.value;
        if (newNote) {
            notes.push({id: notes.length+1, text: newNote});
        }
    } else {
        if (currentEditNote) {
            currentEditNote.text = noteTextArea.value;
            notes.forEach(function (note) {
                if (note.id === currentEditNote.id) {
                    note.text = currentEditNote.text
                }
            })
        }
        currentEditNote = null
    }
    
    render();
}

function editNote(note) {
    noteTextArea.value = note.text;
    saveBtn.textContent = 'Сохранить изменения';

    currentEditNote = note;
}

saveBtn.addEventListener('click', saveNote);

render();

