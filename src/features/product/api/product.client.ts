import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { fetchData } from '../../../libs/graphql-fetcher';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  _Any: any;
  _FieldSet: any;
  link__Import: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  createProduct?: Maybe<ProductDto>;
  removeProduct: ProductDto;
  removeProducts: Scalars['Boolean'];
  updateProduct: ProductDto;
  updateSetting: SettingDto;
};


export type MutationCreateProductArgs = {
  payload: ProductCreateInput;
};


export type MutationRemoveProductArgs = {
  id: Scalars['String'];
};


export type MutationRemoveProductsArgs = {
  ids: Array<Scalars['String']>;
};


export type MutationUpdateProductArgs = {
  payload: ProductUpdateInput;
};


export type MutationUpdateSettingArgs = {
  updateSettingInput: SettingUpdateInput;
};

export type ProductCreateInput = {
  code?: InputMaybe<Scalars['String']>;
  label: Scalars['String'];
};

export type ProductCriteriaInput = {
  code?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  label?: InputMaybe<Scalars['String']>;
};

export type ProductDto = {
  __typename?: 'ProductDto';
  authorId: Scalars['String'];
  code: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  label: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: UserDto;
};

export type ProductUpdateInput = {
  code?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  label: Scalars['String'];
};

export type PropertyDto = {
  __typename?: 'PropertyDto';
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  key: PropertyKeyEnum;
  updatedAt?: Maybe<Scalars['DateTime']>;
  value: Scalars['String'];
};

export type PropertyInput = {
  id?: InputMaybe<Scalars['ID']>;
  key: PropertyKeyEnum;
  value: Scalars['String'];
};

export enum PropertyKeyEnum {
  Counter = 'COUNTER',
  Prefix = 'PREFIX',
  Suffix = 'SUFFIX'
}

export type Query = {
  __typename?: 'Query';
  _entities: Array<Maybe<_Entity>>;
  _service: _Service;
  getProduct?: Maybe<ProductDto>;
  getProducts?: Maybe<Array<ProductDto>>;
  getSetting?: Maybe<SettingDto>;
  getSettings?: Maybe<Array<SettingDto>>;
};


export type Query_EntitiesArgs = {
  representations: Array<Scalars['_Any']>;
};


export type QueryGetProductArgs = {
  id: Scalars['String'];
};


export type QueryGetProductsArgs = {
  criterions?: InputMaybe<ProductCriteriaInput>;
};


export type QueryGetSettingArgs = {
  id: Scalars['String'];
};


export type QueryGetSettingsArgs = {
  criterias?: InputMaybe<SettingCriteriaInput>;
};

export enum SettingCodeEnum {
  CodeGenerator = 'CODE_GENERATOR'
}

export type SettingCriteriaInput = {
  code?: InputMaybe<SettingCodeEnum>;
  id?: InputMaybe<Scalars['String']>;
};

export type SettingDto = {
  __typename?: 'SettingDto';
  authorId: Scalars['String'];
  code: SettingCodeEnum;
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  properties?: Maybe<Array<PropertyDto>>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: UserDto;
};

export type SettingUpdateInput = {
  code: SettingCodeEnum;
  id: Scalars['String'];
  properties: Array<PropertyInput>;
};

export type UserDto = {
  __typename?: 'UserDto';
  id: Scalars['ID'];
  products: Array<ProductDto>;
  settings: Array<SettingDto>;
};

export type _Entity = ProductDto | SettingDto | UserDto;

export type _Service = {
  __typename?: '_Service';
  sdl?: Maybe<Scalars['String']>;
};

export type CreateProductMutationVariables = Exact<{
  payload: ProductCreateInput;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct?: { __typename?: 'ProductDto', code: string, label: string, id: string } | null };

export type GetProductQueryVariables = Exact<{
  getProductId: Scalars['String'];
}>;


export type GetProductQuery = { __typename?: 'Query', getProduct?: { __typename?: 'ProductDto', code: string, id: string, createdAt?: any | null, label: string, updatedAt?: any | null } | null };

export type GetProductsQueryVariables = Exact<{
  criterions?: InputMaybe<ProductCriteriaInput>;
}>;


export type GetProductsQuery = { __typename?: 'Query', getProducts?: Array<{ __typename?: 'ProductDto', label: string, id: string, code: string, createdAt?: any | null, updatedAt?: any | null }> | null };

