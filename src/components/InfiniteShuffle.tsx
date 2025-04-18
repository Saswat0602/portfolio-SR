import { Canvas, useFrame } from '@react-three/fiber'
import { Stats, OrbitControls, Environment } from '@react-three/drei'
import { Suspense, useMemo, useRef, useState, useEffect } from 'react'
import JEASINGS, { JEasing } from 'jeasings'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'

function ShuffleCube() {
    const ref = useRef()
    const rotationGroup = useRef()
    const [isAnimating, setIsAnimating] = useState(false)
    const [shouldAnimate, setShouldAnimate] = useState(true)
    // Add cooldown timer to prevent rapid consecutive moves
    const lastMoveTime = useRef(0)
    const MOVE_COOLDOWN = 1500 // 1.5 seconds between moves

    const roundedBoxGeometry = useMemo(() => {
        return new RoundedBoxGeometry(1, 1, 1, 3, 0.1)
    }, [])

    useFrame(() => {
        JEASINGS.update()

        // Only start a new move if:
        // 1. No animations are running
        // 2. Not currently in an animation state
        // 3. Enough time has passed since the last move
        // 4. Animation is enabled
        const currentTime = Date.now()
        if (!JEASINGS.getLength() && 
            !isAnimating && 
            currentTime - lastMoveTime.current > MOVE_COOLDOWN &&
            shouldAnimate) {
            performRandomMove()
        }
    })

    const performRandomMove = () => {
        if (isAnimating) return

        setIsAnimating(true)
        lastMoveTime.current = Date.now()

        // Pick a random axis (x, y, z)
        const axes = ['x', 'y', 'z']
        const randomAxis = axes[Math.floor(Math.random() * axes.length)]

        // Pick a random layer (top/bottom, left/right, front/back)
        const randomLimit = Math.random() > 0.5 ? 0.5 : -0.5

        // Pick a random direction (CW or CCW)
        const randomDirection = Math.random() > 0.5 ? 1 : -1

        // Execute the move
        rotate(ref.current, rotationGroup.current, randomAxis, randomLimit, randomDirection)

        // Allow next move after this one completes
        setTimeout(() => {
            setIsAnimating(false)
        }, 600) // Longer than animation time to ensure completion
    }

    return (
        <>
            <group ref={ref}>
                {[...Array(3).keys()].map((x) =>
                    [...Array(3).keys()].map((y) =>
                        [...Array(3).keys()].map((z) =>
                            <Cubelet
                                key={x + y * 3 + z * 9}
                                position={[x - 1, y - 1, z - 1]}
                                geometry={roundedBoxGeometry}
                            />
                        )
                    )
                )}
            </group>
            <group ref={rotationGroup} />
            
            {/* Optional UI controls for animation speed */}
            <mesh position={[0, -3, 0]} onClick={() => setShouldAnimate(!shouldAnimate)}>
                <boxGeometry args={[0.5, 0.5, 0.5]} />
                <meshStandardMaterial color={shouldAnimate ? "green" : "red"} />
            </mesh>
        </>
    )
}

const colorSides = [
    [0, 1, 'darkorange'],
    [0, -1, 'red'],
    [1, 1, 'white'],
    [1, -1, 'yellow'],
    [2, 1, 'green'],
    [2, -1, 'blue']
]

function Cubelet({ position, geometry }) {
    // Memoize to prevent unnecessary rerenders
    return useMemo(() => (
        <mesh position={position} geometry={geometry}>
            {[...Array(6).keys()].map((i) => (
                <meshStandardMaterial
                    key={i}
                    attach={`material-${i}`}
                    color={position[colorSides[i][0]] === colorSides[i][1] ? colorSides[i][2] : 'black'}
                />
            ))}
        </mesh>
    ), [position, geometry])
}

function resetCubeGroup(cubeGroup, rotationGroup) {
    rotationGroup.children
        .slice()
        .reverse()
        .forEach(function (c) {
            cubeGroup.attach(c)
        })
    rotationGroup.quaternion.set(0, 0, 0, 1)
}

function attachToRotationGroup(cubeGroup, rotationGroup, axis, limit) {
    cubeGroup.children
        .slice()
        .reverse()
        .filter(function (c) {
            return limit < 0 ? c.position[axis] < limit : c.position[axis] > limit
        })
        .forEach(function (c) {
            rotationGroup.attach(c)
        })
}

function animateRotationGroup(rotationGroup, axis, multiplier) {
    new JEasing(rotationGroup.rotation)
        .to(
            {
                [axis]: rotationGroup.rotation[axis] + (Math.PI / 2) * multiplier
            },
            500 // Increased from 250 to 500 for slower rotation
        )
        .easing(JEASINGS.Cubic.InOut)
        .start()
}

function rotate(cubeGroup, rotationGroup, axis, limit, multiplier) {
    resetCubeGroup(cubeGroup, rotationGroup)
    attachToRotationGroup(cubeGroup, rotationGroup, axis, limit)
    animateRotationGroup(rotationGroup, axis, multiplier)
}

export default function RubiksCubeShuffle() {
    return (
        <div className="h-screen">
            <Canvas camera={{ position: [3, 3, 3] }}>
                <Suspense fallback={null}>
                    <color attach="background" args={["#f3f4f6"]} />
                    <ambientLight intensity={0.7} />
                    <directionalLight position={[10, 10, 10]} intensity={1} />
                </Suspense>
                <ShuffleCube />
                <OrbitControls target={[0, 0, 0]} />
                <Stats />
            </Canvas>
        </div>
    )
}