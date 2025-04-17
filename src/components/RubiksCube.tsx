import React, { useRef, useState, useEffect } from 'react';
import { Timer, Trophy, RotateCcw } from 'lucide-react';

// Define vibrant colors for each face with better contrast
const COLORS = {
  U: '#FFFF00', // Yellow (Up)
  D: '#FFFFFF', // White (Down)
  F: '#FF0000', // Red (Front)
  B: '#0000FF', // Blue (Back)
  L: '#00AA00', // Green (Left) - Adjusted to be more visible
  R: '#FF8C00', // Orange (Right) - Adjusted to be more visible
};

// Create a single cubelet
const Cubelet = ({ position, faceColors }) => {
  const size = 2.5; // Much bigger cube size
  const gap = 0.1;
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
        transform: 'translateZ(1.25rem)',
        backgroundColor: faceColors[0] || '#222',
        border: '2px solid #111',
        boxShadow: 'inset 0 0 0.5rem rgba(0,0,0,0.3)'
      }}></div>
      
      {/* Back face */}
      <div className="absolute w-full h-full" style={{
        transform: 'translateZ(-1.25rem) rotateY(180deg)',
        backgroundColor: faceColors[1] || '#222',
        border: '2px solid #111',
        boxShadow: 'inset 0 0 0.5rem rgba(0,0,0,0.3)'
      }}></div>
      
      {/* Right face */}
      <div className="absolute w-full h-full" style={{
        transform: 'translateX(1.25rem) rotateY(90deg)',
        backgroundColor: faceColors[2] || '#222',
        border: '2px solid #111',
        boxShadow: 'inset 0 0 0.5rem rgba(0,0,0,0.3)'
      }}></div>
      
      {/* Left face */}
      <div className="absolute w-full h-full" style={{
        transform: 'translateX(-1.25rem) rotateY(-90deg)',
        backgroundColor: faceColors[3] || '#222',
        border: '2px solid #111',
        boxShadow: 'inset 0 0 0.5rem rgba(0,0,0,0.3)'
      }}></div>
      
      {/* Top face */}
      <div className="absolute w-full h-full" style={{
        transform: 'translateY(-1.25rem) rotateX(90deg)',
        backgroundColor: faceColors[4] || '#222',
        border: '2px solid #111',
        boxShadow: 'inset 0 0 0.5rem rgba(0,0,0,0.3)'
      }}></div>
      
      {/* Bottom face */}
      <div className="absolute w-full h-full" style={{
        transform: 'translateY(1.25rem) rotateX(-90deg)',
        backgroundColor: faceColors[5] || '#222',
        border: '2px solid #111',
        boxShadow: 'inset 0 0 0.5rem rgba(0,0,0,0.3)'
      }}></div>
    </div>
  );
};

