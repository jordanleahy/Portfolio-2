"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Node {
    x: number;
    y: number;
    vx: number;
    vy: number;
}

export function NeuralMesh() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const nodes: Node[] = [];
        const nodeCount = 60; // Adjust for density
        const connectionDistance = 150;
        const interactionDistance = 200;

        // Initialize nodes
        for (let i = 0; i < nodeCount; i++) {
            nodes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5, // Slow velocity
                vy: (Math.random() - 0.5) * 0.5
            });
        }

        let mouse = { x: 0, y: 0 };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("resize", handleResize);

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Update and draw nodes
            nodes.forEach((node, i) => {
                node.x += node.vx;
                node.y += node.vy;

                // Bounce off edges
                if (node.x < 0 || node.x > width) node.vx *= -1;
                if (node.y < 0 || node.y > height) node.vy *= -1;

                // Mouse interaction: push nodes away slightly if too close
                const dx = node.x - mouse.x;
                const dy = node.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < interactionDistance) {
                    const angle = Math.atan2(dy, dx);
                    const force = (interactionDistance - dist) / interactionDistance;
                    node.vx += Math.cos(angle) * force * 0.05;
                    node.vy += Math.sin(angle) * force * 0.05;
                }

                // Draw node
                ctx.beginPath();
                ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(139, 92, 246, 0.5)"; // Purple primary
                ctx.fill();

                // Draw connections
                for (let j = i + 1; j < nodes.length; j++) {
                    const nodeB = nodes[j];
                    const dx = node.x - nodeB.x;
                    const dy = node.y - nodeB.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDistance) {
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(nodeB.x, nodeB.y);
                        // Opacity based on distance
                        const alpha = 1 - dist / connectionDistance;
                        ctx.strokeStyle = `rgba(34, 197, 94, ${alpha * 0.2})`; // Green secondary, subtle
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            });

            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <motion.canvas
            ref={canvasRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 z-0 pointer-events-none" // Contained in parent
        />
    );
}
