import styled from './styled';

const spacing = "16px";

const Heading = styled.h1`
  fontSize: 4rem;
  color: white;
  margin: 0;
`;

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  padding: ${spacing};
  right: 0;
  bottom: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  backgroundColor: #432432;
  margin: 0;
`;

function App() {
  return (
    <Wrapper>
      <Heading>
        Hello World !
      </Heading>
    </Wrapper>
  );
}

export default App;
