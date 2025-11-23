import { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const toColorKey = (r, g, b, a) => `${r},${g},${b},${a}`;

const BlockViewer = ({ floorCount, onSelect }) => {
  const containerRef = useRef(null);
  const maskCanvasRef = useRef(null);
  const overlayCanvasRef = useRef(null);
  const drawRectRef = useRef({ left: 0, width: 0, height: 0 });
  const [segments, setSegments] = useState([]);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();
  const baseSrc = `../images/ABlock_BlockView0010000.jpg`;
  const maskSrc = `../images/ABlock_BlockView001_Mask0000.png`;

  useEffect(() => {
    const img = new Image();
    const mask = new Image();
    img.crossOrigin = 'anonymous';
    mask.crossOrigin = 'anonymous';
    img.src = baseSrc;
    mask.src = maskSrc;

    const computeSegments = () => {
      const canvas = maskCanvasRef.current;
      const overlay = overlayCanvasRef.current;
      const container = containerRef.current;
      if (!canvas || !overlay || !container || !mask.width || !mask.height) return;
      const rect = container.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width));
      canvas.height = Math.max(1, Math.floor(rect.height));
      overlay.width = canvas.width;
      overlay.height = canvas.height;
      const ctx = canvas.getContext('2d');
      const octx = overlay.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = false;
      octx.imageSmoothingEnabled = false;
      const displayedWidth = Math.max(1, Math.floor((img.width / img.height) * canvas.height));
      const left = Math.max(0, Math.floor((canvas.width - displayedWidth) / 2));
      drawRectRef.current = { left, width: displayedWidth, height: canvas.height };
      ctx.drawImage(mask, left, 0, displayedWidth, canvas.height);
      octx.clearRect(0, 0, overlay.width, overlay.height);
      const cx = Math.floor(left + displayedWidth / 2);
      const colors = [];
      let current = null;
      for (let y = 0; y < canvas.height; y++) {
        const d = ctx.getImageData(cx, y, 1, 1).data;
        const key = toColorKey(d[0], d[1], d[2], d[3]);
        if (!current) {
          current = { key, y0: y, y1: y };
        } else if (current.key === key) {
          current.y1 = y;
        } else {
          colors.push(current);
          current = { key, y0: y, y1: y };
        }
      }
      if (current) colors.push(current);
      const filtered = colors.filter(s => s.key !== toColorKey(0, 0, 0, 0));
      const byHeight = filtered.filter(s => s.y1 - s.y0 > 2);
      const bottomUp = byHeight.sort((a, b) => b.y1 - a.y1);
      const limited = bottomUp.slice(0, floorCount);
      const mapped = limited.map((s, i) => ({ index: i + 1, key: s.key, y0: s.y0, y1: s.y1 })).reverse();
      setSegments(mapped);
    };

    const onLoadBoth = () => computeSegments();
    let loaded = 0;
    const check = () => { loaded++; if (loaded === 2) onLoadBoth(); };
    img.onload = check;
    mask.onload = check;

    const handleResize = () => computeSegments();
    window.addEventListener('resize', handleResize);
    return () => {
      img.onload = null;
      mask.onload = null;
      window.removeEventListener('resize', handleResize);
    };
  }, [baseSrc, maskSrc, floorCount]);

  const pickFloorByPoint = (clientX, clientY) => {
    const container = containerRef.current;
    const canvas = maskCanvasRef.current;
    if (!container || !canvas || segments.length === 0) return null;
    const rect = container.getBoundingClientRect();
    const rx = (clientX - rect.left) / rect.width;
    const ry = (clientY - rect.top) / rect.height;
    const xOnMask = Math.floor(rx * canvas.width);
    const { left, width } = drawRectRef.current;
    if (xOnMask < left || xOnMask > left + width) return null;
    const yOnMask = Math.floor(ry * canvas.height);
    const hit = segments.find(s => yOnMask >= s.y0 && yOnMask <= s.y1);
    return hit ? hit.index : null;
  };

  const handleClick = e => {
    const idx = pickFloorByPoint(e.clientX, e.clientY);
    if (!idx) return;
    if (onSelect) {
      onSelect(idx);
    } else {
      navigate('/interior-viewer', { state: { floor: idx } });
    }
  };

  const applyHoverOverlay = (colorKey) => {
    const overlay = overlayCanvasRef.current;
    const container = containerRef.current;
    if (!overlay || !container || !colorKey) return;
    const octx = overlay.getContext('2d');
    const rect = container.getBoundingClientRect();
    const w = Math.max(1, Math.floor(rect.width));
    const h = Math.max(1, Math.floor(rect.height));
    overlay.width = w;
    overlay.height = h;
    octx.imageSmoothingEnabled = false;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = maskSrc;
    img.onload = () => {
      octx.clearRect(0, 0, w, h);
      const { left, width } = drawRectRef.current;
      octx.drawImage(img, left, 0, width, h);
      const imgData = octx.getImageData(0, 0, w, h);
      const target = colorKey.split(',').map(n => parseInt(n, 10));
      for (let i = 0; i < imgData.data.length; i += 4) {
        const r = imgData.data[i];
        const g = imgData.data[i + 1];
        const b = imgData.data[i + 2];
        const a = imgData.data[i + 3];
        const match = r === target[0] && g === target[1] && b === target[2] && a === target[3];
        if (!match) {
          imgData.data[i + 3] = 0;
        } else {
          imgData.data[i + 3] = 120;
        }
      }
      octx.putImageData(imgData, 0, 0);
    };
  };

  const clearOverlay = () => {
    const overlay = overlayCanvasRef.current;
    if (!overlay) return;
    const octx = overlay.getContext('2d');
    octx.clearRect(0, 0, overlay.width, overlay.height);
  };

  const handleMove = e => {
    const idx = pickFloorByPoint(e.clientX, e.clientY);
    const container = containerRef.current;
    if (container) {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setTooltipPos({ x, y });
    }
    if (idx !== hoverIndex) {
      setHoverIndex(idx);
      const seg = segments.find(s => s.index === idx);
      if (seg) applyHoverOverlay(seg.key); else clearOverlay();
    }
  };

  const handleLeave = () => {
    setHoverIndex(null);
    clearOverlay();
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="subtitle1" gutterBottom>Block Viewer</Typography>
      <Box
        ref={containerRef}
        onClick={handleClick}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        sx={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          borderRadius: 1,
          overflow: 'hidden',
          cursor: 'pointer'
        }}
      >
        <img
          src={baseSrc}
          alt="Building"
          style={{ height: '100%', width: 'auto', display: 'block', margin: '0 auto' }}
        />
        <canvas ref={overlayCanvasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
        <canvas ref={maskCanvasRef} style={{ display: 'none', width: '100%', height: '100%' }} />
        {hoverIndex && (
          <Box sx={{
            position: 'absolute',
            left: Math.max(8, Math.min(tooltipPos.x, (containerRef.current?.clientWidth || 0) - 60)),
            top: Math.max(8, tooltipPos.y - 28),
            bgcolor: 'rgba(0,0,0,0.65)',
            color: 'white',
            px: 1,
            py: 0.5,
            borderRadius: 1,
            fontSize: 12,
            pointerEvents: 'none'
          }}>
            Floor {hoverIndex}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default BlockViewer;