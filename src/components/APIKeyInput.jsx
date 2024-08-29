import React from 'react';

function APIKeyInput({ apiKey, setApiKey }) {
  return (
    <div>
      <label htmlFor="api-key">OpenAI API Key:</label>
      <input
        type="password"
        id="api-key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
      />
    </div>
  );
}

export default APIKeyInput;
