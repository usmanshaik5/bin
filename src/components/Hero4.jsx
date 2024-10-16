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
  justify-content: center; /* Centering vertically */
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
  display: flex; /* Change to flex to center a single card */
  justify-content: center; /* Center horizontally */
  z-index: 1; /* Cards should appear above stars */
  margin-top: 20px; /* Add some space below the title */
`;

const ProjectCard = styled.div`
  background-color: rgba(10, 10, 25, 0.7); /* Darker background for a starry effect */
  color: white;
  padding: 20px; /* Increased padding for bigger card */
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align items to the start */
  justify-content: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4); /* Slightly darker shadow */
  transition: transform 0.3s ease;
  font-size: 18px; /* Decreased font size for better fit */
  height: 570px; /* Increased height for the card */
  width: 1300px; /* Increased width for the card */
  margin-bottom: 70px;
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
  font-size: 38px; /* Increased title font size */
  background: linear-gradient(45deg, #a18cd1, #fbc2eb);
  background-clip: text; /* Clipping the background */
  -webkit-background-clip: text; /* For Safari */
  color: transparent; /* Make the text fill color transparent */
  margin-bottom: 15px;
  margin-left: 435px;

`;

const Heading = styled.h2`
  font-size: 24px; /* Heading font size */
  background: linear-gradient(45deg, #ff6a00, #ee0979); /* Stylish gradient for headings */
  background-clip: text; /* Clipping the background */
  -webkit-background-clip: text; /* For Safari */
  color: transparent; /* Make the text fill color transparent */
  margin:6px 0; /* Space between headings */
`;

const Hero4 = () => {
  const projectDetails = (
    <div>
      <Heading>Languages:</Heading>
      <div>HTML, CSS, Bootstrap, TypeScript, JavaScript, React.js, Node.js, Nest.js, Express.js, TypeOrm, SQL, Java, Big Data, IoT, Python, AI</div>
      <Heading>Web Dev Tools:</Heading>
      <div>Visual Studio Code, WebStorm, Git, GitHub, GitLab, Postman, WorkBench</div>
      <Heading>Frameworks:</Heading>
      <div>Bootstrap, TypeScript, Node.js, React.js, Nest.js, Express, Collections</div>
      <Heading>Cloud/Databases:</Heading>
      <div>SQL, HQL</div>
      <Heading>Relevant Coursework:</Heading>
      <div>Object Oriented Programming, Database Management System</div>
      <Heading>Soft Skills:</Heading>
      <div>Communication, Conceptual Understanding, Problem Solving, Self-learning, Presentation, Adaptability</div>
      <Heading>Achievements/Certifications:</Heading>
      <div>Artificial Intelligence, Web Development, Java Programming, Microsoft Azure Essentials, Frontend Web Development Workshop, IoT, VLSI, Matlab Professional, Matlab, Matlab and Octave, Robotics Workshop, Certificate of Achievement District Level Science Exhibition (Received more than 3 times), National Cadet Corps Certification, IBM Skills Artificial Intelligence, Tata Unstop Level 1, Young Turks Round 1 Participation.</div>
    </div>
  );

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
        <Grid>
          <ProjectCard>
            <Title>Technical Skills and Interests</Title> {/* Add your project title here */}
            {projectDetails}
          </ProjectCard>
        </Grid>
      </Container>
    </Section>
  );
};

export default Hero4;