export type RemoveProductMutationVariables = Exact<{
  removeProductId: Scalars['String'];
}>;


export type RemoveProductMutation = { __typename?: 'Mutation', removeProduct: { __typename?: 'ProductDto', id: string } };

export type RemoveProductsMutationVariables = Exact<{
  ids: Array<Scalars['String']> | Scalars['String'];
}>;


export type RemoveProductsMutation = { __typename?: 'Mutation', removeProducts: boolean };

export type UpdateProductMutationVariables = Exact<{
  payload: ProductUpdateInput;
}>;


export type UpdateProductMutation = { __typename?: 'Mutation', updateProduct: { __typename?: 'ProductDto', code: string, id: string, label: string } };


export const CreateProductDocument = `
    mutation CreateProduct($payload: ProductCreateInput!) {
  createProduct(payload: $payload) {
    code
    label
    id
  }
}
    `;
export const useCreateProductMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateProductMutation, TError, CreateProductMutationVariables, TContext>) =>
    useMutation<CreateProductMutation, TError, CreateProductMutationVariables, TContext>(
      ['CreateProduct'],
      (variables?: CreateProductMutationVariables) => fetchData<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument, variables)(),
      options
    );
export const GetProductDocument = `
    query GetProduct($getProductId: String!) {
  getProduct(id: $getProductId) {
    code
    id
    createdAt
    label
    updatedAt
  }
}
    `;
export const useGetProductQuery = <
      TData = GetProductQuery,
      TError = unknown
    >(
      variables: GetProductQueryVariables,
      options?: UseQueryOptions<GetProductQuery, TError, TData>
    ) =>
    useQuery<GetProductQuery, TError, TData>(
      ['GetProduct', variables],
      fetchData<GetProductQuery, GetProductQueryVariables>(GetProductDocument, variables),
      options
    );
export const GetProductsDocument = `
    query GetProducts($criterions: ProductCriteriaInput) {
  getProducts(criterions: $criterions) {
    label
    id
    code
    createdAt
    updatedAt
  }
}
    `;
export const useGetProductsQuery = <
      TData = GetProductsQuery,
      TError = unknown
    >(
      variables?: GetProductsQueryVariables,
      options?: UseQueryOptions<GetProductsQuery, TError, TData>
    ) =>
    useQuery<GetProductsQuery, TError, TData>(
      variables === undefined ? ['GetProducts'] : ['GetProducts', variables],
      fetchData<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, variables),
      options
    );
export const RemoveProductDocument = `
    mutation RemoveProduct($removeProductId: String!) {
  removeProduct(id: $removeProductId) {
    id
  }
}
    `;
export const useRemoveProductMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<RemoveProductMutation, TError, RemoveProductMutationVariables, TContext>) =>
    useMutation<RemoveProductMutation, TError, RemoveProductMutationVariables, TContext>(
      ['RemoveProduct'],
      (variables?: RemoveProductMutationVariables) => fetchData<RemoveProductMutation, RemoveProductMutationVariables>(RemoveProductDocument, variables)(),
      options
    );
export const RemoveProductsDocument = `
    mutation RemoveProducts($ids: [String!]!) {
  removeProducts(ids: $ids)
}
    `;
export const useRemoveProductsMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<RemoveProductsMutation, TError, RemoveProductsMutationVariables, TContext>) =>
    useMutation<RemoveProductsMutation, TError, RemoveProductsMutationVariables, TContext>(
      ['RemoveProducts'],
      (variables?: RemoveProductsMutationVariables) => fetchData<RemoveProductsMutation, RemoveProductsMutationVariables>(RemoveProductsDocument, variables)(),
      options
    );
export const UpdateProductDocument = `
    mutation UpdateProduct($payload: ProductUpdateInput!) {
  updateProduct(payload: $payload) {
    code
    id
    label
  }
}
    `;
export const useUpdateProductMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateProductMutation, TError, UpdateProductMutationVariables, TContext>) =>
    useMutation<UpdateProductMutation, TError, UpdateProductMutationVariables, TContext>(
      ['UpdateProduct'],
      (variables?: UpdateProductMutationVariables) => fetchData<UpdateProductMutation, UpdateProductMutationVariables>(UpdateProductDocument, variables)(),
      options
    );