import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, Box, Slider, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BrightnessHighIcon from '@mui/icons-material/BrightnessHigh';
import ContrastIcon from '@mui/icons-material/Contrast';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const ModelViewer = ({ open, onClose }) => {
  const [currentAngle, setCurrentAngle] = useState(0);
  const [currentImage, setCurrentImage] = useState(null);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);

  useEffect(() => {
    // Load the image for the current angle
    const imageNumber = currentAngle.toString().padStart(4, '0');
    const imagePath = `../images/ABlock${imageNumber}.jpg`;
    setCurrentImage(imagePath);
  }, [currentAngle]);

  const handleSliderChange = (event, newValue) => {
    // Round to nearest 20 since we have images at 20-degree intervals
    const roundedValue = Math.round(newValue / 20) * 20;
    setCurrentAngle(roundedValue);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev * 1.2, 5));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev / 1.2, 0.5));
  };

  const handleResetView = () => {
    setZoom(1);
    setPanX(0);
    setPanY(0);
  };

  const handleMouseDown = (e) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - panX, y: e.clientY - panY });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && zoom > 1) {
      setPanX(e.clientX - dragStart.x);
      setPanY(e.clientY - dragStart.y);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(prev => Math.min(Math.max(prev * delta, 0.5), 5));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
    >
      <Box sx={{ position: 'relative' }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'grey.500',
            zIndex: 1
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              py: 2
            }}
          >
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box
                sx={{
                  flex: 1,
                  height: '500px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#f5f5f5',
                  borderRadius: 1,
                  overflow: 'hidden',
                  position: 'relative',
                  cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onWheel={handleWheel}
              >
              {currentImage && (
                <img
                  ref={imageRef}
                  src={currentImage}
                  alt={`3D view at ${currentAngle} degrees`}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    filter: `brightness(${brightness}%) contrast(${contrast}%)`,
                    transform: `scale(${zoom}) translate(${panX / zoom}px, ${panY / zoom}px)`,
                    transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                    userSelect: 'none',
                    pointerEvents: 'none'
                  }}
                />
              )}
              {/* Zoom Controls */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 8,
                  left: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  zIndex: 1
                }}
              >
                <IconButton
                  size="small"
                  onClick={handleZoomIn}
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' }
                  }}
                >
                  <ZoomInIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={handleZoomOut}
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' }
                  }}
                >
                  <ZoomOutIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={handleResetView}
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' }
                  }}
                >
                  <RestartAltIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
              <Box sx={{ width: 200, p: 2, bgcolor: 'background.paper', borderRadius: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ZoomInIcon sx={{ fontSize: 20 }} />
                  <Typography variant="body2" sx={{ fontSize: 12 }}>Zoom: {Math.round(zoom * 100)}%</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <BrightnessHighIcon sx={{ fontSize: 20 }} />
                  <Typography variant="body2" sx={{ fontSize: 12 }}>Brightness</Typography>
                </Box>
                <Slider
                  size="small"
                  value={brightness}
                  onChange={(e, value) => setBrightness(value)}
                  min={50}
                  max={150}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `${value}%`}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ContrastIcon sx={{ fontSize: 20 }} />
                  <Typography variant="body2" sx={{ fontSize: 12 }}>Contrast</Typography>
                </Box>
                <Slider
                  size="small"
                  value={contrast}
                  onChange={(e, value) => setContrast(value)}
                  min={50}
                  max={150}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `${value}%`}
                />
              </Box>
            </Box>
            <Box sx={{ width: '100%', mt: 2 }}>
              <Slider
                value={currentAngle}
                onChange={handleSliderChange}
                min={0}
                max={360}
                step={20}
                marks
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value}°`}
              />
            </Box>
          </Box>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default ModelViewer;