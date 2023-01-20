import { Chip, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { dateFormat } from "~/utils/dateFormat";
import { useGetCustomer } from "../api/getCustomer";
import { DeleteCustomer } from "./DeleteCustomer";
import { UpdateCustomer } from "./UpdateCustomer";

type CustomerContentProps = {
  customerId: string;
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
        {getCustomerQuery.data?.phone}
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
    </>
  );
};
