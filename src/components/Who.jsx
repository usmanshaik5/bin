import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import StarFieldCanvas from "./StarFieldCanvas"; // Ensure correct path

// Fade-in animation for elements
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Blasting effect for initial load and button
const blastEffect = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

// Main Section
const Section = styled.div`
  height: 100vh;
  scroll-snap-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0 20px;
  position: relative;
  overflow: hidden; /* Hide overflowing elements */
`;

// Background Layer for Stars
const BackgroundLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1; /* Behind the content */
  background: linear-gradient(to bottom, #050505, #111); /* Subtle gradient */
`;

// Container for content
const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 2; /* In front of the background */
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  animation: ${({ visible }) => (visible ? fadeIn : "none")} 1s ease-out,
             ${blastEffect} 1.5s ease forwards;
  padding: 20px;
  backdrop-filter: rgba(0, 0, 0, 0.5); /* Adds a subtle background to text for better readability */
  border-radius: 10px;
  color: white; /* Ensure the text is visible over the dark background */
`;

// Title component
const Title = styled.h1`
  font-size: 44px;
  margin-bottom: 25px;
  opacity: 0;
  transform: translateY(20px);
  animation: ${({ visible }) => (visible ? fadeIn : "none")} 1.5s ease forwards;
  color: #abc9ed;

  @media only screen and (max-width: 768px) {
    font-size: 48px;
  }
`;

// WhatWeDo component
const WhatWeDo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  opacity: 0;
  transform: translateY(20px);
  animation: ${({ visible }) => (visible ? fadeIn : "none")} 1.8s ease forwards;
`;

// Subtitle component
const Subtitle = styled.h2`
  color: #da4ea2;
  font-size: 26px;
`;

// Description component
const Desc = styled.div`
  font-size: 24px;
  color: lightgray;
  text-align: left;
  width: 100%;
  opacity: 0;
  transform: translateY(20px);
  animation: ${({ visible }) => (visible ? fadeIn : "none")} 2s ease forwards;
`;

// Description item component
const DescItem = styled.div`
  margin-bottom: 25px;
  display: flex;
  justify-content: space-between;
  font-size: 24px;
  width: 100%;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

// Button component
const Button = styled.button`
  background-color: #da4ea2;
  color: white;
  font-weight: 500;
  width: 160px;
  padding: 12px;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  opacity: 0;
  transform: translateY(20px);
  animation: ${({ visible }) => (visible ? fadeIn : "none")} 2.5s ease forwards;
  transition: background-color 0.3s ease,
              transform 0.3s ease;

  &:hover {
    background-color: #f06292;
    animation: ${blastEffect} 0.5s ease; /* Add blast effect on hover */
  }
`;

const Who = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true); // Set the visibility state to trigger animations
    }, 200);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Section>
      {/* Star Field Background */}
      <BackgroundLayer>
        <StarFieldCanvas /> {/* Render the StarFieldCanvas */}
      </BackgroundLayer>

      {/* Main Content */}
      <Container visible={isVisible}>
        <Title visible={isVisible}>Education</Title>
        <WhatWeDo visible={isVisible}>
          <Subtitle>Academic Background</Subtitle>
        </WhatWeDo>
        <Desc visible={isVisible}>
          <DescItem>
            <div>
              GOVERNMENT HIGH SCHOOL, Pakala, Tirupati District, Andhra Pradesh
            </div>
         
            <div>2015-2019</div>
          </DescItem>
          <DescItem>
            <div>CGPA in 10th Class: 10.0</div>
          </DescItem>
          <DescItem>
            <div>Intermediate at IIIT RGUKT RK Valley, Kadapa</div>
            <div>2019-2021</div>
          </DescItem>
          <DescItem>
            <div>CGPA: 8.4</div>
          </DescItem>
          <DescItem>
            <div>
              Bachelor of Technology in Electrical and Electronics Engineering
            </div>
            <div>2021-2025</div>
          </DescItem>
          <DescItem>
            <div>CGPA: 7.5</div>
          </DescItem>
          <DescItem>
            <div>
              – IoT systems and industrial applications with design thinking
            </div>
            <div>(Feb 2024 - May 2024)</div>
          </DescItem>
          <DescItem>
            <div>
              – Workshop on Automated Fire Extinguishing Robot Design
            </div>
            <div>(May 2024 - June 2024)</div>
          </DescItem>
          <DescItem>
            <div>
              – Workshop on Automated Rescue Drone 
            </div>
            <div>(May 2024 - June 2024)</div>
          </DescItem>
        </Desc>
        <Button visible={isVisible}>See our works</Button>
      </Container>
    </Section>
  );
};

export default Who;
