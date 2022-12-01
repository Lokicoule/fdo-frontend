import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import { keyframes } from "@mui/material/styles";

const Content = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  justifyItems: "center",
  height: "100vh",
  fontSize: "calc(50px + 3vmin)",
  overflow: "hidden",
  backgroundColor: "#fad390",
});

const spin = keyframes({
  "0%": {
    transform: "rotate(0deg)",
  },
  "100%": {
    transform: "rotate(360deg)",
  },
});

const flip = keyframes({
  "0%,80%": {
    transform: "rotateY(360deg)",
  },
});

type FlipProps = {
  delay: number;
};

const Flip = styled.div<FlipProps>(({ delay }) => ({
  animationName: `${flip}`,
  animationDelay: `calc(.3s * ${delay})`,
  animationDuration: "3s",
  animationTimingFunction: "ease-in-out",
  animationIterationCount: "infinite",
  textTransform: "uppercase",
}));

const flipWordAndUppercase = (word: string) => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
    }}
  >
    {word.split("").map((letter, i) => {
      return (
        <Flip key={`${word}_${i}`} delay={i}>
          <span>{letter}</span>
        </Flip>
      );
    })}
  </div>
);

export const LoadingPage = () => {
  return (
    <Content>
      {flipWordAndUppercase("loading")}
      <Box
        sx={{
          backgroundColor: "#c0392b",
          width: "calc(10px + 3vmin)",
          height: "calc(10px + 3vmin)",
          animation: `${spin} 1s infinite ease`,
        }}
      />
    </Content>
  );
};
