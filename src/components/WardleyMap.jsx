import React, { useState } from 'react';
import Draggable from 'react-draggable';

function WardleyMap({ data }) {
  const [hoveredItem, setHoveredItem] = useState(null);

  const mapStyle = {
    width: '800px',
    height: '600px',
    border: '1px solid black',
    position: 'relative',
    background: 'white',
  };

  const axisStyle = {
    position: 'absolute',
    backgroundColor: 'black',
    zIndex: 10, // Ensure axes are above the background bars
  };

  const labelStyle = {
    position: 'absolute',
    fontSize: '12px',
    zIndex: 20, // Ensure labels are above the background bars
  };

  const nodeStyle = {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: 'purple',
    position: 'absolute',
    cursor: 'move',
    zIndex: 30, // Ensure nodes are above everything else
  };

  const tooltipStyle = {
    position: 'absolute',
    backgroundColor: 'white',
    border: '1px solid black',
    padding: '5px',
    borderRadius: '3px',
    zIndex: 1000, // Tooltip should be on top
  };

  const trimText = (text, maxLength = 15) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const evolutionSections = [
    { name: 'Genesis', color: '#e0f7fa', position: '0%' },
    { name: 'Custom', color: '#b2ebf2', position: '25%' },
    { name: 'Product', color: '#80deea', position: '50%' },
    { name: 'Commodity', color: '#4dd0e1', position: '75%' },
  ];

  return (
    <div style={mapStyle}>
      {/* Background bars for evolution sections */}
      {evolutionSections.map((section, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            left: '40px',
            bottom: '20px',
            width: 'calc(25% - 10px)', // Adjust width to fit four sections
            height: '100%',
            backgroundColor: section.color,
            left: section.position, // Position each bar correctly
            zIndex: 0, // Ensure background bars are at the back
          }}
        />
      ))}

      {/* Y-axis */}
      <div style={{ ...axisStyle, left: '40px', top: '20px', width: '1px', height: 'calc(100% - 40px)' }} />
      <div style={{ ...labelStyle, left: '5px', top: '50%', transform: 'translateY(-50%) rotate(-90deg)', transformOrigin: 'left top' }}>Value Chain</div>
      <div style={{ ...labelStyle, left: '5px', top: '20px' }}>Visible</div>
      <div style={{ ...labelStyle, left: '5px', bottom: '20px' }}>Invisible</div>

      {/* X-axis */}
      <div style={{ ...axisStyle, left: '40px', bottom: '20px', width: 'calc(100% - 60px)', height: '1px' }} />
      {evolutionSections.map((section, index) => (
        <div key={index} style={{ ...labelStyle, left: section.position, bottom: '5px', transform: 'translateX(-50%)' }}>
          {section.name}
        </div>
      ))}

      {data.map((item, index) => (
        <Draggable key={index} bounds="parent" defaultPosition={{ x: 100 + index * 50, y: 100 + index * 30 }}>
          <div
            style={nodeStyle}
            onMouseEnter={() => setHoveredItem(item)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div style={{
              ...labelStyle,
              top: '15px',
              left: '50%',
              transform: 'translateX(-50%)',
              whiteSpace: 'nowrap',
            }}>
              {trimText(item.name)}
            </div>
            {hoveredItem === item && (
              <div style={{
                ...tooltipStyle,
                top: '30px',
                left: '50%',
                transform: 'translateX(-50%)',
              }}>
                {item.name}
              </div>
            )}
          </div>
        </Draggable>
      ))}
    </div>
  );
}

export default WardleyMap;
