import {
  createContext,
  memo,
  PropsWithChildren,
  useContext,
  useReducer,
} from "react";

import { ProductDto } from "../api/product.client";

export enum ActionType {
  OPEN_CREATE = "OPEN_CREATE",
  OPEN_EDIT = "OPEN_EDIT",
  OPEN_VIEW = "OPEN_VIEW",
  CLOSE = "CLOSE",
}

export enum ContentType {
  CREATE = "CREATE",
  EDIT = "EDIT",
  VIEW = "VIEW",
}

export type State = {
  isOpen: boolean;
  content?: ContentType;
  product?: ProductDto;
};

export type Action = {
  type: ActionType;
  state: State;
};

export type ProductsModalContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.OPEN_CREATE:
      return { isOpen: true, product: undefined, content: ContentType.CREATE };
    case ActionType.OPEN_EDIT:
      return {
        isOpen: true,
        product: action.state.product,
        content: ContentType.EDIT,
      };
    case ActionType.OPEN_VIEW:
      return {
        isOpen: true,
        product: action.state.product,
        content: ContentType.VIEW,
      };
    case ActionType.CLOSE:
    default:
      return { isOpen: false, product: undefined, content: undefined };
  }
};

export const initialState: State = {
  product: undefined,
  content: undefined,
  isOpen: false,
};

const ProductFactoryContext = createContext<ProductsModalContextType>({
  state: initialState,
  dispatch: () => null,
} satisfies ProductsModalContextType);

export const useProductFactory = () => {
  return useContext(ProductFactoryContext);
};

export function ProductFactoryProvider({ children }: PropsWithChildren<{}>) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ProductFactoryContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductFactoryContext.Provider>
  );
}

export const withProductFactory = (
  Component: any //Improve with generic
) => {
  const ComponentMemo = memo(Component);

  return () => {
    const { dispatch } = useProductFactory();

    return <ComponentMemo dispatch={dispatch} />;
  };
};
