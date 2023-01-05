import { AlertColor, keyframes, styled } from "@mui/material";

type ProgressBarProps = {
  duration: number;
  color: AlertColor;
};

const ProgressbarFrames = keyframes({
  "0%": {
    width: "0%",
  },
  "25%": {
    width: "25%",
  },
  "50%": {
    width: "55%",
  },
  "75%": {
    width: "70%",
  },
  "90%": {
    width: "80%",
  },
  "100%": {
    width: "100%",
  },
});

const Progressbar = styled("div")(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  height: 4,
  backgroundColor: theme.palette.primary.contrastText,
}));

const ProgressbarInner = styled("div")<ProgressBarProps>(
  ({ duration, color, theme }) => ({
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: theme.palette[color].light,
    animation: `${ProgressbarFrames} ${duration}ms linear`,
  })
);

export const ProgressBar: React.FunctionComponent<ProgressBarProps> = (
  props
) => {
  const { color, duration } = props;

  return (
    <Progressbar>
      <ProgressbarInner duration={duration} color={color} />
    </Progressbar>
  );
};
