import styled from "@emotion/styled";
import { Backdrop, Box, CircularProgress } from "@mui/material";
import { keyframes } from "@mui/material/styles";

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

const RippleComponent = styled.div<{
  delay: number;
}>(({ delay }) => ({
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

const Layout = styled.div({
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

const LoaderMessage: React.FunctionComponent<{
  message: string;
}> = (props) => {
  const { message } = props;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      {message.split("").map((letter, i) => (
        <RippleComponent key={`${message}_${i}`} delay={i}>
          <span>{letter}</span>
        </RippleComponent>
      ))}
    </div>
  );
};

/* export const Loader = () => {
  return (
    <Layout>
      <LoaderMessage message="loading" />
    </Layout>
  );
}; */

export const Loader = () => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
