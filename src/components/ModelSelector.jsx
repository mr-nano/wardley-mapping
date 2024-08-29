import React from 'react';

function ModelSelector({ model, setModel }) {
  const models = ['gpt-3.5-turbo', 'gpt-4'];

  return (
    <div>
      <label htmlFor="model-select">Select OpenAI Model:</label>
      <select
        id="model-select"
        value={model}
        onChange={(e) => setModel(e.target.value)}
      >
        {models.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ModelSelector;