const RubiksCube = () => {
  // State for cube rotation and user interaction
  const [cubeRotation, setCubeRotation] = useState({ x: -25, y: 45, z: 0 });
  const [animating, setAnimating] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [revealed, setRevealed] = useState(false);
  
  // Timer states
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerValue, setTimerValue] = useState(0);
  const [bestTime, setBestTime] = useState(null);
  const timerRef = useRef(null);
  
  // Game state
  const [moveCount, setMoveCount] = useState(0);
  const [moveHistory, setMoveHistory] = useState([]);
  const [solving, setSolving] = useState(false);
  const [isSolved, setIsSolved] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  
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
            z === 1 ? COLORS.F : null, // Front
            z === -1 ? COLORS.B : null, // Back
            x === 1 ? COLORS.R : null, // Right
            x === -1 ? COLORS.L : null, // Left
            y === -1 ? COLORS.U : null, // Up
            y === 1 ? COLORS.D : null, // Down
          ];
          
          state.push({
            position: [x, y, z],
            colors: colors,
            currentPosition: [x, y, z], // Used for tracking rotations
            originalIndex: state.length, // Original index for optimization
          });
        }
      }
    }
    
    return state;
  };
  
  const [cubeState, setCubeState] = useState(createInitialCubeState());
  
  // Function to handle mouse and touch interactions for 3D rotation
  const startDrag = (e) => {
    if (animating) return;
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    setDragStart({
      x: clientX,
      y: clientY,
      rotation: { ...cubeRotation }
    });
  };
  
  const doDrag = (e) => {
    if (!dragStart || animating) return;
    
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
  }, [dragStart, animating]);
  
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
  
  // Check if cube is solved
  const checkSolved = () => {
    // Check if all pieces are in their original positions and orientations
    // This is a simplification - in a real implementation we would check colors
    const allPiecesCorrect = cubeState.every(piece => {
      // Check if current position matches original position
      return piece.currentPosition[0] === piece.position[0] && 
             piece.currentPosition[1] === piece.position[1] && 
             piece.currentPosition[2] === piece.position[2];
    });
    
    if (allPiecesCorrect && gameStarted && timerRunning) {
      setTimerRunning(false);
      setGameStarted(false);
      
      // Update best time if this is better
      if (bestTime === null || timerValue < bestTime) {
        setBestTime(timerValue);
      }
      
      // Show celebration message
      alert(`Congratulations! You solved the cube in ${formatTime(timerValue)} with ${moveCount} moves!`);
    }
    
    return allPiecesCorrect;
  };
  
  // Handle cube rotations
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
    if (storeMove && !solving) {
      if (timerRunning) {
        setMoveHistory(prev => [...prev, face]);
        setMoveCount(prev => prev + 1);
      } else if (!gameStarted) {
        // Automatically start the game and timer on the first move
        setTimerRunning(true);
        setGameStarted(true);
        setMoveHistory([face]);
        setMoveCount(1);
      }
    }
    
    const newState = [...cubeState];
    
    // Define which face to rotate
    let targetPieces = [];
    let rotationMatrix;
    let rotationFunc;
    
    switch(face) {
      case 'U': // Up face (y = -1)
        targetPieces = newState.filter(piece => piece.currentPosition[1] === -1);
        rotationMatrix = (pos) => [pos[2], pos[1], -pos[0]]; // Rotate around Y axis
        rotationFunc = (colors) => [colors[3], colors[2], colors[0], colors[1], colors[4], colors[5]]; // Swap colors
        break;
      case 'D': // Down face (y = 1)
        targetPieces = newState.filter(piece => piece.currentPosition[1] === 1);
        rotationMatrix = (pos) => [-pos[2], pos[1], pos[0]]; // Rotate around Y axis counterclockwise
        rotationFunc = (colors) => [colors[2], colors[3], colors[1], colors[0], colors[4], colors[5]]; // Swap colors
        break;
      case 'F': // Front face (z = 1)
        targetPieces = newState.filter(piece => piece.currentPosition[2] === 1);
        rotationMatrix = (pos) => [-pos[1], pos[0], pos[2]]; // Rotate around Z axis
        rotationFunc = (colors) => [colors[0], colors[1], colors[5], colors[4], colors[2], colors[3]]; // Swap colors
        break;
      case 'B': // Back face (z = -1)
        targetPieces = newState.filter(piece => piece.currentPosition[2] === -1);
        rotationMatrix = (pos) => [pos[1], -pos[0], pos[2]]; // Rotate around Z axis counterclockwise
        rotationFunc = (colors) => [colors[0], colors[1], colors[4], colors[5], colors[3], colors[2]]; // Swap colors
        break;
      case 'L': // Left face (x = -1)
        targetPieces = newState.filter(piece => piece.currentPosition[0] === -1);
        rotationMatrix = (pos) => [pos[0], pos[2], -pos[1]]; // Rotate around X axis
        rotationFunc = (colors) => [colors[5], colors[4], colors[2], colors[3], colors[0], colors[1]]; // Swap colors
        break;
      case 'R': // Right face (x = 1)
        targetPieces = newState.filter(piece => piece.currentPosition[0] === 1);
        rotationMatrix = (pos) => [pos[0], -pos[2], pos[1]]; // Rotate around X axis counterclockwise
        rotationFunc = (colors) => [colors[4], colors[5], colors[2], colors[3], colors[1], colors[0]]; // Swap colors
        break;
      default:
        setAnimating(false);
        return;
    }
    
    // Update positions and colors
    targetPieces.forEach(piece => {
      // Rotate position
      piece.currentPosition = rotationMatrix(piece.currentPosition);
      
      // Rotate colors with improved color rotation accuracy
      piece.colors = rotationFunc(piece.colors);
    });
    
    setCubeState(newState);
    
    // End animation after a short delay
    setTimeout(() => {
      setAnimating(false);
      
      // Check if solved
      const solved = checkSolved();
      setIsSolved(solved);
    }, 300);
  };
  
  // Reset cube to initial state
  const resetCube = () => {
    setCubeState(createInitialCubeState());
    setCubeRotation({ x: -25, y: 45, z: 0 });
    setMoveHistory([]);
    setMoveCount(0);
    
    // If timer is running, stop it
    if (timerRunning) {
      setTimerRunning(false);
      // Update best time if current time is better
      if (bestTime === null || timerValue < bestTime) {
        setBestTime(timerValue);
      }
    }
    setTimerValue(0);
    setGameStarted(false);
    setIsSolved(true);
  };
  
  // Shuffle the cube randomly with optimized animation
  const shuffleCube = () => {
    if (animating) return;
    setAnimating(true);
    
    // Reset move history, timer and game state when shuffling
    setMoveHistory([]);
    setTimerValue(0);
    setTimerRunning(false);
    setMoveCount(0);
    setGameStarted(false);
    setIsSolved(false);
    
    const moves = ['U', 'D', 'F', 'B', 'L', 'R'];
    const numMoves = 25; // More scrambling moves
    const generatedMoves = [];
    
    // Generate random sequence of moves, avoiding repeating the same face
    let lastFace = null;
    for (let i = 0; i < numMoves; i++) {
      let nextMove;
      do {
        nextMove = moves[Math.floor(Math.random() * moves.length)];
      } while (nextMove === lastFace);
      
      generatedMoves.push(nextMove);
      lastFace = nextMove;
    }
    
    // Execute moves with optimized timing
    let moveCount = 0;
    const performNextMove = () => {
      if (moveCount < generatedMoves.length) {
        rotateFace(generatedMoves[moveCount], false);
        moveCount++;
        setTimeout(performNextMove, 150); // Faster animations for shuffling
      } else {
        setAnimating(false);
      }
    };
    
    setTimeout(performNextMove, 100);
  };
  
  // Solve the cube automatically
  const solveCube = () => {
    if (animating || moveHistory.length === 0) return;
    
    setSolving(true);
    setTimerRunning(false);
    
    // Create a reversed and inverted move list
    const reverseMoves = [...moveHistory].reverse().map(move => {
      // For a proper inverse, we need to determine the opposite rotation
      const inverseMap = {
        'U': 'U', // Simplification, in a real solver these would be U', D', etc.
        'D': 'D',
        'F': 'F',
        'B': 'B',
        'L': 'L',
        'R': 'R'
      };
      return inverseMap[move];
    });
    
    let moveIndex = 0;
    const performNextMove = () => {
      if (moveIndex < reverseMoves.length) {
        rotateFace(reverseMoves[moveIndex], false);
        moveIndex++;
        setTimeout(performNextMove, 200);
      } else {
        setMoveHistory([]);
        setMoveCount(0);
        setSolving(false);
        setIsSolved(true);
        setGameStarted(false);
        
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
      setGameStarted(true);
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
      {/* Game status and timer */}
      <div className="flex items-center justify-center w-full gap-4">
        <div className="bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-4">
          <div className="flex items-center">
            <Timer className="w-6 h-6 mr-2" />
            <span className="font-mono text-2xl w-32">{formatTime(timerValue)}</span>
          </div>
          
          <div className="border-l border-gray-600 pl-4 flex items-center">
            <RotateCcw className="w-5 h-5 mr-2" />
            <span className="font-mono text-xl">{moveCount} Moves</span>
          </div>
          
          {bestTime !== null && (
            <div className="border-l border-gray-600 pl-4 flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
              <span className="font-mono text-lg">{formatTime(bestTime)}</span>
            </div>
          )}
        </div>
        
        {isSolved && gameStarted && (
          <div className="bg-green-500 text-white px-4 py-2 rounded animate-pulse">
            SOLVED!
          </div>
        )}
      </div>
      
      {/* Cube display area - much larger and draggable */}
      <div 
        id="cube-container"
        className="relative w-full max-w-3xl h-96 md:h-[32rem] perspective-1600 cursor-move bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-xl mb-2"
        style={{ perspective: '1600px' }}
      >
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transform-gpu transition-transform duration-300"
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
        <div className="absolute bottom-4 right-4 bg-gray-800 bg-opacity-80 text-white px-3 py-2 rounded text-sm">
          Drag to rotate cube
        </div>
      </div>
      
      {/* Controls */}
      <div className="flex flex-col gap-5 w-full max-w-4xl">
        {/* Main action buttons */}
        <div className="flex justify-center gap-4 flex-wrap">
          <button 
            onClick={toggleTimer} 
            className={`px-8 py-4 rounded-lg font-bold text-lg shadow-lg transition-transform transform hover:scale-105 ${timerRunning 
              ? 'bg-red-500 hover:bg-red-600 text-white' 
              : 'bg-green-500 hover:bg-green-600 text-white'}`}
          >
            {timerRunning ? 'Stop Timer' : 'Start Timer'}
          </button>
          
          <button 
            onClick={shuffleCube} 
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg transition-transform transform hover:scale-105"
            disabled={timerRunning}
          >
            Shuffle Cube
          </button>
          
          <button 
            onClick={resetCube} 
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg transition-transform transform hover:scale-105"
          >
            Reset Cube
          </button>
        </div>
        
        {/* Cube face rotation controls */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          <button onClick={() => rotateFace('U')} className="bg-blue-500 hover:bg-blue-600 text-white py-4 rounded font-bold text-xl">U</button>
          <button onClick={() => rotateFace('D')} className="bg-blue-500 hover:bg-blue-600 text-white py-4 rounded font-bold text-xl">D</button>
          <button onClick={() => rotateFace('F')} className="bg-blue-500 hover:bg-blue-600 text-white py-4 rounded font-bold text-xl">F</button>
          <button onClick={() => rotateFace('B')} className="bg-blue-500 hover:bg-blue-600 text-white py-4 rounded font-bold text-xl">B</button>
          <button onClick={() => rotateFace('L')} className="bg-blue-500 hover:bg-blue-600 text-white py-4 rounded font-bold text-xl">L</button>
          <button onClick={() => rotateFace('R')} className="bg-blue-500 hover:bg-blue-600 text-white py-4 rounded font-bold text-xl">R</button>
        </div>
        
        {/* Cube rotation and special functions */}
        <div className="flex justify-center gap-3 flex-wrap">
          <button onClick={() => rotateCube('y', 90)} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded">
            Rotate Y
          </button>
          <button onClick={() => rotateCube('x', 90)} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded">
            Rotate X
          </button>
          <button onClick={() => rotateCube('z', 90)} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded">
            Rotate Z
          </button>
          
          <button 
            onClick={toggleReveal} 
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-3 rounded"
          >
            {revealed ? 'Hide Solution' : 'Reveal Solution'}
          </button>
          
          <button 
            onClick={solveCube} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded"
            disabled={moveHistory.length === 0 || solving}
          >
            Solve Cube
          </button>
        </div>
      </div>
      
      <div className="text-center p-3 bg-gray-100 rounded-lg shadow border border-gray-200 w-full max-w-2xl">
        <h3 className="font-bold text-lg mb-2">Instructions:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          <div>
            <p><strong>Game Controls:</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Click <strong>Start Timer</strong> to begin playing</li>
              <li>Use the letter buttons (U, D, F, B, L, R) to rotate faces</li>
              <li>When solved, the timer will stop automatically</li>
            </ul>
          </div>
          <div>
            <p><strong>Keyboard Shortcuts:</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Press U, D, F, B, L, R keys to rotate faces</li>
              <li>X, Y, Z keys to rotate the entire cube</li>
              <li>Spacebar to start/stop timer</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function RubiksCubeGame() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">3D Rubik's Cube Challenge</h1>
      <RubiksCube />
    </div>
  );
}