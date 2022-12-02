import styled from "@emotion/styled";
import { keyframes } from "@mui/material/styles";

const jump = keyframes({
  "0%, 100%": {
    transform: "translate(0, 0)",
  },
  "30%, 40%, 50%, 60%": {
    transform: "translate(0, -24px)",
  },
  "100%": {
    transform: "translate(0, 0)",
  },
});

/* Types */
type Delay = {
  delay: number;
};

/* Styled components */
const Content = styled.div({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  justifyItems: "center",
  height: "100vh",
  fontSize: "calc(50px + 3vmin)",
  overflow: "hidden",
  backgroundColor: "black",
});

const Jump = styled.div<Delay>(({ delay }) => ({
  animationName: `${jump}`,
  animationDelay: `calc(.3s * ${delay})`,
  animationDuration: "3s",
  animationTimingFunction: "ease-in-out",
  animationIterationCount: "infinite",
  textTransform: "uppercase",
  fontFamily: "monospace",
  color: "#fff",
  letterSpacing: "0.3em",
  margin: 0,
  fontSize: "calc(2rem)",
}));

const letterJumper = (word: string) => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
    }}
  >
    {word.split("").map((letter, i) => {
      return (
        <Jump key={`${word}_${i}`} delay={i}>
          <span>{letter}</span>
        </Jump>
      );
    })}
  </div>
);

export const Loading = () => {
  return <Content>{letterJumper("loading")}</Content>;
};
