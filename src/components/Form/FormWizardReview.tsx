import { Grid, Typography } from "@mui/material";

type FormWizardReviewProps = {
  title: string;
  values: { label: string; value: string }[];
};

export const FormWizardReview: React.FunctionComponent<
  FormWizardReviewProps
> = (props) => {
  const { title, values } = props;

  return (
    <>
      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
        {title}
      </Typography>
      <Grid container>
        {values.map(({ label, value }) => (
          <Grid item alignSelf="flex-start" key={label} xs={12}>
            <Typography gutterBottom>
              {label}: {value}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
