import { useEffect, useRef, useState } from 'react';
import { Box, Typography, Button, ButtonGroup } from '@mui/material';
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import { TextureLoader, BackSide } from 'three';
import { useLocation } from 'react-router-dom';

const PanoramicSphere = ({ src }) => {
  const texture = useLoader(TextureLoader, src);
  return (
    <mesh scale={[-1, 1, 1]}>
      <sphereGeometry args={[500, 64, 64]} />
      <meshBasicMaterial map={texture} side={BackSide} />
    </mesh>
  );
};

const DragLookControls = () => {
  const { camera, gl } = useThree();
  const draggingRef = useRef(false);
  const lastRef = useRef({ x: 0, y: 0 });
  const yawRef = useRef(0);
  const pitchRef = useRef(0);

  useEffect(() => {
    camera.position.set(0, 0, 0.01);
    camera.rotation.order = 'YXZ';
    const dom = gl.domElement;
    const onDown = (e) => {
      if (e.button !== 0) return;
      draggingRef.current = true;
      lastRef.current = { x: e.clientX, y: e.clientY };
      e.preventDefault();
    };
    const onMove = (e) => {
      if (!draggingRef.current) return;
      const dx = e.clientX - lastRef.current.x;
      const dy = e.clientY - lastRef.current.y;
      lastRef.current = { x: e.clientX, y: e.clientY };
      yawRef.current += dx * 0.0015;
      pitchRef.current += dy * 0.0015;
      const limit = Math.PI / 2 - 0.05;
      if (pitchRef.current > limit) pitchRef.current = limit;
      if (pitchRef.current < -limit) pitchRef.current = -limit;
      camera.rotation.set(pitchRef.current, yawRef.current, 0);
    };
    const onUp = () => {
      draggingRef.current = false;
    };
    const onWheel = (e) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      camera.zoom = Math.min(Math.max(camera.zoom * delta, 1.0), 2.5);
      camera.updateProjectionMatrix();
    };
    dom.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    dom.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      dom.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      dom.removeEventListener('wheel', onWheel);
    };
  }, [camera, gl]);
  return null;
};

const InteriorViewer = () => {
  const location = useLocation();
  const floor = location.state?.floor;
  const [view, setView] = useState(1);
  const sources = {
    1: '/images/NewYork_BlockView0010000.jpg',
    2: '/images/NewYork_BlockView0020000.jpg',
  };
  const src = sources[view];
  return (
    <Box sx={{ width: '100%', height: 'calc(100vh - 64px)', position: 'relative' }}>
      <Canvas camera={{ fov: 75 }}>
        <DragLookControls />
        <PanoramicSphere src={src} />
      </Canvas>
      <Box sx={{ position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)', bgcolor: 'rgba(255,255,255,0.9)', borderRadius: 1, p: 1 }}>
        <ButtonGroup size="small" variant="text">
          <Button onClick={() => setView(1)} variant={view === 1 ? 'contained' : 'text'}>View 1</Button>
          <Button onClick={() => setView(2)} variant={view === 2 ? 'contained' : 'text'}>View 2</Button>
        </ButtonGroup>
      </Box>
      {floor && (
        <Box sx={{ position: 'absolute', top: 8, left: 8, bgcolor: 'rgba(0,0,0,0.5)', color: 'white', px: 1.5, py: 0.75, borderRadius: 1 }}>
          <Typography variant="body2">Floor {floor}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default InteriorViewer;