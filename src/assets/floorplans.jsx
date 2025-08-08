// Floor plan SVG components with system overlays

// Main Office Building - Ground Floor
export const MainOfficeGround = () => (
  <svg width="100%" height="100%" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
    {/* Base floor plan - keeping existing layout */}
    <rect x="50" y="50" width="700" height="500" fill="none" stroke="#000" strokeWidth="2"/>
    
    {/* Rooms - keeping existing layout */}
    <rect x="100" y="100" width="300" height="200" fill="none" stroke="#000"/>
    <text x="150" y="200">Reception</text>
    <rect x="100" y="350" width="200" height="150" fill="none" stroke="#000"/>
    <text x="150" y="425">Cafeteria</text>
    <rect x="450" y="100" width="250" height="400" fill="none" stroke="#000"/>
    <text x="500" y="300">Meeting Rooms</text>
    
    {/* Enhanced Water System (Blue) */}
    <g className="water-system" style={{ display: 'none' }}>
      {/* Main Supply Line */}
      <path d="M25 25 L775 25" stroke="#0066cc" strokeWidth="4" strokeDasharray="none"/>
      
      {/* Vertical Distribution Risers */}
      <path d="M150 25 L150 575" stroke="#0066cc" strokeWidth="3" strokeDasharray="5,5"/>
      <path d="M350 25 L350 575" stroke="#0066cc" strokeWidth="3" strokeDasharray="5,5"/>
      <path d="M550 25 L550 575" stroke="#0066cc" strokeWidth="3" strokeDasharray="5,5"/>
      
      {/* Branch Lines */}
      <path d="M150 150 L250 150" stroke="#0066cc" strokeWidth="2" strokeDasharray="3,3"/>
      <path d="M150 400 L250 400" stroke="#0066cc" strokeWidth="2" strokeDasharray="3,3"/>
      <path d="M350 200 L450 200" stroke="#0066cc" strokeWidth="2" strokeDasharray="3,3"/>
      <path d="M550 300 L650 300" stroke="#0066cc" strokeWidth="2" strokeDasharray="3,3"/>
      
      {/* Connection Points */}
      <circle cx="150" cy="25" r="6" fill="#0066cc"/>
      <circle cx="350" cy="25" r="6" fill="#0066cc"/>
      <circle cx="550" cy="25" r="6" fill="#0066cc"/>
      
      {/* Water Outlets */}
      <circle cx="250" cy="150" r="4" fill="#0066cc"/>
      <circle cx="250" cy="400" r="4" fill="#0066cc"/>
      <circle cx="450" cy="200" r="4" fill="#0066cc"/>
      <circle cx="650" cy="300" r="4" fill="#0066cc"/>
      
      {/* Emergency Sprinkler System */}
      <circle cx="200" cy="150" r="3" fill="#0066cc"/>
      <circle cx="300" cy="150" r="3" fill="#0066cc"/>
      <circle cx="200" cy="400" r="3" fill="#0066cc"/>
      <circle cx="500" cy="200" r="3" fill="#0066cc"/>
      <circle cx="600" cy="200" r="3" fill="#0066cc"/>
    </g>
    
    {/* Enhanced Electrical System (Red) */}
    <g className="electrical-system" style={{ display: 'none' }}>
      {/* Main Power Supply */}
      <rect x="25" y="575" width="40" height="20" fill="#cc0000"/>
      <path d="M45 575 L45 25" stroke="#cc0000" strokeWidth="4" strokeDasharray="none"/>
      
      {/* Main Distribution Board */}
      <rect x="35" y="50" width="20" height="40" fill="#cc0000"/>
      
      {/* Primary Distribution Lines */}
      <path d="M55 70 L750 70" stroke="#cc0000" strokeWidth="3" strokeDasharray="10,5"/>
      <path d="M55 270 L750 270" stroke="#cc0000" strokeWidth="3" strokeDasharray="10,5"/>
      <path d="M55 470 L750 470" stroke="#cc0000" strokeWidth="3" strokeDasharray="10,5"/>
      
      {/* Sub Distribution Boards */}
      <rect x="140" y="60" width="20" height="20" fill="#cc0000"/>
      <rect x="340" y="260" width="20" height="20" fill="#cc0000"/>
      <rect x="540" y="460" width="20" height="20" fill="#cc0000"/>
      
      {/* Circuit Lines */}
      <path d="M150 80 L150 200" stroke="#cc0000" strokeWidth="2" strokeDasharray="5,5"/>
      <path d="M350 280 L350 400" stroke="#cc0000" strokeWidth="2" strokeDasharray="5,5"/>
      <path d="M550 480 L550 550" stroke="#cc0000" strokeWidth="2" strokeDasharray="5,5"/>
      
      {/* Power Outlets */}
      <rect x="145" y="150" width="10" height="10" fill="#cc0000"/>
      <rect x="345" y="350" width="10" height="10" fill="#cc0000"/>
      <rect x="545" y="500" width="10" height="10" fill="#cc0000"/>
      
      {/* Emergency Lighting Circuit */}
      <path d="M45 120 L750 120" stroke="#cc0000" strokeWidth="2" strokeDasharray="2,2"/>
      <circle cx="200" cy="120" r="3" fill="#cc0000"/>
      <circle cx="400" cy="120" r="3" fill="#cc0000"/>
      <circle cx="600" cy="120" r="3" fill="#cc0000"/>
    </g>
    
    {/* Keeping existing HVAC System */}
    <g className="hvac-system" style={{ display: 'none' }}>
      <path d="M250 100 A100 100 0 0 1 350 200" stroke="#00cc00" strokeWidth="3" fill="none"/>
      <path d="M450 300 A100 100 0 0 0 550 400" stroke="#00cc00" strokeWidth="3" fill="none"/>
      <circle cx="250" cy="100" r="10" fill="#00cc00"/>
      <circle cx="550" cy="400" r="10" fill="#00cc00"/>
    </g>
  </svg>
);

