import React, { useState, useEffect } from 'react';
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
  const [loadingMessage, setLoadingMessage] = useState('Generating');

  useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingMessage(prev => {
          if (prev.length < 12) {
            return prev + '.';
          }
          return 'Generating';
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

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
    setLoadingMessage('Generating');

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: model,
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant that generates structured descriptions of domains for Wardley Mapping.',
            },
            {
              role: 'user',
              content: `Generate a structured description of the ${domain} domain, including users, their needs, the systems they interact with, and the evolution of each component. Each component should be formatted as following json: { "name": "<component_name>", "evolution_stage": "<genesis|custom|product|commodity>", "scale": <0-1> } e.g [{"name": "Component 1", "evolution_stage": "genesis", "scale": 0.5}, {"name": "Component 2", "evolution_stage": "custom", "scale": 0.75}] Also here the scale is the percentage that the evolution stage applies to the component. so if evolution stage is genesis, and scale is 100% then the component is genesis. if evolution stage is custom, and scale is 0.5 then the component is 50% custom and 50% genesis. Make sure that the json is not nested. its simply collection of 3 keys - name, evolution_stage and scale`,
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
      setMapData([]); // Clear previous map data
    } catch (error) {
      console.error('Error generating text:', error);
      alert('Error generating text. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
      setLoadingMessage(''); // Clear loading message
    }
  };

  const parseMapData = (text) => {
    try {
      // Parse the entire JSON string
      const components = JSON.parse(text);
      
      // Map the parsed data to the desired format
      const parsedData = components.map(component => ({
        name: component.name,
        evolution: component.evolution_stage,
        scale: component.scale,
      }));

      setMapData(parsedData);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      alert('Error parsing generated data. Please check the format.');
    }
  };

  const handleMapData = () => {
    parseMapData(generatedText);
  };

  return (
    <div className="App">
      <h1>Wardley Map Generator</h1>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <APIKeyInput apiKey={apiKey} setApiKey={setApiKey} />
        <ModelSelector model={model} setModel={setModel} />
      </div>
      <DomainInput 
        domain={domain} 
        setDomain={setDomain} 
        onGenerate={handleGenerateText}
        isLoading={isLoading}
      />
      {isLoading && <div style={{ marginTop: '10px', color: 'blue' }}>{loadingMessage}</div>}
      <TextDisplay text={generatedText} onUpdate={setGeneratedText} />
      <button onClick={handleMapData} disabled={!generatedText}>
        Generate Map
      </button>
      <WardleyMap data={mapData} />
    </div>
  );
}

export default App;
