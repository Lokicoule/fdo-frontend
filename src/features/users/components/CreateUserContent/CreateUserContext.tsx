import React from "react";
import { AddressFormProps } from "./forms/AddressForm";
import { CompanyFormProps } from "./forms/CompanyForm";
import { UserFormProps } from "./forms/UserForm";

interface CreateUserContextValue {
  user?: UserFormProps | null;
  company?: CompanyFormProps | null;
  address?: AddressFormProps | null;
  onUserSubmit: (user: UserFormProps) => void;
  onCompanySubmit: (company: CompanyFormProps) => void;
  onAddressSubmit: (address: AddressFormProps) => void;
  onReset: () => void;
}

const CreateUserContext = React.createContext<CreateUserContextValue>({
  user: null,
  company: null,
  address: null,
  onUserSubmit: () => {},
  onCompanySubmit: () => {},
  onAddressSubmit: () => {},
  onReset: () => {},
});

export const CreateUserProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [user, setUser] = React.useState<UserFormProps | null>(null);
  const [company, setCompany] = React.useState<CompanyFormProps | null>(null);
  const [address, setAddress] = React.useState<AddressFormProps | null>(null);

  const handleUserSubmit = (user: UserFormProps) => {
    setUser(user);
  };

  const handleCompanySubmit = (company: CompanyFormProps) => {
    setCompany(company);
  };

  const handleAddressSubmit = (address: AddressFormProps) => {
    setAddress(address);
  };

  const handleReset = () => {
    setUser(null);
    setCompany(null);
    setAddress(null);
  };

  const value = {
    user,
    company,
    address,
    onUserSubmit: handleUserSubmit,
    onCompanySubmit: handleCompanySubmit,
    onAddressSubmit: handleAddressSubmit,
    onReset: handleReset,
  };

  return (
    <CreateUserContext.Provider value={value}>
      {children}
    </CreateUserContext.Provider>
  );
};

export const useCreateUser = () => {
  return React.useContext(CreateUserContext);
};
