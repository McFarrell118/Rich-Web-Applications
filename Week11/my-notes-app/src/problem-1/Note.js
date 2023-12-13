import React from 'react';

function Note({ text, color, attachment, onDelete, onEdit }) {
  const speakNote = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  const handleEdit = () => {
    const newText = prompt("Edit your note:", text);
    if (newText !== null) {
      onEdit(newText);
    }
  };

  return (
    <div className="note" style={{ backgroundColor: color }}>
      <p>{text}</p>
      {attachment && 
        <img src={URL.createObjectURL(attachment)} alt="Attachment" style={{ maxWidth: '100%', maxHeight: '200px' }} />
      }
      <button className="speak" onClick={speakNote}>Speak</button>
      <button className="edit" onClick={handleEdit}>Edit</button>
      <button className="delete" onClick={onDelete}>Delete</button>
    </div>
  );
}

export default Note;

