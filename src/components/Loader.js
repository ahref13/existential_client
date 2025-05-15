'use client';

import { useEffect, useState } from 'react';

export default function Loader() {
    const [rotation, setRotation] = useState(0);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    // Calculate position along a circle
    const calculateCirclePosition = (angleDegrees, radius) => {
        const angleRadians = (angleDegrees * Math.PI) / 180;
        return {
            x: Math.cos(angleRadians) * radius,
            y: Math.sin(angleRadians) * radius
        };
    };

    useEffect(() => {
        // Changed radius to 100px for a 200px diameter circle
        const radius = 200;
        const startTime = Date.now();
        const animationDuration = 4000; // 4 seconds per rotation

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = (elapsed % animationDuration) / animationDuration;
            const angle = progress * 360;

            // Calculate new position
            const circlePos = calculateCirclePosition(angle, radius);
            setPosition(circlePos);

            // Set rotation - cockroach should face the direction it's moving
            // Add 90 degrees so the cockroach "faces" the direction of movement
            setRotation(angle + 90);

            requestAnimationFrame(animate);
        };

        const animationFrame = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationFrame);
        };
    }, []);

    return (
        <div
            className="relative flex items-center justify-center"
            style={{
                // Increased container size to accommodate the larger circle
                width: 600,
                height: 600
            }}
        >
            {/*/!* Optional: Visual indicator of the circle path *!/*/}
            {/*<div*/}
            {/*    className="absolute rounded-full border border-dashed border-zinc-800 opacity-20"*/}
            {/*    style={{*/}
            {/*        width: 200, // Diameter of the circle*/}
            {/*        height: 200*/}
            {/*    }}*/}
            {/*/>*/}
            <div>
                <img
                    src="/plate.png" // Make sure to add this image to your public folder
                    alt="Loading..."
                    className="w-full h-auto"
                />
            </div>
            {/* Cockroach image */}
            <div
                className="absolute"
                style={{
                    transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg)`,
                    transformOrigin: 'center',
                    width: 70, // Cockroach width in pixels
                    height: 'auto',
                    zIndex: 10
                }}
            >
                <img
                    src="/coachroach-horizontal.png" // Make sure to add this image to your public folder
                    alt="Loading..."
                    className="w-full h-auto"
                />
            </div>

            {/* Shadow below the cockroach */}
            <div
                className="absolute rounded-full bg-black opacity-20"
                style={{
                    width: 15,
                    height: 8,
                    transform: `translate(${position.x}px, ${position.y + 5}px)`,
                    filter: 'blur(3px)',
                    zIndex: 5
                }}
            />
        </div>
    );
}