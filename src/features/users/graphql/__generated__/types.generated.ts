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

export type AddressDto = {
  __typename?: 'AddressDto';
  additionalAddress?: Maybe<Scalars['String']>;
  address: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  zipCode: Scalars['String'];
};

export type AddressInput = {
  additionalAddress?: InputMaybe<Scalars['String']>;
  address: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  zipCode: Scalars['String'];
};

export type CompanyDto = {
  __typename?: 'CompanyDto';
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  rcsNumber: Scalars['String'];
  siren: Scalars['String'];
  siret: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  vatNumber: Scalars['String'];
};

export type CompanyInput = {
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  rcsNumber: Scalars['String'];
  siren: Scalars['String'];
  siret: Scalars['String'];
  vatNumber: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<UserDto>;
  updateUser: UserDto;
};


export type MutationCreateUserArgs = {
  createUserInput: UserCreateInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UserUpdateInput;
};

export type Query = {
  __typename?: 'Query';
  _service: _Service;
  getUser?: Maybe<UserDto>;
  getUserById?: Maybe<UserDto>;
  getUsers?: Maybe<Array<UserDto>>;
};


export type QueryGetUserArgs = {
  criterions?: InputMaybe<UserCriteriaInput>;
};


export type QueryGetUserByIdArgs = {
  id: Scalars['String'];
};


export type QueryGetUsersArgs = {
  criterions?: InputMaybe<UserCriteriaInput>;
};

export type UserCreateInput = {
  address?: InputMaybe<AddressInput>;
  company?: InputMaybe<CompanyInput>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phone: Scalars['String'];
};

export type UserCriteriaInput = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};

export type UserDto = {
  __typename?: 'UserDto';
  address?: Maybe<AddressDto>;
  company?: Maybe<CompanyDto>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  phone: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UserUpdateInput = {
  address?: InputMaybe<AddressInput>;
  company?: InputMaybe<CompanyInput>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['String'];
  lastName: Scalars['String'];
  phone: Scalars['String'];
};

export type _Service = {
  __typename?: '_Service';
  sdl?: Maybe<Scalars['String']>;
};
