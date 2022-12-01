import styled from "@emotion/styled";
import { keyframes } from "@mui/material/styles";

const primaryColor = "#fff";
const secondaryColor = "#EEEEEE";
const tertiaryColor = "#546E7A";
const quaternaryColor = "#212121";
const quinaryColor = "#263238";

/* Keyframes */
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

const shadows = keyframes({
  "0%, 100%": {
    textShadow: "none",
  },
  "10%, 90%": {
    textShadow: `3px 3px 0 ${secondaryColor}`,
  },
  "20%, 80%": {
    textShadow: `3px 3px 0 ${secondaryColor}, 6px 6px 0 ${tertiaryColor}`,
  },
  "30%, 70%": {
    textShadow: `3px 3px 0 ${secondaryColor}, 6px 6px 0 ${tertiaryColor}, 9px 9px 0 ${quaternaryColor}`,
  },
  "40%, 50%, 60%": {
    textShadow: `3px 3px 0 ${secondaryColor}, 6px 6px 0 ${tertiaryColor}, 9px 9px 0 ${quaternaryColor}, 12px 12px 0 ${quinaryColor}`,
  },
});

const move = keyframes({
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
type FlipProps = {
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

const Flip = styled.div<FlipProps>(({ delay }) => ({
  animationName: `${flip}`,
  animationDelay: `calc(.3s * ${delay})`,
  animationDuration: "3s",
  animationTimingFunction: "ease-in-out",
  animationIterationCount: "infinite",
  textTransform: "uppercase",
  color: "#fff",
  letterSpacing: "0.3em",
  margin: 0,
  fontSize: "calc(2rem + 5vw)",
}));

const Jump = styled.div<FlipProps>(({ delay }) => ({
  animationName: `${move}`,
  animationDelay: `calc(.3s * ${delay})`,
  animationDuration: "3s",
  animationTimingFunction: "ease-in-out",
  animationIterationCount: "infinite",
  textTransform: "uppercase",
  color: "#fff",
  letterSpacing: "0.3em",
  margin: 0,
  fontSize: "calc(2rem)",
}));

const TextShadows = styled.div({
  textTransform: "uppercase",
  fontSize: "calc(2rem + 5vw)",
  fontWeight: "bold",
  textShadow: `3px 3px 0 ${secondaryColor}, 6px 6px 0 ${tertiaryColor}, 9px 9px 0 ${quaternaryColor}, 12px 12px 0 ${quinaryColor}`,
  color: primaryColor,
  animation: `${shadows} 1.6s ease-in-out infinite, ${move} 1.6s ease-in-out infinite`,
  letterSpacing: "0.3em",
  margin: 0,
});

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

const jumpWordAndUppercase = (word: string) => (
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
  return (
    <Content>
      {jumpWordAndUppercase("loading")}
      {/* <TextShadows>loading</TextShadows>
      <div>
        {flipWordAndUppercase("loading")} */}

      {/* <Box
          sx={{
            backgroundColor: "#c0392b",
            width: "calc(10px + 3vmin)",
            height: "calc(10px + 3vmin)",
            animation: `${spin} 1s infinite ease`,
          }}
        /> */}
      {/* </div> */}
    </Content>
  );
};
