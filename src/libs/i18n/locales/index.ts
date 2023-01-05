import commonLocaleEN from "./en/common.json";
import commonLocaleFR from "./fr/common.json";
import productLocaleEN from "./en/product.json";
import productLocaleFR from "./fr/product.json";
import validationsLocaleEN from "./en/validations.json";
import validationsLocaleFR from "./fr/validations.json";

export const resources = {
  en: {
    common: commonLocaleEN,
    product: productLocaleEN, //to move to product feature
    validations: validationsLocaleEN,
  },
  fr: {
    common: commonLocaleFR,
    product: productLocaleFR, //to move to product feature
    validations: validationsLocaleFR,
  },
};
