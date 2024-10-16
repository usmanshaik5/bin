// Other imports remain the same
import React, { Suspense, useEffect, useRef } from "react";
import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const Section = styled.div`
  height: 100vh;
  scroll-snap-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px;
  position: relative;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  text-align: center;
  position: relative;
  z-index: 1;
`;

const Title = styled.h1`
  font-size: 48px;
  margin-bottom: 20px;
`;

const WhatWeDo = styled.div`
  margin-bottom: 20px;
`;

const Subtitle = styled.h2`
  color: #da4ea2;
  font-size: 28px;
  margin-bottom: 10px;
`;

const Desc = styled.p`
  font-size: 18px;
  color: lightgray;
  margin-bottom: 20px;
`;

const Right = styled.div`
  flex: 1;
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CanvasContainer = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
`;

const Hero2 = () => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const animationFrame = useRef(null);
  const numParticles = 100; // Number of particles
  const groundHeight = useRef(null); // Ground height offset
  const sectionRef = useRef(null); // Reference to the section

  // Function to create particles
  const createParticles = () => {
    particles.current = []; // Reset particles
    groundHeight.current = canvasRef.current.height - 30; // Update ground height

    for (let i = 0; i < numParticles; i++) {
      particles.current.push({
        x: Math.random() * canvasRef.current.width,
        y: Math.random() * canvasRef.current.height * -2, // Start above the canvas
        radius: Math.random() * 5 + 2,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        speedY: 0,
        isBouncing: false,
        bounceCount: 0, // Count of bounces
        direction: null, // To be determined after the first bounce
        exiting: false, // Flag for exiting upwards
        visible: true, // New property for visibility
      });
    }
  };

  // Function to start drawing particles
  const startAnimation = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create particles for the animation
    createParticles();

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current.forEach((particle) => {
        // Only draw visible particles
        if (particle.visible) {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.fill();
          ctx.closePath();
        }

        // Falling logic
        if (!particle.isBouncing) {
          particle.speedY += 0.02; // Slow down the gravity effect
          particle.y += particle.speedY; // Fall

          // Check if particle hits the ground
          if (particle.y + particle.radius >= groundHeight.current) {
            particle.y = groundHeight.current - particle.radius; // Reset to ground
            particle.isBouncing = true; // Start bouncing
            particle.speedY = -Math.abs(particle.speedY) * 0.3; // Decrease bounce speed for slower bounce
            particle.direction = Math.random() < 0.5 ? "left" : "right"; // Randomly assign direction
          }
        } else {
          // Particle is bouncing
          particle.speedY += 0.02; // Slow down the gravity effect
          particle.y += particle.speedY; // Fall

          // Check if particle has hit the ground after bouncing
          if (particle.y + particle.radius >= groundHeight.current) {
            if (particle.bounceCount < 3) { // Allow more bounces
              particle.y = groundHeight.current - particle.radius; // Reset to ground
              particle.speedY = -Math.abs(particle.speedY) * 0.3; // Decrease bounce speed for slower bounce
              particle.bounceCount++; // Increment bounce count
            } else {
              // After 3 bounces, allow upward exit
              particle.y = groundHeight.current - particle.radius; // Reset to ground
              particle.isBouncing = false; // Stop bouncing
              particle.exiting = true; // Set exiting flag
              particle.speedY = -0.2; // Reduce upward speed
            }
          }

          // Move left or right while bouncing
          if (particle.bounceCount >= 4 && !particle.exiting) {
            if (particle.direction === "left") {
              particle.x -= 0.5; // Slow down horizontal movement
            } else {
              particle.x += 0.3; // Slow down horizontal movement
            }
          }

          // Check if particle has exited the screen
          if (particle.y < -particle.radius) {
            particle.visible = false; // Set to invisible
          }
        }

        // Allow upward movement after exiting
        if (particle.exiting) {
          particle.y += particle.speedY; // Move upwards
        }
      });

      animationFrame.current = requestAnimationFrame(drawParticles); // Animate
    };

    drawParticles(); // Start animation

    // Adjust canvas on resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      groundHeight.current = canvas.height - 30; // Update ground height on resize
      createParticles(); // Reset particles
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrame.current); // Clean up on component unmount
      window.removeEventListener("resize", handleResize);
    };
  };

  // Intersection Observer to start animation on section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAnimation(); // Start animation when the section is visible
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <Section ref={sectionRef}>
      <CanvasContainer ref={canvasRef} /> {/* Canvas for particle animation */}
      <Container>
        <Left>
          <Title>Experience</Title>
          <WhatWeDo>
            <Subtitle>Full Stack Developer Intern, Notify Suite Technology Pvt Ltd</Subtitle>
          </WhatWeDo>
          <Desc>
            Full Stack Development Intern (Sep 2024 - Mar 2025) Remote. Joined the development team to work on web-based platforms, responsible for building and maintaining both front-end and back-end aspects of projects.
          </Desc>
          <WhatWeDo>
            <Subtitle>Graphic Designer Intern, GAO Tek</Subtitle>
          </WhatWeDo>
          <Desc>
            Design and User Experience Focus (Sep 2024 - Dec 2024) Remote. Currently engaged in creating and refining visual assets, collaborating with the design team on engaging designs.
          </Desc>
          <WhatWeDo>
            <Subtitle>Big Data Analyst Course, iNeuron</Subtitle>
          </WhatWeDo>
          <Desc>
            Data Analysis and Management (June 2024 - Present) Remote. Pursuing a Big Data course focusing on data analytics, using Hadoop, Hive, Spark, and Kafka.
          </Desc>
          <WhatWeDo>
            <Subtitle>Web Development Internship, Study Comrade</Subtitle>
          </WhatWeDo>
          <Desc>
            Front-end Development with Node.js Emphasis (Jan 2024 - July 2024) Involved in creating interactive web applications, collaborating on project functionalities and improvements.
          </Desc>
        </Left>
      </Container>
    </Section>
  );
};

export default Hero2;
