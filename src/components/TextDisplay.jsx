import React, { useState, useEffect } from 'react';

function TextDisplay({ text, onUpdate }) {
  const [editableText, setEditableText] = useState(text);

  useEffect(() => {
    setEditableText(text);
  }, [text]);

  const handleChange = (e) => {
    setEditableText(e.target.value);
  };

  const handleBlur = () => {
    onUpdate(editableText);
  };

  return (
    <div>
      <h2>Generated Text</h2>
      <textarea
        value={editableText}
        onChange={handleChange}
        onBlur={handleBlur}
        rows={10}
        cols={50}
      />
    </div>
  );
}

export default TextDisplay;
