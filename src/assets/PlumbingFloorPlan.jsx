import React from 'react';
import { Box, Slider, Typography } from '@mui/material';

export const PlumbingFloorPlan = () => {
  const [imageError, setImageError] = React.useState(false);
  const [brightness, setBrightness] = React.useState(1.2);
  const [contrast, setContrast] = React.useState(0.1);

  const handleImageError = () => {
    setImageError(true);
    console.error('Error loading floor plan image');
  };

  const handleBrightnessChange = (event, newValue) => {
    setBrightness(newValue);
  };

  const handleContrastChange = (event, newValue) => {
    setContrast(newValue);
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
      <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 1, bgcolor: 'rgba(255,255,255,0.9)', p: 2, borderRadius: 1 }}>
        <Typography variant="body2" gutterBottom>Brightness</Typography>
        <Slider
          value={brightness}
          onChange={handleBrightnessChange}
          min={0.5}
          max={2}
          step={0.1}
          sx={{ width: 120 }}
        />
        <Typography variant="body2" gutterBottom sx={{ mt: 2 }}>Contrast</Typography>
        <Slider
          value={contrast}
          onChange={handleContrastChange}
          min={0}
          max={0.5}
          step={0.05}
          sx={{ width: 120 }}
        />
      </Box>
      <svg width="100%" height="100%" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="brightnessContrast">
          <feComponentTransfer>
            <feFuncR type="linear" slope={brightness} intercept={contrast}/>
            <feFuncG type="linear" slope={brightness} intercept={contrast}/>
            <feFuncB type="linear" slope={brightness} intercept={contrast}/>
          </feComponentTransfer>
          <feColorMatrix type="saturate" values={brightness}/>
        </filter>
      </defs>
      {/* Base floor plan */}
      {!imageError ? (
        <image
          href="../images/ABlock_TopView.png"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid meet"
          onError={handleImageError}
          filter="url(#brightnessContrast)"
        />
      ) : (
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          fill="#666"
          fontSize="16"
        >
          Error loading floor plan image
        </text>
      )}
    
    {/* Water System Overlay */}
    <g className="water-system" style={{ opacity: 0, visibility: 'hidden', transition: 'opacity 0.3s ease' }}>
      <image
        href="../images/ABlock_TopView_WaterLine.png"
        width="100%"
        height="100%"
        alt="glowing"
        style={{
          filter: 'drop-shadow(0 0 5px blue)', // creates a glow effect
          transition: 'filter 0.1s ease-in-out'
        }}
        preserveAspectRatio="xMidYMid meet"
        filter="url(#brightnessContrast)"
      />
    </g>

    {/* Electrical System Overlay */}
    <g className="electrical-system" style={{ opacity: 0, visibility: 'hidden', transition: 'opacity 0.3s ease' }}>
      <image
        href="../images/ABlock_TopView_ElectricalLine.png"
        width="100%"
        height="100%"
        alt="glowing"
        style={{
          filter: 'drop-shadow(0 0 5px red)', // creates a glow effect
          transition: 'filter 0.1s ease-in-out'
        }}
        preserveAspectRatio="xMidYMid meet"
        filter="url(#brightnessContrast)"
      />
    </g>

    {/* HVAC System Overlay */}
    <g className="hvac-system" style={{ opacity: 0, visibility: 'hidden', transition: 'opacity 0.3s ease' }}>
      <image
        href="../images/ABlock_TopView_HVAC.png"
        width="100%"
        height="100%"
        alt="glowing"
        style={{
          filter: 'drop-shadow(0 0 5px green)', // creates a glow effect
          transition: 'filter 0.1s ease-in-out'
        }}
        preserveAspectRatio="xMidYMid meet"
        filter="url(#brightnessContrast)"
      />
    </g>
    </svg>
    </Box>
  );
};