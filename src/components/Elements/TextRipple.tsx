import styled from "@emotion/styled";
import { keyframes } from "@mui/material/styles";

type Delay = {
  delay: number;
};

type TextRippleProps = {
  word: string;
};

const RippleFrames = keyframes({
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

const RippleComponent = styled.div<Delay>(({ delay }) => ({
  animationName: `${RippleFrames}`,
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

export const TextRipple: React.FunctionComponent<TextRippleProps> = (props) => {
  const { word } = props;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      {word.split("").map((letter, i) => (
        <RippleComponent key={`${word}_${i}`} delay={i}>
          <span>{letter}</span>
        </RippleComponent>
      ))}
    </div>
  );
};
