function addNote() {
    const notesContainer = document.getElementById('notes');
    const noteInput = document.getElementById('noteInput');
    const colorPicker = document.getElementById('colorPicker');

    if (noteInput.value.trim() !== "") {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note';
        noteDiv.style.backgroundColor = colorPicker.value;

        // Create a new element to hold the note text
        const noteText = document.createElement('p');
        noteText.innerText = noteInput.value;
        noteDiv.appendChild(noteText);

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'edit';
        editBtn.onclick = function() {
            const newNote = prompt("Edit your note:", noteText.innerText);
            if (newNote !== null) {
                noteText.innerText = newNote;
            }
        };
        noteDiv.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete';
        deleteBtn.onclick = function() {
            notesContainer.removeChild(noteDiv);
        };
        noteDiv.appendChild(deleteBtn);

        notesContainer.appendChild(noteDiv);

        noteInput.value = ''; // Reset the input field
    }
}
