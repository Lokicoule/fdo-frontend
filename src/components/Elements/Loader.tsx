import styled from "@emotion/styled";
import { TextRipple } from "./TextRipple";

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

export const Loader = () => {
  return (
    <Content>
      <TextRipple word="loading" />
    </Content>
  );
};
