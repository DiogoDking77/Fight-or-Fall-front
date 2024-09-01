import React, { useRef, useEffect, useState } from 'react';
import BracketComponent from './BracketComponent';

const BracketCanvas = ({ numParticipants, participantNames, isManualDraw }) => {
  const canvasRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const handleWheel = (e) => {
      e.preventDefault();
      const zoomAmount = -e.deltaY * 0.01;
      setScale((prevScale) => Math.min(Math.max(prevScale + zoomAmount, 0.5), 3));
    };

    const handleMouseDown = (e) => {
      e.preventDefault();
      const startX = e.clientX;
      const startY = e.clientY;
      const startPosition = { ...position };

      const handleMouseMove = (moveEvent) => {
        const deltaX = moveEvent.clientX - startX;
        const deltaY = moveEvent.clientY - startY;
        setPosition({
          x: startPosition.x + deltaX,
          y: startPosition.y + deltaY,
        });
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    canvas.addEventListener('wheel', handleWheel);
    canvas.addEventListener('mousedown', handleMouseDown);

    return () => {
      canvas.removeEventListener('wheel', handleWheel);
      canvas.removeEventListener('mousedown', handleMouseDown);
    };
  }, [position, scale]);

  return (
    <div
      className="relative w-full h-full bg-[#1F1E1E] border border-[#B22222] rounded"
      style={{ overflow: 'hidden' }}
    >
      <div
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
        style={{
          transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
          transformOrigin: '0 0',
        }}
      >
        <BracketComponent
          numParticipants={numParticipants}
          participantNames={participantNames}
          isManualDraw={isManualDraw}
        />
      </div>
    </div>
  );
};

export default BracketCanvas;
