import React, { useState, useEffect } from 'react';
import Note from './problem-1/Note';
import './App.css'; 

function App() {
  const [notes, setNotes] = useState([]);
  const [noteInput, setNoteInput] = useState('');
  const [noteAttachment, setNoteAttachment] = useState(null); // State for the attachment
  const [color, setColor] = useState('#FD0202');
  const [darkMode, setDarkMode] = useState(false); // State for dark mode

  // Toggle dark mode on the body element
  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : '';
  }, [darkMode]);

  const addNote = () => {
    if (noteInput.trim() !== "") {
      const newNote = {
        text: noteInput,
        color: color,
        attachment: noteAttachment,
      };
      setNotes([...notes, newNote]);
      setNoteInput('');
      setNoteAttachment(null);
    }
  };

  const handleFileSelect = (event) => {
    setNoteAttachment(event.target.files[0]);
  };

  const deleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  const editNote = (index, newText) => {
    const updatedNotes = notes.map((note, i) => {
      if (i === index) {
        return { ...note, text: newText };
      }
      return note;
    });
    setNotes(updatedNotes);
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className="container">
      <button onClick={toggleDarkMode}>
        {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>

      <h1>Michael's Note-Taking App</h1>
      <section className="note-control">
        <textarea 
          value={noteInput} 
          onChange={(e) => setNoteInput(e.target.value)}
          placeholder="Type your note here..."
        />
        <select 
          value={color} 
          onChange={(e) => setColor(e.target.value)}
        >
          <option value="#FD0202">Red</option>
          <option value="#84F828">Green</option>
          <option value="#38A9EB">Blue</option>
          <option value="#772BF4">Purple</option>
        </select>
        <input type="file" onChange={handleFileSelect} />
        <button onClick={addNote}>Add Note</button>
      </section>
      <section>
        {notes.map((note, index) => (
          <Note 
            key={index} 
            text={note.text} 
            color={note.color}
            attachment={note.attachment}
            onDelete={() => deleteNote(index)}
            onEdit={(newText) => editNote(index, newText)}
          />
        ))}
      </section>
    </div>
  );
}

export default App;