// Residential Building - Typical Floor
export const ResidentialFloor = () => (
  <svg width="100%" height="100%" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
    {/* Base floor plan and apartments - keeping existing layout */}
    <rect x="50" y="50" width="700" height="500" fill="none" stroke="#000" strokeWidth="2"/>
    
    {/* Apartments - keeping existing layout */}
    <rect x="75" y="75" width="250" height="200" fill="none" stroke="#000"/>
    <text x="150" y="175">3BHK-L</text>
    <rect x="75" y="325" width="200" height="200" fill="none" stroke="#000"/>
    <text x="150" y="425">3BHK</text>
    <rect x="325" y="75" width="175" height="200" fill="none" stroke="#000"/>
    <text x="375" y="175">2BHK-P</text>
    <rect x="325" y="325" width="175" height="175" fill="none" stroke="#000"/>
    <text x="375" y="425">2BHK</text>
    <rect x="550" y="75" width="150" height="150" fill="none" stroke="#000"/>
    <text x="600" y="150">1BHK-P</text>
    <rect x="550" y="275" width="150" height="125" fill="none" stroke="#000"/>
    <text x="600" y="325">1BHK</text>
    <rect x="550" y="450" width="100" height="100" fill="none" stroke="#000"/>
    <text x="575" y="500">Studio-P</text>
    <rect x="675" y="450" width="75" height="100" fill="none" stroke="#000"/>
    <text x="690" y="500">Studio</text>
    
    {/* Enhanced Water System */}
    <g className="water-system" style={{ display: 'none' }}>
      {/* Main Supply Riser */}
      <path d="M25 25 L25 575" stroke="#0066cc" strokeWidth="4" strokeDasharray="none"/>
      
      {/* Main Distribution Lines */}
      <path d="M25 50 L775 50" stroke="#0066cc" strokeWidth="3"/>
      <path d="M25 300 L775 300" stroke="#0066cc" strokeWidth="3"/>
      <path d="M25 550 L775 550" stroke="#0066cc" strokeWidth="3"/>
      
      {/* Vertical Distribution Risers */}
      <path d="M200 25 L200 575" stroke="#0066cc" strokeWidth="2" strokeDasharray="5,5"/>
      <path d="M400 25 L400 575" stroke="#0066cc" strokeWidth="2" strokeDasharray="5,5"/>
      <path d="M600 25 L600 575" stroke="#0066cc" strokeWidth="2" strokeDasharray="5,5"/>
      
      {/* Apartment Supply Lines */}
      {/* 3BHK-L */}
      <path d="M200 100 L275 100" stroke="#0066cc" strokeWidth="2" strokeDasharray="3,3"/>
      <path d="M200 150 L275 150" stroke="#0066cc" strokeWidth="2" strokeDasharray="3,3"/>
      {/* 3BHK */}
      <path d="M200 350 L275 350" stroke="#0066cc" strokeWidth="2" strokeDasharray="3,3"/>
      <path d="M200 400 L275 400" stroke="#0066cc" strokeWidth="2" strokeDasharray="3,3"/>
      {/* 2BHK-P & 2BHK */}
      <path d="M400 100 L475 100" stroke="#0066cc" strokeWidth="2" strokeDasharray="3,3"/>
      <path d="M400 350 L475 350" stroke="#0066cc" strokeWidth="2" strokeDasharray="3,3"/>
      {/* 1BHK-P & 1BHK */}
      <path d="M600 100 L675 100" stroke="#0066cc" strokeWidth="2" strokeDasharray="3,3"/>
      <path d="M600 300 L675 300" stroke="#0066cc" strokeWidth="2" strokeDasharray="3,3"/>
      {/* Studios */}
      <path d="M600 475 L650 475" stroke="#0066cc" strokeWidth="2" strokeDasharray="3,3"/>
      <path d="M600 525 L700 525" stroke="#0066cc" strokeWidth="2" strokeDasharray="3,3"/>
      
      {/* Water Outlets */}
      <circle cx="275" cy="100" r="3" fill="#0066cc"/>
      <circle cx="275" cy="150" r="3" fill="#0066cc"/>
      <circle cx="275" cy="350" r="3" fill="#0066cc"/>
      <circle cx="275" cy="400" r="3" fill="#0066cc"/>
      <circle cx="475" cy="100" r="3" fill="#0066cc"/>
      <circle cx="475" cy="350" r="3" fill="#0066cc"/>
      <circle cx="675" cy="100" r="3" fill="#0066cc"/>
      <circle cx="675" cy="300" r="3" fill="#0066cc"/>
      <circle cx="650" cy="475" r="3" fill="#0066cc"/>
      <circle cx="700" cy="525" r="3" fill="#0066cc"/>
      
      {/* Fire Sprinkler System */}
      <path d="M100 200 L700 200" stroke="#0066cc" strokeWidth="1" strokeDasharray="1,1"/>
      <path d="M100 400 L700 400" stroke="#0066cc" strokeWidth="1" strokeDasharray="1,1"/>
      <circle cx="150" cy="200" r="2" fill="#0066cc"/>
      <circle cx="300" cy="200" r="2" fill="#0066cc"/>
      <circle cx="450" cy="200" r="2" fill="#0066cc"/>
      <circle cx="600" cy="200" r="2" fill="#0066cc"/>
      <circle cx="150" cy="400" r="2" fill="#0066cc"/>
      <circle cx="300" cy="400" r="2" fill="#0066cc"/>
      <circle cx="450" cy="400" r="2" fill="#0066cc"/>
      <circle cx="600" cy="400" r="2" fill="#0066cc"/>
    </g>
    
    {/* Enhanced Electrical System */}
    <g className="electrical-system" style={{ display: 'none' }}>
      {/* Main Power Feed */}
      <rect x="775" y="25" width="20" height="40" fill="#cc0000"/>
      
      {/* Main Distribution Panel */}
      <rect x="725" y="25" width="30" height="40" fill="#cc0000"/>
      
      {/* Main Bus Ducts */}
      <path d="M725 45 L25 45" stroke="#cc0000" strokeWidth="4"/>
      <path d="M725 295 L25 295" stroke="#cc0000" strokeWidth="4"/>
      <path d="M725 545 L25 545" stroke="#cc0000" strokeWidth="4"/>
      
      {/* Sub Panels */}
      <rect x="175" y="35" width="15" height="20" fill="#cc0000"/>
      <rect x="375" y="285" width="15" height="20" fill="#cc0000"/>
      <rect x="575" y="535" width="15" height="20" fill="#cc0000"/>
      
      {/* Apartment Distribution */}
      {/* 3BHK-L & 3BHK */}
      <path d="M175 55 L175 275" stroke="#cc0000" strokeWidth="2" strokeDasharray="5,5"/>
      <path d="M175 275 L275 275" stroke="#cc0000" strokeWidth="2" strokeDasharray="5,5"/>
      <path d="M175 305 L175 525" stroke="#cc0000" strokeWidth="2" strokeDasharray="5,5"/>
      <path d="M175 525 L275 525" stroke="#cc0000" strokeWidth="2" strokeDasharray="5,5"/>
      
      {/* 2BHK-P & 2BHK */}
      <path d="M375 305 L375 525" stroke="#cc0000" strokeWidth="2" strokeDasharray="5,5"/>
      <path d="M375 525 L475 525" stroke="#cc0000" strokeWidth="2" strokeDasharray="5,5"/>
      <path d="M375 305 L475 305" stroke="#cc0000" strokeWidth="2" strokeDasharray="5,5"/>
      
      {/* 1BHK-P, 1BHK & Studios */}
      <path d="M575 555 L575 575" stroke="#cc0000" strokeWidth="2" strokeDasharray="5,5"/>
      <path d="M575 575 L675 575" stroke="#cc0000" strokeWidth="2" strokeDasharray="5,5"/>
      <path d="M575 555 L675 555" stroke="#cc0000" strokeWidth="2" strokeDasharray="5,5"/>
      
      {/* Power Outlets */}
      <rect x="270" cy="270" width="10" height="10" fill="#cc0000"/>
      <rect x="270" cy="520" width="10" height="10" fill="#cc0000"/>
      <rect x="470" cy="300" width="10" height="10" fill="#cc0000"/>
      <rect x="470" cy="520" width="10" height="10" fill="#cc0000"/>
      <rect x="670" cy="550" width="10" height="10" fill="#cc0000"/>
      <rect x="670" cy="570" width="10" height="10" fill="#cc0000"/>
      
      {/* Emergency Lighting */}
      <path d="M50 250 L750 250" stroke="#cc0000" strokeWidth="1" strokeDasharray="2,2"/>
      <path d="M50 500 L750 500" stroke="#cc0000" strokeWidth="1" strokeDasharray="2,2"/>
      <circle cx="150" cy="250" r="2" fill="#cc0000"/>
      <circle cx="300" cy="250" r="2" fill="#cc0000"/>
      <circle cx="450" cy="250" r="2" fill="#cc0000"/>
      <circle cx="600" cy="250" r="2" fill="#cc0000"/>
      <circle cx="150" cy="500" r="2" fill="#cc0000"/>
      <circle cx="300" cy="500" r="2" fill="#cc0000"/>
      <circle cx="450" cy="500" r="2" fill="#cc0000"/>
      <circle cx="600" cy="500" r="2" fill="#cc0000"/>
    </g>
    
    {/* Keeping existing HVAC System */}
    <g className="hvac-system" style={{ display: 'none' }}>
      <path d="M100 75 Q150 75 150 125" stroke="#00cc00" strokeWidth="3" fill="none"/>
      <path d="M300 75 Q350 75 350 125" stroke="#00cc00" strokeWidth="3" fill="none"/>
      <path d="M500 75 Q550 75 550 125" stroke="#00cc00" strokeWidth="3" fill="none"/>
      <path d="M150 125 L150 250" stroke="#00cc00" strokeWidth="3" fill="none"/>
      <path d="M350 125 L350 250" stroke="#00cc00" strokeWidth="3" fill="none"/>
      <path d="M550 125 L550 250" stroke="#00cc00" strokeWidth="3" fill="none"/>
      <circle cx="150" cy="125" r="10" fill="#00cc00"/>
      <circle cx="350" cy="125" r="10" fill="#00cc00"/>
      <circle cx="550" cy="125" r="10" fill="#00cc00"/>
      <path d="M150 450 Q150 500 100 500" stroke="#00cc00" strokeWidth="2" strokeDasharray="5,5"/>
      <path d="M350 450 Q350 500 300 500" stroke="#00cc00" strokeWidth="2" strokeDasharray="5,5"/>
      <path d="M550 450 Q550 500 500 500" stroke="#00cc00" strokeWidth="2" strokeDasharray="5,5"/>
    </g>
  </svg>
);