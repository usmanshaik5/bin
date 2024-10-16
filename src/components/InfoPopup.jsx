// InfoPopup.js
import React, { useState } from "react";
import styled from "styled-components";

const InfoButton = styled.button`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: radial-gradient(circle at 50% 50%, #ffcc70, #ff8b6b, #d65db1, #845ec2);
  color: white;
  border: none;
  padding: 15px; /* Increase size for a round button */
  border-radius: 60%; /* Make it round */
  cursor: pointer;
  animation: blinker 1.5s infinite;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.6), 0 0 20px rgba(255, 255, 255, 0.4);

  @keyframes blinker {
    50% {
      opacity: 0.5;
    }
  }

  &:hover {
    background: radial-gradient(circle at 50% 50%, #ff8b6b, #d65db1, #845ec2, #ffcc70);
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.8), 0 0 25px rgba(255, 255, 255, 0.6);
  }

  &:focus {
    outline: none;
  }
`;

const Popup = styled.div`
  position: fixed;
  bottom: 70px; /* Position it just above the button */
  left: 50%;
  transform: translateX(-50%) scale(${({ isVisible }) => (isVisible ? 1 : 0.5)});
  background-color: white;
  color: black;
  padding: 20px;
  border-radius: 10px;
  z-index: 1000; /* Ensure it appears above other content */
  transition: opacity 0.3s ease, transform 0.3s ease;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */

  @keyframes popupAnim {
    0% {
      transform: translateX(-50%) scale(0.5);
      opacity: 0;
    }
    100% {
      transform: translateX(-50%) scale(1);
      opacity: 1;
    }
  }

  ${({ isVisible }) =>
    isVisible &&
    `
    animation: popupAnim 0.3s ease-out;
  `}
`;

const InfoPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  const togglePopup = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <>
      <InfoButton onClick={togglePopup}>Info</InfoButton>
      <Popup isVisible={isVisible}>
        <p>Contact: +91-7075505956</p>
        <p>Email: usmanshaiik59@gmail.com</p>
        <p>Location: Tirupathi,Andhra Pradesh,India</p>
        <p>
          <a
            href="https://github.com/UsmanShaiik"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "black", textDecoration: "underline" }}
          >
            GitHub
          </a>
          |
          <a
            href="https://www.linkedin.com/in/usman-shaiik"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "black", textDecoration: "underline" }}
          >
            LinkedIn
          </a>
        </p>
      </Popup>
    </>
  );
};

export default InfoPopup;
