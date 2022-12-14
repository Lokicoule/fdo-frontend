import { useMemo, useState } from "react";

export const useTableSearch = (): [
  string,
  {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: () => void;
  }
] => {
  const [term, setTerm] = useState("");
  const [termSubmitted, setTermSubmitted] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(event.target.value);
  };

  const handleSubmit = () => {
    setTermSubmitted(term);
  };

  const handlers = useMemo(
    () => ({
      onChange: handleChange,
      onSubmit: handleSubmit,
    }),
    []
  );

  return [termSubmitted, handlers];
};
