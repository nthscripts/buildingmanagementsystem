import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  ToggleButton,
  ToggleButtonGroup,
  Slider,
} from '@mui/material';
import {
  Search as SearchIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  Fullscreen as FullscreenIcon,
  FilterList as FilterIcon,
  Map as MapIcon,
  Plumbing as PlumbingIcon,
  ElectricBolt as ElectricalIcon,
  Hvac as HvacIcon,
  Close as CloseIcon,
  ViewInAr as View3DIcon,
} from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { buildingsData } from './Buildings';
import { PlumbingFloorPlan } from '../assets/PlumbingFloorPlan';
import ModelViewer from './ModelViewer';

const buildingFloorData = {
  1: [  // Main Office Building
    {
      id: 1,
      name: 'Ground Floor',
      totalArea: '10,000 sq ft',
      occupancy: '85%',
      zones: ['Reception', 'Cafeteria', 'Meeting Rooms'],
      status: 'Operational',
    },
    {
      id: 2,
      name: '1st Floor',
      totalArea: '12,000 sq ft',
      occupancy: '92%',
      zones: ['Open Office', 'Conference Rooms', 'Break Room'],
      status: 'Maintenance',
    },
    {
      id: 3,
      name: '2nd Floor',
      totalArea: '11,500 sq ft',
      occupancy: '78%',
      zones: ['Private Offices', 'Meeting Rooms', 'Storage'],
      status: 'Operational',
    },
  ],
  2: [  // Research Facility
    {
      id: 1,
      name: 'Ground Floor',
      totalArea: '15,000 sq ft',
      occupancy: '75%',
      zones: ['Labs', 'Testing Areas', 'Storage'],
      status: 'Operational',
    },
    {
      id: 2,
      name: '1st Floor',
      totalArea: '15,000 sq ft',
      occupancy: '80%',
      zones: ['Research Labs', 'Office Space', 'Equipment Room'],
      status: 'Operational',
    },
  ],
  3: [  // Storage Warehouse
    {
      id: 1,
      name: 'Ground Floor',
      totalArea: '20,000 sq ft',
      occupancy: '65%',
      zones: ['Loading Bay', 'Storage Areas', 'Office'],
      status: 'Operational',
    },
  ],
  4: [  // Luxury Residential Tower
    {
      id: 1,
      name: 'Ground Floor',
      totalArea: '12,000 sq ft',
      occupancy: '90%',
      zones: ['Lobby', 'Security', 'Mailroom', 'Utilities'],
      status: 'Operational',
    },
    ...Array.from({ length: 9 }, (_, i) => ({
      id: i + 2,
      name: `${i + 1}${i === 0 ? 'st' : i === 1 ? 'nd' : i === 2 ? 'rd' : 'th'} Floor`,
      totalArea: '10,000 sq ft',
      occupancy: '85%',
      zones: ['3BHK-L', '3BHK', '2BHK-P', '2BHK', '1BHK-P', '1BHK', 'Studio-P', 'Studio'],
      status: 'Operational',
    })),
  ],
};

const defaultFloorData = [
  {
    id: 1,
    name: 'Ground Floor',
    totalArea: '10,000 sq ft',
    occupancy: '85%',
    zones: ['Reception', 'Cafeteria', 'Meeting Rooms'],
    status: 'Operational',
  },
  {
    id: 2,
    name: '1st Floor',
    totalArea: '12,000 sq ft',
    occupancy: '92%',
    zones: ['Open Office', 'Conference Rooms', 'Break Room'],
    status: 'Maintenance',
  },
  {
    id: 3,
    name: '2nd Floor',
    totalArea: '11,500 sq ft',
    occupancy: '78%',
    zones: ['Private Offices', 'Meeting Rooms', 'Storage'],
    status: 'Operational',
  },
];

