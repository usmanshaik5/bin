import styled from "styled-components";
import Contact from "./components/Contact";
import Hero from "./components/Hero";
import Hero2 from "./components/Hero2";
import Hero3 from "./components/Hero3";
import Hero4 from "./components/Hero4";
import Who from "./components/Who";
import Works from "./components/Works";

const Container = styled.div`
  height: 100vh;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  overflow-y: auto;
  scrollbar-width: none;
  color: white;
  background: url("./img/bg.jpeg");
  &::-webkit-scrollbar{
    display: none;
  }
`;

function App() {
  return (
    <Container>
      <Hero />
      <Works />
      <Hero2 />
      <Who />
      <Hero3 />
      <Hero4 />
      <Contact />
   
    </Container>
  );
}

export default App;
