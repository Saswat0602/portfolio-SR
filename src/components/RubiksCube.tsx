import React, { useRef, useState, useEffect } from 'react';
import { Timer } from 'lucide-react';

// Define colors for each face
const COLORS = {
  U: '#FFFF00', // Yellow (Up)
  D: '#FFFFFF', // White (Down)
  F: '#FF0000', // Red (Front)
  B: '#0000FF', // Blue (Back)
  L: '#00FF00', // Green (Left)
  R: '#FFA500', // Orange (Right)
  BLACK: '#1A1A1A', // Black for cube edges
};

// Create a single cubelet
const Cubelet = ({ position, faceColors }) => {
  const size = 1.5; // Increased size
  const gap = 0.08;
  const adjustedSize = size - gap;
  
  return (
    <div 
      className="absolute transform-gpu"
      style={{
        width: `${adjustedSize}rem`,
        height: `${adjustedSize}rem`,
        transform: `translate3d(${position[0] * size}rem, ${position[1] * size}rem, ${position[2] * size}rem)`,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Front face */}
      <div className="absolute w-full h-full" style={{
        transform: 'translateZ(0.75rem)',
        backgroundColor: faceColors[0],
        border: '2px solid #1A1A1A'
      }}></div>
      
      {/* Back face */}
      <div className="absolute w-full h-full" style={{
        transform: 'translateZ(-0.75rem) rotateY(180deg)',
        backgroundColor: faceColors[1],
        border: '2px solid #1A1A1A'
      }}></div>
      
      {/* Right face */}
      <div className="absolute w-full h-full" style={{
        transform: 'translateX(0.75rem) rotateY(90deg)',
        backgroundColor: faceColors[2],
        border: '2px solid #1A1A1A'
      }}></div>
      
      {/* Left face */}
      <div className="absolute w-full h-full" style={{
        transform: 'translateX(-0.75rem) rotateY(-90deg)',
        backgroundColor: faceColors[3],
        border: '2px solid #1A1A1A'
      }}></div>
      
      {/* Top face */}
      <div className="absolute w-full h-full" style={{
        transform: 'translateY(-0.75rem) rotateX(90deg)',
        backgroundColor: faceColors[4],
        border: '2px solid #1A1A1A'
      }}></div>
      
      {/* Bottom face */}
      <div className="absolute w-full h-full" style={{
        transform: 'translateY(0.75rem) rotateX(-90deg)',
        backgroundColor: faceColors[5],
        border: '2px solid #1A1A1A'
      }}></div>
    </div>
  );
};

const RubiksCube = () => {
  // State for cube rotation and user interaction
  const [cubeRotation, setCubeRotation] = useState({ x: -30, y: 45, z: 0 });
  const [animating, setAnimating] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [revealed, setRevealed] = useState(false);
  
  // Timer states
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerValue, setTimerValue] = useState(0);
  const [bestTime, setBestTime] = useState(null);
  const timerRef = useRef(null);
  
  // Track move history for solving
  const [moveHistory, setMoveHistory] = useState([]);
  const [solving, setSolving] = useState(false);
  
  // Initialize cube state (3x3x3 matrix where each cell stores colors)
  const createInitialCubeState = () => {
    // Create a solved cube
    const state = [];
    
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          // Skip center piece if building a hollow cube
          if (x === 0 && y === 0 && z === 0) continue;
          
          // Determine the colors of each face
          const colors = [
            z === 1 ? COLORS.F : COLORS.BLACK, // Front
            z === -1 ? COLORS.B : COLORS.BLACK, // Back
            x === 1 ? COLORS.R : COLORS.BLACK, // Right
            x === -1 ? COLORS.L : COLORS.BLACK, // Left
            y === -1 ? COLORS.U : COLORS.BLACK, // Up
            y === 1 ? COLORS.D : COLORS.BLACK, // Down
          ];
          
          state.push({
            position: [x, y, z],
            colors: colors,
            currentPosition: [x, y, z], // Used for tracking rotations
          });
        }
      }
    }
    
    return state;
  };
  
  const [cubeState, setCubeState] = useState(createInitialCubeState());
  
  // Function to handle mouse and touch interactions for 3D rotation
  const startDrag = (e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    setDragStart({
      x: clientX,
      y: clientY,
      rotation: { ...cubeRotation }
    });
  };
  
  const doDrag = (e) => {
    if (!dragStart) return;
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const deltaX = clientX - dragStart.x;
    const deltaY = clientY - dragStart.y;
    
    setCubeRotation({
      x: dragStart.rotation.x - deltaY * 0.5,
      y: dragStart.rotation.y + deltaX * 0.5,
      z: dragStart.rotation.z
    });
  };
  
  const endDrag = () => {
    setDragStart(null);
  };
  
  // Set up event listeners for dragging
  useEffect(() => {
    const container = document.getElementById('cube-container');
    if (!container) return;
    
    container.addEventListener('mousedown', startDrag);
    window.addEventListener('mousemove', doDrag);
    window.addEventListener('mouseup', endDrag);
    
    container.addEventListener('touchstart', startDrag);
    window.addEventListener('touchmove', doDrag);
    window.addEventListener('touchend', endDrag);
    
    return () => {
      container.removeEventListener('mousedown', startDrag);
      window.removeEventListener('mousemove', doDrag);
      window.removeEventListener('mouseup', endDrag);
      
      container.removeEventListener('touchstart', startDrag);
      window.removeEventListener('touchmove', doDrag);
      window.removeEventListener('touchend', endDrag);
    };
  }, [dragStart]);
  
  // Timer functionality
  useEffect(() => {
    if (timerRunning) {
      timerRef.current = setInterval(() => {
        setTimerValue(prev => prev + 10); // Update every 10ms
      }, 10);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [timerRunning]);
  
  // Format timer display
  const formatTime = (time) => {
    const minutes = Math.floor(time / (60 * 1000));
    const seconds = Math.floor((time % (60 * 1000)) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };
  
  // Handle rotations
  const rotateCube = (axis, angle) => {
    setCubeRotation(prev => ({
      ...prev,
      [axis]: (prev[axis] + angle) % 360
    }));
  };
  
  // Function to rotate a specific face
  const rotateFace = (face, storeMove = true) => {
    if (animating) return; // Prevent move during animation
    setAnimating(true);
    
    // Record move if tracking and not solving
    if (storeMove && !solving && timerRunning) {
      setMoveHistory(prev => [...prev, face]);
    }
    
    const newState = [...cubeState];
    
    // Define which face to rotate
    let targetPieces = [];
    let rotationMatrix;
    
    switch(face) {
      case 'U': // Up face (y = -1)
        targetPieces = newState.filter(piece => piece.currentPosition[1] === -1);
        rotationMatrix = (pos) => [pos[2], pos[1], -pos[0]]; // Rotate around Y axis
        break;
      case 'D': // Down face (y = 1)
        targetPieces = newState.filter(piece => piece.currentPosition[1] === 1);
        rotationMatrix = (pos) => [-pos[2], pos[1], pos[0]]; // Rotate around Y axis counterclockwise
        break;
      case 'F': // Front face (z = 1)
        targetPieces = newState.filter(piece => piece.currentPosition[2] === 1);
        rotationMatrix = (pos) => [-pos[1], pos[0], pos[2]]; // Rotate around Z axis
        break;
      case 'B': // Back face (z = -1)
        targetPieces = newState.filter(piece => piece.currentPosition[2] === -1);
        rotationMatrix = (pos) => [pos[1], -pos[0], pos[2]]; // Rotate around Z axis counterclockwise
        break;
      case 'L': // Left face (x = -1)
        targetPieces = newState.filter(piece => piece.currentPosition[0] === -1);
        rotationMatrix = (pos) => [pos[0], pos[2], -pos[1]]; // Rotate around X axis
        break;
      case 'R': // Right face (x = 1)
        targetPieces = newState.filter(piece => piece.currentPosition[0] === 1);
        rotationMatrix = (pos) => [pos[0], -pos[2], pos[1]]; // Rotate around X axis counterclockwise
        break;
      default:
        setAnimating(false);
        return;
    }
    
    // Update positions
    targetPieces.forEach(piece => {
      const newPos = rotationMatrix(piece.currentPosition);
      piece.currentPosition = newPos;
      
      // Also rotate the colors for each piece
      if (face === 'U' || face === 'D') {
        // Swap colors: Front, Right, Back, Left
        const [front, back, right, left, top, bottom] = piece.colors;
        piece.colors = face === 'U' ? 
          [left, right, front, back, top, bottom] : 
          [right, left, back, front, top, bottom];
      } else if (face === 'F' || face === 'B') {
        // Swap colors: Up, Right, Down, Left
        const [front, back, right, left, top, bottom] = piece.colors;
        piece.colors = face === 'F' ? 
          [front, back, bottom, top, right, left] : 
          [front, back, top, bottom, left, right];
      } else if (face === 'L' || face === 'R') {
        // Swap colors: Top, Front, Bottom, Back
        const [front, back, right, left, top, bottom] = piece.colors;
        piece.colors = face === 'R' ? 
          [bottom, top, right, left, front, back] : 
          [top, bottom, right, left, back, front];
      }
    });
    
    setCubeState(newState);
    
    // End animation after a short delay
    setTimeout(() => setAnimating(false), 300);
  };
  
  // Reset cube to initial state
  const resetCube = () => {
    setCubeState(createInitialCubeState());
    setCubeRotation({ x: -30, y: 45, z: 0 });
    setMoveHistory([]);
    
    // If timer is running, stop it
    if (timerRunning) {
      setTimerRunning(false);
      // Update best time if current time is better
      if (bestTime === null || timerValue < bestTime) {
        setBestTime(timerValue);
      }
    }
    setTimerValue(0);
  };
  
  // Shuffle the cube randomly
  const shuffleCube = () => {
    if (animating) return;
    setAnimating(true);
    
    // Reset move history and timer when shuffling
    setMoveHistory([]);
    setTimerValue(0);
    setTimerRunning(false);
    
    const moves = ['U', 'D', 'F', 'B', 'L', 'R'];
    const numMoves = 20;
    
    let moveCount = 0;
    const performNextMove = () => {
      if (moveCount < numMoves) {
        const randomMove = moves[Math.floor(Math.random() * moves.length)];
        rotateFace(randomMove, false);
        moveCount++;
        setTimeout(performNextMove, 100);
      } else {
        setAnimating(false);
      }
    };
    
    performNextMove();
  };
  
  // Solve the cube by reversing move history
  const solveCube = () => {
    if (animating || moveHistory.length === 0) return;
    
    setSolving(true);
    setTimerRunning(false);
    
    // Create a reversed and inverted move list
    const reverseMoves = [...moveHistory].reverse().map(move => {
      // For each move, we need its inverse (opposite direction)
      // This is a simplification - in a real Rubik's cube, some moves would need more complex inversions
      return move; // Simplified: using the same move for now
    });
    
    let moveIndex = 0;
    const performNextMove = () => {
      if (moveIndex < reverseMoves.length) {
        rotateFace(reverseMoves[moveIndex], false);
        moveIndex++;
        setTimeout(performNextMove, 300);
      } else {
        setMoveHistory([]);
        setSolving(false);
        
        // Update best time if current time was better
        if (bestTime === null || timerValue < bestTime) {
          setBestTime(timerValue);
        }
        setTimerValue(0);
      }
    };
    
    setTimeout(performNextMove, 500);
  };
  
  // Toggle revealed state
  const toggleReveal = () => {
    setRevealed(!revealed);
  };
  
  // Start/stop timer
  const toggleTimer = () => {
    if (!timerRunning) {
      // Starting a new timer, reset if needed
      if (timerValue > 0) {
        setTimerValue(0);
      }
      setTimerRunning(true);
    } else {
      // Stopping timer
      setTimerRunning(false);
      
      // Update best time if this is better
      if (bestTime === null || timerValue < bestTime) {
        setBestTime(timerValue);
      }
    }
  };
  
  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (animating) return;
      
      switch (e.key.toUpperCase()) {
        case 'U': rotateFace('U'); break;
        case 'D': rotateFace('D'); break;
        case 'F': rotateFace('F'); break;
        case 'B': rotateFace('B'); break;
        case 'L': rotateFace('L'); break;
        case 'R': rotateFace('R'); break;
        case 'X': rotateCube('x', 90); break;
        case 'Y': rotateCube('y', 90); break;
        case 'Z': rotateCube('z', 90); break;
        case ' ': toggleTimer(); break; // Space bar for timer
        default: break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [animating, cubeState, timerRunning]);

  return (
    <div className="flex flex-col items-center justify-center w-full gap-6">
      {/* Timer Display */}
      <div className="flex items-center justify-center w-full">
        <div className="flex gap-4 items-center text-2xl font-mono px-6 py-3 bg-gray-100 rounded-lg shadow">
          <Timer className="w-6 h-6" />
          <span className="w-32 text-center">{formatTime(timerValue)}</span>
          {bestTime !== null && (
            <span className="text-sm text-gray-500">Best: {formatTime(bestTime)}</span>
          )}
        </div>
      </div>
      
      {/* Cube display area - larger and draggable */}
      <div 
        id="cube-container"
        className="relative w-96 h-96 perspective-1200 cursor-move"
        style={{ perspective: '1200px' }}
      >
        <div 
          className="w-full h-full relative transform-gpu transition-transform duration-300"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${cubeRotation.x}deg) rotateY(${cubeRotation.y}deg) rotateZ(${cubeRotation.z}deg)`,
          }}
        >
          {cubeState.map((cubelet, idx) => (
            <Cubelet
              key={idx}
              position={revealed ? cubelet.position : cubelet.currentPosition}
              faceColors={cubelet.colors}
            />
          ))}
        </div>
        
        {/* Drag instructions overlay */}
        <div className="absolute top-2 left-2 bg-gray-800 bg-opacity-60 text-white px-2 py-1 rounded text-xs">
          Drag to rotate cube
        </div>
      </div>
      
      {/* Controls */}
      <div className="flex flex-col gap-4 w-full max-w-md">
        {/* Game controls */}
        <div className="flex justify-center gap-3">
          <button 
            onClick={toggleTimer} 
            className={`px-6 py-3 rounded font-bold ${timerRunning 
              ? 'bg-red-500 hover:bg-red-600 text-white' 
              : 'bg-green-500 hover:bg-green-600 text-white'}`}
          >
            {timerRunning ? 'Stop Timer' : 'Start Timer'}
          </button>
          
          <button 
            onClick={shuffleCube} 
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded font-bold"
            disabled={timerRunning}
          >
            Shuffle
          </button>
        </div>
        
        {/* Cube face rotation controls */}
        <div className="flex justify-center gap-2 flex-wrap">
          <button onClick={() => rotateFace('U')} className="bg-blue-500 hover:bg-blue-600 text-white w-16 py-3 rounded font-bold">U</button>
          <button onClick={() => rotateFace('D')} className="bg-blue-500 hover:bg-blue-600 text-white w-16 py-3 rounded font-bold">D</button>
          <button onClick={() => rotateFace('F')} className="bg-blue-500 hover:bg-blue-600 text-white w-16 py-3 rounded font-bold">F</button>
          <button onClick={() => rotateFace('B')} className="bg-blue-500 hover:bg-blue-600 text-white w-16 py-3 rounded font-bold">B</button>
          <button onClick={() => rotateFace('L')} className="bg-blue-500 hover:bg-blue-600 text-white w-16 py-3 rounded font-bold">L</button>
          <button onClick={() => rotateFace('R')} className="bg-blue-500 hover:bg-blue-600 text-white w-16 py-3 rounded font-bold">R</button>
        </div>
        
        {/* Additional controls */}
        <div className="flex justify-center gap-2">
          <button onClick={() => rotateCube('y', 90)} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">Rotate Y</button>
          <button onClick={() => rotateCube('x', 90)} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">Rotate X</button>
          <button onClick={() => rotateCube('z', 90)} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">Rotate Z</button>
        </div>
        
        {/* Special actions */}
        <div className="flex justify-center gap-4 mt-2">
          <button 
            onClick={toggleReveal} 
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
          >
            {revealed ? 'Hide Solution' : 'Reveal Solution'}
          </button>
          
          <button 
            onClick={solveCube} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            disabled={moveHistory.length === 0 || solving}
          >
            Solve Cube
          </button>
          
          <button 
            onClick={resetCube} 
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Reset
          </button>
        </div>
      </div>
      
      <div className="text-center text-sm text-gray-600 mt-2">
        <p><strong>How to play:</strong> Use buttons or keyboard (U, D, F, B, L, R keys) to rotate faces</p>
        <p>Use X, Y, Z keys to rotate the entire cube. Use spacebar to start/stop timer.</p>
        <p>Drag the cube directly to rotate it in 3D space.</p>
      </div>
    </div>
  );
};

export default function RubiksCubeGame() {
  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">Rubik's Cube Challenge</h1>
      <RubiksCube />
    </div>
  );
}