const { fromEvent, Subject } = rxjs;

class Note {
  constructor(content, parent = null) {
    this.id = Date.now() + Math.random(); // Unique ID for each note
    this.content = content;
    this.parent = parent;
    this.children = [];
    this.deletionSubject = new Subject();
    this.element = this.createNoteElement();
    if (parent) {
      parent.addChild(this);
    }
  }

  createNoteElement() {
    const noteDiv = document.createElement('div');
    noteDiv.className = 'note';
    noteDiv.style.backgroundColor = document.getElementById('colorPicker').value;

    const noteText = document.createElement('p');
    noteText.textContent = this.content;
    noteDiv.appendChild(noteText);

    const addChildBtn = document.createElement('button');
    addChildBtn.textContent = 'Add Child Note';
    addChildBtn.className = 'add-child';
    fromEvent(addChildBtn, 'click').subscribe(() => this.addChildNote());
    noteDiv.appendChild(addChildBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete';
    fromEvent(deleteBtn, 'click').subscribe(() => this.delete());
    noteDiv.appendChild(deleteBtn);

    return noteDiv;
  }

  addChildNote() {
    const childContent = prompt('Enter child note content:');
    if (childContent) {
      const childNote = new Note(childContent, this);
      this.element.parentNode.insertBefore(childNote.element, this.element.nextSibling);
    }
  }

  delete() {
    this.deletionSubject.next(this.id); // Notify any subscribers that this note is being deleted
    this.element.remove(); // Remove this note's element from the DOM
    this.children.slice().forEach(child => child.delete()); // Delete all child notes
  }

  addChild(child) {
    this.children.push(child);
    child.deletionSubject.subscribe(() => this.removeChild(child));
  }

  removeChild(child) {
    this.children = this.children.filter(c => c !== child);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const noteInput = document.getElementById('noteInput');
  const addNoteButton = document.querySelector('button');

  // Handle add note button click
  fromEvent(addNoteButton, 'click').subscribe(() => {
    const noteText = noteInput.value.trim();
    if (noteText) {
      const note = new Note(noteText);
      document.getElementById('notes').appendChild(note.element);
      noteInput.value = ''; // Clear the text area after adding the note
    }
  });
});
