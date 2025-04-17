import { useEffect, useRef, useState } from 'react';

const DinoGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isJumping, setIsJumping] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const gravity = 0.6;
  let jumpHeight = -12;

  let dino = { x: 50, y: 150, width: 40, height: 40, velocityY: 0 };
  let obstacles: any[] = [];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    let animationFrame: number;
    let frame = 0;

    const resetGame = () => {
      dino.y = 150;
      dino.velocityY = 0;
      setScore(0);
      setGameOver(false);
      obstacles = [];
      frame = 0;
    };

    const drawDino = () => {
      ctx!.fillStyle = '#00f';
      ctx!.fillRect(dino.x, dino.y, dino.width, dino.height);
    };

    const drawObstacles = () => {
      for (let obs of obstacles) {
        ctx!.fillStyle = '#f00';
        ctx!.fillRect(obs.x, obs.y, obs.width, obs.height);
      }
    };

    const handleJump = () => {
      if (!isJumping && dino.y === 150) {
        dino.velocityY = jumpHeight;
        setIsJumping(true);
      }
    };

    const detectCollision = (obs: any) => {
      return (
        dino.x < obs.x + obs.width &&
        dino.x + dino.width > obs.x &&
        dino.y < obs.y + obs.height &&
        dino.y + dino.height > obs.y
      );
    };

    const update = () => {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      // Dino physics
      dino.velocityY += gravity;
      dino.y += dino.velocityY;
      if (dino.y > 150) {
        dino.y = 150;
        dino.velocityY = 0;
        setIsJumping(false);
      }

      // Obstacle movement
      for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].x -= 6;

        if (detectCollision(obstacles[i])) {
          setGameOver(true);
          cancelAnimationFrame(animationFrame);
          return;
        }
      }

      // Remove off-screen obstacles
      obstacles = obstacles.filter((obs) => obs.x + obs.width > 0);

      // Generate new obstacles
      if (frame % 90 === 0) {
        obstacles.push({ x: canvas!.width, y: 160, width: 20, height: 30 });
      }

      drawDino();
      drawObstacles();

      // Score update
      setScore((prev) => prev + 1);
      frame++;
      animationFrame = requestAnimationFrame(update);
    };

    if (gameStarted && !gameOver) {
      resetGame();
      animationFrame = requestAnimationFrame(update);
    }

    return () => cancelAnimationFrame(animationFrame);
  }, [gameStarted]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === 'Space') {
      setIsJumping(true);
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.code === 'Space') {
      setIsJumping(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas
        ref={canvasRef}
        width={800}
        height={200}
        className="border-2 border-white rounded bg-black"
      />
      <div className="text-white">
        {gameOver ? (
          <div>
            <p className="text-xl">Game Over</p>
            <p className="text-md">Score: {score}</p>
            <button
              onClick={() => setGameStarted(true)}
              className="mt-2 px-4 py-1 bg-tech-blue rounded"
            >
              Restart
            </button>
          </div>
        ) : !gameStarted ? (
          <button
            onClick={() => setGameStarted(true)}
            className="px-4 py-2 bg-tech-purple rounded"
          >
            Start Game
          </button>
        ) : (
          <p>Score: {score}</p>
        )}
      </div>
    </div>
  );
};

export default DinoGame;