const FloorViewer = ({ buildingId: propBuildingId }) => {
  const [selectedBuilding, setSelectedBuilding] = useState(propBuildingId || 1);
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [showPerspective, setShowPerspective] = useState(false);
  const [perspectiveRotation, setPerspectiveRotation] = useState({ x: 30, y: 0 });
  const [modelViewerOpen, setModelViewerOpen] = useState(false);
  const currentFloorData = buildingFloorData[selectedBuilding] || defaultFloorData;

  useEffect(() => {
    if (propBuildingId) {
      setSelectedBuilding(propBuildingId);
      setSelectedFloor(1);
    }
  }, [propBuildingId]);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [systems, setSystems] = useState([]);

  const handleZoomIn = () => {
    setZoomLevel(Math.min(zoomLevel + 10, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel(Math.max(zoomLevel - 10, 50));
  };

  const handleSystemsChange = (event, newSystems) => {
    setSystems(newSystems);
  };

  useEffect(() => {
    // Update system visibility based on selected systems
    const waterSystem = document.getElementsByClassName('water-system');
    const electricalSystem = document.getElementsByClassName('electrical-system');
    const hvacSystem = document.getElementsByClassName('hvac-system');

    Array.from(waterSystem).forEach(element => {
      element.style.opacity = systems.includes('water') ? '1' : '0';
      element.style.visibility = systems.includes('water') ? 'visible' : 'hidden';
    });

    Array.from(electricalSystem).forEach(element => {
      element.style.opacity = systems.includes('electrical') ? '1' : '0';
      element.style.visibility = systems.includes('electrical') ? 'visible' : 'hidden';
    });

    Array.from(hvacSystem).forEach(element => {
      element.style.opacity = systems.includes('hvac') ? '1' : '0';
      element.style.visibility = systems.includes('hvac') ? 'visible' : 'hidden';
    });
  }, [systems]);

  const renderFloorPlan = () => {
    return <PlumbingFloorPlan />;
  };

  const handleRotationChange = (axis, value) => {
    setPerspectiveRotation(prev => ({
      ...prev,
      [axis]: value
    }));
  };

  const systemColors = {
    water: '#0066cc',
    electrical: '#cc0000',
    hvac: '#00cc00'
  };

  const renderPerspectiveView = () => {
    return (
      <Box sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: 'rgba(0, 0, 0, 0.9)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4
      }}>
        <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
          <IconButton onClick={() => setShowPerspective(false)} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        
        <Typography variant="h5" sx={{ color: 'white', mb: 3 }}>
          {buildingsData.find(b => b.id === selectedBuilding)?.name} - {currentFloorData.find(f => f.id === selectedFloor)?.name}
        </Typography>

        <Box sx={{ display: 'flex', gap: 4, mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography sx={{ color: 'white' }}>Rotation X:</Typography>
              <Slider
                value={perspectiveRotation.x}
                onChange={(e, value) => handleRotationChange('x', value)}
                min={0}
                max={60}
                sx={{ width: 120, color: 'white' }}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography sx={{ color: 'white' }}>Rotation Y:</Typography>
              <Slider
                value={perspectiveRotation.y}
                onChange={(e, value) => handleRotationChange('y', value)}
                min={0}
                max={60}
                sx={{ width: 120, color: 'white' }}
              />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <ToggleButtonGroup
              value={systems}
              onChange={handleSystemsChange}
              aria-label="system layers"
              sx={{ bgcolor: 'rgba(255,255,255,0.1)' }}
            >
              <ToggleButton 
                value="water" 
                aria-label="water system" 
                sx={{ 
                  color: 'white',
                  '&.Mui-selected': { bgcolor: `${systemColors.water}40` },
                  '&:hover': { bgcolor: `${systemColors.water}20` }
                }}
              >
                <PlumbingIcon sx={{ mr: 1, color: systemColors.water }} />
                Water
              </ToggleButton>
              <ToggleButton 
                value="electrical" 
                aria-label="electrical system" 
                sx={{ 
                  color: 'white',
                  '&.Mui-selected': { bgcolor: `${systemColors.electrical}40` },
                  '&:hover': { bgcolor: `${systemColors.electrical}20` }
                }}
              >
                <ElectricalIcon sx={{ mr: 1, color: systemColors.electrical }} />
                Electrical
              </ToggleButton>
              <ToggleButton 
                value="hvac" 
                aria-label="hvac system" 
                sx={{ 
                  color: 'white',
                  '&.Mui-selected': { bgcolor: `${systemColors.hvac}40` },
                  '&:hover': { bgcolor: `${systemColors.hvac}20` }
                }}
              >
                <HvacIcon sx={{ mr: 1, color: systemColors.hvac }} />
                HVAC
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>
        
        <Box sx={{
          width: '80%',
          height: '70vh',
          bgcolor: 'white',
          borderRadius: 2,
          overflow: 'hidden',
          position: 'relative',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
        }}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%) perspective(1000px) rotateX(${perspectiveRotation.x}deg) rotateY(${perspectiveRotation.y}deg)`,
            width: '90%',
            height: '90%',
            transition: 'transform 0.3s ease',
            '& .water-system': {
              stroke: systemColors.water,
              strokeWidth: 2,
              filter: `drop-shadow(0 0 2px ${systemColors.water})`,
              opacity: systems.includes('water') ? 1 : 0,
              transition: 'opacity 0.3s ease'
            },
            '& .electrical-system': {
              stroke: systemColors.electrical,
              strokeWidth: 2,
              filter: `drop-shadow(0 0 2px ${systemColors.electrical})`,
              opacity: systems.includes('electrical') ? 1 : 0,
              transition: 'opacity 0.3s ease'
            },
            '& .hvac-system': {
              stroke: systemColors.hvac,
              strokeWidth: 2,
              filter: `drop-shadow(0 0 2px ${systemColors.hvac})`,
              opacity: systems.includes('hvac') ? 1 : 0,
              transition: 'opacity 0.3s ease'
            }
          }}>
            {renderFloorPlan()}
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'stretch', sm: 'center' },
        mb: 3,
        gap: 2
      }}>
        <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }} gutterBottom>
          Floor Viewer
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button
            variant="outlined"
            startIcon={<FilterIcon />}
            fullWidth={false}
            sx={{ minWidth: { xs: '100%', sm: 'auto' } }}
          >
            Filters
          </Button>
          <Button
            variant="contained"
            startIcon={<MapIcon />}
            onClick={() => setModelViewerOpen(true)}
            fullWidth={false}
            sx={{ minWidth: { xs: '100%', sm: 'auto' } }}
          >
            View 3D Model
          </Button>
          <ModelViewer
            open={modelViewerOpen}
            onClose={() => setModelViewerOpen(false)}
          />
        </Box>
      </Box>

      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: { xs: 1.5, sm: 2 }, mb: { xs: 2, sm: 2 } }}>
            <Typography variant="subtitle1" gutterBottom>
              Building Selection
            </Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Building</InputLabel>
              <Select
                value={selectedBuilding}
                onChange={(e) => setSelectedBuilding(e.target.value)}
                label="Building"
                size="small"
              >
                {buildingsData.map((building) => (
                  <MenuItem key={building.id} value={building.id}>
                    {building.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Typography variant="subtitle1" gutterBottom>
              Floor Selection
            </Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Select Floor</InputLabel>
              <Select
                value={selectedFloor}
                label="Select Floor"
                onChange={(e) => setSelectedFloor(e.target.value)}
                size="small"
              >
                {currentFloorData.map((floor) => (
                  <MenuItem key={floor.id} value={floor.id}>
                    {floor.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Paper>

          <Paper sx={{ p: { xs: 1.5, sm: 2 }, mb: { xs: 2, sm: 2 } }}>
            <Typography variant="subtitle1" gutterBottom>
              System Layers
            </Typography>
            <ToggleButtonGroup
              orientation="vertical"
              value={systems}
              onChange={handleSystemsChange}
              aria-label="system layers"
              sx={{ width: '100%' }}
            >
              <ToggleButton value="water" aria-label="water system" sx={{ justifyContent: 'flex-start', py: 1 }}>
                <PlumbingIcon sx={{ mr: 1, color: '#0066cc' }} />
                Water System
              </ToggleButton>
              <ToggleButton value="electrical" aria-label="electrical system" sx={{ justifyContent: 'flex-start', py: 1 }}>
                <ElectricalIcon sx={{ mr: 1, color: '#cc0000' }} />
                Electrical System
              </ToggleButton>
              <ToggleButton value="hvac" aria-label="hvac system" sx={{ justifyContent: 'flex-start', py: 1 }}>
                <HvacIcon sx={{ mr: 1, color: '#00cc00' }} />
                HVAC System
              </ToggleButton>
            </ToggleButtonGroup>
          </Paper>

          <Paper sx={{ p: { xs: 1.5, sm: 2 }, mb: { xs: 2, sm: 2 } }}>
            <Typography variant="subtitle1" gutterBottom>
              Floor Details
            </Typography>
            {currentFloorData
              .filter((floor) => floor.id === selectedFloor)
              .map((floor) => (
                <Box key={floor.id}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Total Area:</strong> {floor.totalArea}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Occupancy:</strong> {floor.occupancy}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Status:</strong> {floor.status}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Zones:</strong>
                  </Typography>
                  <Box sx={{ pl: 2 }}>
                    {floor.zones.map((zone, index) => (
                      <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>
                        • {zone}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              ))}
          </Paper>
        </Grid>

        <Grid item xs={12} md={9}>
          <Paper sx={{ p: { xs: 1, sm: 2 }, height: { xs: '400px', sm: '500px', md: '600px' }, position: 'relative' }}>
            <Box sx={{
              position: 'absolute',
              top: { xs: 8, sm: 16 },
              left: { xs: 8, sm: 16 },
              zIndex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 1
            }}>
              <Tooltip title="Zoom In">
                <IconButton onClick={handleZoomIn} size="small">
                  <ZoomInIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Zoom Out">
                <IconButton onClick={handleZoomOut} size="small">
                  <ZoomOutIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Fullscreen">
                <IconButton size="small">
                  <FullscreenIcon />
                </IconButton>
              </Tooltip>
            </Box>

           

            <Box sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `scale(${zoomLevel / 100})`,
              transition: 'transform 0.3s ease'
            }}>
              {renderFloorPlan()}
            </Box>
          </Paper>
        </Grid>
      </Grid>
      {showPerspective && renderPerspectiveView()}
    </Box>
  );
};

export default FloorViewer;