import React, { Suspense } from "react";
import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";

const Section = styled.div`
  height: 100vh;
  width: 100vw;
  position: relative;
  scroll-snap-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Container = styled.div`
  position: relative;
  z-index: 1; /* Make sure this is above the stars */
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center align the title */
  justify-content: center;
`;

const CanvasContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 80vw;
  height: 100vh;
  z-index: 0; /* Ensure the stars are behind everything */
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  z-index: 1; /* Cards should appear above stars */
  margin-top: 20px; /* Add some space below the title */
  @media only screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ProjectCard = styled.div`
  background-color: rgba(255, 255, 255, 0.1); /* Semi-transparent background */
  color: white;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  font-size: 16px; /* Decreased font size */
  height: 100px; /* Fixed height for uniformity */
  margin-bottom: 20px;
  position: relative; /* Positioning context for pseudo-element */

  &:hover {
    transform: translateY(-10px);
  }

  &:before {
    content: '';
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    border-radius: 10px;
    border: 2px solid transparent; /* Make sure this is initially transparent */
    background: linear-gradient(45deg, rgba(255, 255, 255, 0.3), rgba(0, 204, 255, 0.8)); /* Gradient color for the border */
    z-index: -1; /* Behind the card */
    animation: glowing 1.5s infinite alternate;
  }

  @keyframes glowing {
    0% {
      opacity: 0.6;
    }
    100% {
      opacity: 1;
    }
  }
`;

const Title = styled.h1`
  font-size: 48px; /* Increased title font size */
  background: linear-gradient(45deg, #a18cd1, #fbc2eb);
  background-clip: text; /* Clipping the background */
  -webkit-background-clip: text; /* For Safari */
  color: transparent; /* Make the text fill color transparent */
  margin-top: -70px; /* Space below title */
  margin-bottom: 25px;
`;

const Hero3 = () => {
  const projects = [
    "Android Static Framework Using Python Full Stack",
    "Multiportal Website with Ai and Voice Over",
    "Job Finder Website using Api's",
    "Shopping Website using React",
    "Chatbot AI using JavaScript",
    "CRUD Operation using Node.js",
    "Chat Application Using Java",
    "Image Encryption & Decryption Java",
    "Snake Game Java",
    "Form Java",
    "Digital Clock Java",
    "ATM Simulation Java",
    "OOP Projects Java",
    "VLSI Projects",
  ];

  return (
    <Section>
      <CanvasContainer>
        <Canvas>
          <Suspense fallback={null}>
            <OrbitControls enableZoom={false} />
            <ambientLight intensity={1} />
            <directionalLight position={[3, 2, 1]} />
            <Stars
              radius={300} /* Increased radius for larger stars */
              depth={90} /* Adjusted depth */
              count={8000} /* Increased star count */
              factor={7} /* Adjusted factor for more stars */
              saturation={0}
              fade
            />
          </Suspense>
        </Canvas>
      </CanvasContainer>

      <Container>
        <Title>Projects</Title>
        <Grid>
          {projects.map((project, index) => (
            <ProjectCard key={index}>
              {project}
            </ProjectCard>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default Hero3;
