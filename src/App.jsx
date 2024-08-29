import React, { useState } from 'react';
import axios from 'axios';
import APIKeyInput from './components/APIKeyInput';
import ModelSelector from './components/ModelSelector';
import DomainInput from './components/DomainInput';
import TextDisplay from './components/TextDisplay';
import WardleyMap from './components/WardleyMap';

function App() {
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState('gpt-3.5-turbo');
  const [domain, setDomain] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [mapData, setMapData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateText = async () => {
    if (!apiKey) {
      alert('Please enter your OpenAI API key');
      return;
    }

    if (!domain) {
      alert('Please enter a domain');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: model,
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant that generates descriptions of domains for Wardley Mapping.',
            },
            {
              role: 'user', 
              content: `Generate a description of the ${domain} domain, including users, their needs, the systems they interact with, and the evolution of each component. Format the output as a list of components, each on a new line, with their evolution stage (genesis, custom-built, product, or commodity) in parentheses.`,
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
        }
      );

      const generatedContent = response.data.choices[0].message.content;
      setGeneratedText(generatedContent);
      parseMapData(generatedContent);
    } catch (error) {
      console.error('Error generating text:', error);
      alert('Error generating text. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const parseMapData = (text) => {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    const parsedData = lines.map(line => {
      const [name, evolution] = line.split('(');
      return {
        name: name.trim(),
        evolution: evolution ? evolution.replace(')', '').trim() : 'custom-built'
      };
    });
    setMapData(parsedData);
  };

  const handleTextUpdate = (updatedText) => {
    setGeneratedText(updatedText);
    // TODO: Parse updatedText to extract map data
    // Update mapData state with the parsed data
  };

  return (
    <div className="App">
      <h1>Wardley Map Generator</h1>
      <APIKeyInput apiKey={apiKey} setApiKey={setApiKey} />
      <ModelSelector model={model} setModel={setModel} />
      <DomainInput 
        domain={domain} 
        setDomain={setDomain} 
        onGenerate={handleGenerateText}
        isLoading={isLoading}
      />
      <TextDisplay text={generatedText} onUpdate={handleTextUpdate} />
      <WardleyMap data={mapData} />
    </div>
  );
}

export default App;
