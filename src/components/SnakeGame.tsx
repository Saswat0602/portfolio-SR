import React, { useEffect, useRef, useState } from 'react';

const canvasSize = 600;
const scale = 20;
const rows = canvasSize / scale;
const cols = canvasSize / scale;

const getRandomPosition = () => ({
  x: Math.floor(Math.random() * cols) * scale,
  y: Math.floor(Math.random() * rows) * scale,
});

const speedMap: Record<string, number> = {
  easy: 150,
  medium: 100,
  hard: 60,
};

const SnakeGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState([{ x: scale * 5, y: scale * 5 }]);
  const [direction, setDirection] = useState({ x: scale, y: 0 });
  const [food, setFood] = useState(getRandomPosition());
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState<string | null>(null);

  const resetGame = () => {
    setSnake([{ x: scale * 5, y: scale * 5 }]);
    setDirection({ x: scale, y: 0 });
    setFood(getRandomPosition());
    setGameOver(false);
    setScore(0);
  };

  useEffect(() => {
    if (!level) return;

    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    const interval = setInterval(() => {
      if (gameOver) return;

      const newSnake = [...snake];
      const head = {
        x: newSnake[0].x + direction.x,
        y: newSnake[0].y + direction.y,
      };

      // Wall collision
      if (
        head.x < 0 ||
        head.y < 0 ||
        head.x >= canvasSize ||
        head.y >= canvasSize
      ) {
        setGameOver(true);
        return;
      }

      // Self collision
      for (let segment of newSnake) {
        if (segment.x === head.x && segment.y === head.y) {
          setGameOver(true);
          return;
        }
      }

      newSnake.unshift(head);

      // Eat food
      if (head.x === food.x && head.y === food.y) {
        setFood(getRandomPosition());
        setScore((prev) => prev + 1);
      } else {
        newSnake.pop();
      }

      setSnake(newSnake);

      // Drawing
      ctx.clearRect(0, 0, canvasSize, canvasSize);
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(0, 0, canvasSize, canvasSize);

      // Food
      ctx.fillStyle = '#ff4136';
      ctx.fillRect(food.x, food.y, scale, scale);

      // Snake
      ctx.fillStyle = '#2ecc40';
      for (let segment of newSnake) {
        ctx.fillRect(segment.x, segment.y, scale, scale);
      }

      // Grid lines
      ctx.strokeStyle = '#333';
      for (let i = 0; i < canvasSize; i += scale) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvasSize);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvasSize, i);
        ctx.stroke();
      }
    }, speedMap[level]);

    return () => clearInterval(interval);
  }, [snake, direction, food, gameOver, level]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setDirection({ x: 0, y: -scale });
          break;
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: scale });
          break;
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -scale, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: scale, y: 0 });
          break;
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [direction]);

  const handleLevelSelect = (lvl: string) => {
    setLevel(lvl);
    resetGame();
  };

  return (
    <div className="flex flex-col items-center mt-10 text-white font-mono">
      <h1 className="text-3xl font-bold mb-4 text-tech-blue">Snake Game 🐍</h1>

      {level ? (
        <>
          <p className="text-lg mb-2">Score: {score}</p>
          <canvas
            ref={canvasRef}
            width={canvasSize}
            height={canvasSize}
            className="border-4 border-tech-blue rounded-xl bg-black shadow-lg"
          />
          {gameOver && (
            <div className="mt-4 text-center">
              <p className="text-red-500 font-bold text-xl mb-2">Game Over</p>
              <button
                onClick={resetGame}
                className="bg-tech-blue px-6 py-2 rounded-md hover:bg-tech-purple transition-all"
              >
                Restart
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center space-y-4">
          <p className="text-lg mb-2">Choose Difficulty</p>
          <div className="flex gap-4">
            <button
              className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded"
              onClick={() => handleLevelSelect('easy')}
            >
              Easy
            </button>
            <button
              className="bg-yellow-500 hover:bg-yellow-600 px-6 py-2 rounded"
              onClick={() => handleLevelSelect('medium')}
            >
              Medium
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded"
              onClick={() => handleLevelSelect('hard')}
            >
              Hard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SnakeGame;
