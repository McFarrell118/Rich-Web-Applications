const { fromEvent } = rxjs;

document.addEventListener("DOMContentLoaded", function() {
    const notesContainer = document.getElementById('notes');
    const noteInput = document.getElementById('noteInput');
    const colorPicker = document.getElementById('colorPicker');
    const addNoteButton = document.querySelector('button[onclick="addNote()"]');

    // RxJS stream for the Add Note button
    const addNoteStream = fromEvent(addNoteButton, 'click');
    addNoteStream.subscribe(addNote);

    function addNote() {
        if (noteInput.value.trim() !== "") {
            const noteDiv = createNoteElement(noteInput.value, colorPicker.value);
            notesContainer.appendChild(noteDiv);
            noteInput.value = ''; // Reset the input field
        }
    }

    function createNoteElement(noteTextContent, bgColor) {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note';
        noteDiv.style.backgroundColor = bgColor;

        const noteText = document.createElement('p');
        noteText.innerText = noteTextContent;
        noteDiv.appendChild(noteText);

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'edit';
        noteDiv.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete';
        noteDiv.appendChild(deleteBtn);

        // RxJS stream for the Edit button
        fromEvent(editBtn, 'click').subscribe(() => editNote(noteText));

        // RxJS stream for the Delete button
        fromEvent(deleteBtn, 'click').subscribe(() => deleteNote(noteDiv, notesContainer));

        return noteDiv;
    }

    function editNote(noteText) {
        const newNote = prompt("Edit your note:", noteText.innerText);
        if (newNote !== null) {
            noteText.innerText = newNote;
        }
    }

    function deleteNote(noteDiv, container) {
        container.removeChild(noteDiv);
    }
});
