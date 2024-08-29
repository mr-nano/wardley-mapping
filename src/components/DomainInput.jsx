import React from 'react';

function DomainInput({ domain, setDomain, onGenerate }) {
  return (
    <div>
      <label htmlFor="domain-input">Enter Domain:</label>
      <input
        type="text"
        id="domain-input"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
      />
      <button onClick={onGenerate}>Generate</button>
    </div>
  );
}

export default DomainInput;
