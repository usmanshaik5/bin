import React, { useRef, useEffect } from "react";
import styled from "styled-components";

// Styled-component for the canvas
const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1; /* Ensure it's behind other elements */
  pointer-events: none; /* Allow clicks to pass through */
`;

// Utility function to generate random numbers within a range
const random = (min, max) => Math.random() * (max - min) + min;

// Star class to represent each star
class Star {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.reset();
  }

  reset() {
    this.x = Math.random() * this.width;
    this.y = Math.random() * this.height;
    this.radius = random(0.5, 2); // Radius between 0.5 and 2px
    this.alpha = random(0.5, 1); // Opacity between 0.5 and 1
    this.deltaAlpha = random(0.005, 0.015); // Twinkle speed
    this.color = `rgba(${Math.floor(random(200, 255))}, ${Math.floor(random(200, 255))}, ${Math.floor(random(200, 255))}, ${this.alpha})`; // Random color
  }

  update() {
    // Twinkling effect
    this.alpha += this.deltaAlpha;
    if (this.alpha <= 0.3 || this.alpha >= 1) {
      this.deltaAlpha = -this.deltaAlpha;
    }
    this.color = `rgba(${Math.floor(random(200, 255))}, ${Math.floor(random(200, 255))}, ${Math.floor(random(200, 255))}, ${this.alpha})`; // Update color for flickering effect
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

// StarFieldCanvas component
const StarFieldCanvas = () => {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const shootingStarsRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Function to resize the canvas
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
      initializeStars();
      initializeShootingStars();
    };

    // Initialize stars
    const initializeStars = () => {
      const numberOfStars = 200; // Increased number of stars for more density
      starsRef.current = [];
      for (let i = 0; i < numberOfStars; i++) {
        starsRef.current.push(new Star(canvas.width, canvas.height));
      }
    };

    // Initialize shooting stars
    const initializeShootingStars = () => {
      shootingStarsRef.current = [];
      const numberOfShootingStars = 5; // Number of shooting stars
      for (let i = 0; i < numberOfShootingStars; i++) {
        shootingStarsRef.current.push(createShootingStar(canvas.width, canvas.height));
      }
    };

    // Create a shooting star
    const createShootingStar = (width, height) => {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        length: random(30, 60), // Length of the shooting star
        speed: random(3, 5), // Speed of the shooting star
        alpha: 1, // Opacity of the shooting star
      };
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars
      starsRef.current.forEach((star) => {
        star.update();
        star.draw(ctx);
      });

      // Draw shooting stars
      shootingStarsRef.current.forEach((shootingStar, index) => {
        ctx.strokeStyle = `rgba(255, 255, 255, ${shootingStar.alpha})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(shootingStar.x, shootingStar.y);
        ctx.lineTo(shootingStar.x + shootingStar.length, shootingStar.y + shootingStar.length / 2);
        ctx.stroke();

        // Update position of the shooting star
        shootingStar.x += shootingStar.speed;
        shootingStar.y += shootingStar.speed / 2;

        // Reset shooting star when it moves out of view
        if (shootingStar.x > canvas.width || shootingStar.y > canvas.height) {
          shootingStarsRef.current[index] = createShootingStar(canvas.width, canvas.height);
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Initial setup
    resizeCanvas();
    animate();

    // Add event listener for window resize
    window.addEventListener("resize", resizeCanvas);

    // Cleanup event listener and animation frame on unmount
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return <Canvas ref={canvasRef} />;
};

export default StarFieldCanvas;
