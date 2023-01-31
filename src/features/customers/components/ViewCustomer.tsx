import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Chip,
  Stack,
  Grid,
  Button,
  Divider,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { dateFormat } from "~/utils/dateFormat";
import { useGetCustomer } from "../api/getCustomer";
import { Address } from "../types";
import { DeleteCustomer } from "./DeleteCustomer";
import { UpdateCustomer } from "./UpdateCustomer";

type CustomerContentProps = {
  customerId: string;
};

const AddressCard: React.FC<{
  address: Address;
}> = ({ address }) => {
  const { t } = useTranslation(["common", "customers"]);
  return (
    <Card variant="outlined" sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom fontWeight={"bold"} variant="inherit">
          {address.name}
        </Typography>
        <Typography color="text.secondary" variant="inherit">
          {address.addressLine1}
        </Typography>
        <Typography color="text.secondary" variant="inherit">
          {address.addressLine2}
        </Typography>
        <Typography variant="inherit" color="text.secondary">
          {address.city + ", " + address.zipCode}
        </Typography>
        <Typography color="text.secondary" variant="inherit">
          {address.country}
        </Typography>
        <Typography color="text.secondary" gutterBottom variant="inherit">
          {t("dictionary.phoneNumber") + ": " + address.phoneNumber}
        </Typography>
      </CardContent>
      <CardActions>
        <Stack direction="row" spacing={1}>
          <Button
            variant="text"
            size="small"
            sx={{
              textTransform: "none",
            }}
          >
            {t("dictionary.edit")}
          </Button>
          <Divider orientation="vertical" flexItem />
          <Button
            variant="text"
            size="small"
            sx={{
              textTransform: "none",
            }}
          >
            {t("dictionary.delete")}
          </Button>
          <Divider orientation="vertical" flexItem />
          <Button
            variant="text"
            size="small"
            sx={{
              textTransform: "none",
            }}
          >
            {t("dictionary.setDefault")}
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
};

//TODO: replace label with name translation
export const ViewCustomer: React.FunctionComponent<CustomerContentProps> = ({
  customerId,
}) => {
  const navigate = useNavigate();
  const getCustomerQuery = useGetCustomer({
    id: customerId,
  });
  const { t } = useTranslation(["common", "customers"]);

  const handleDelete = () => {
    navigate("/app/customers");
  };

  return (
    <>
      <Stack
        spacing={2}
        direction="row"
        sx={{
          pb: 2,
        }}
      >
        <UpdateCustomer customerId={customerId} />
        {getCustomerQuery.data ? (
          <DeleteCustomer
            customer={getCustomerQuery.data}
            onDelete={handleDelete}
          />
        ) : null}
      </Stack>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" fontWeight={600}>
        {t("dictionary.code")}
      </Typography>

      <Typography
        variant="body2"
        component={"div"}
        color="text.secondary"
        gutterBottom
      >
        <Chip label={getCustomerQuery.data?.code} />
      </Typography>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" fontWeight={600}>
        {t("dictionary.label")}
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {getCustomerQuery.data?.code}
      </Typography>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" fontWeight={600}>
        {t("dictionary.email")}
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {getCustomerQuery.data?.email}
      </Typography>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" fontWeight={600}>
        {t("dictionary.phone")}
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {getCustomerQuery.data?.phoneNumber}
      </Typography>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" fontWeight={600}>
        {t("dictionary.createdAt")}
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {dateFormat(getCustomerQuery.data?.createdAt)}
      </Typography>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" fontWeight={600}>
        {t("dictionary.updatedAt")}
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {dateFormat(getCustomerQuery.data?.updatedAt)}
      </Typography>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" fontWeight={600}>
        {t("dictionary.address")}
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        <Grid container spacing={2}>
          {getCustomerQuery.data?.addresses?.map((address) => (
            <Grid item xs={3} key={address.id}>
              <AddressCard address={address} />
            </Grid>
          ))}
        </Grid>
      </Typography>
    </>
  );
};
