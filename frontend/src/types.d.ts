export interface User {
  _id: string;
  username: string;
  displayName: string;
  phoneNumber: string;
  token: string;
}

export type Seller = Omit<User, 'username' | 'token'>;

export interface Category {
  _id: string;
  name: string;
}

export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  seller: Seller;
}

export type ProductBrief = Omit<Product, 'description' | 'category' | 'seller'>;

export type ProductMutation = Omit<Product, '_id' | 'imageUrl' | 'seller'> & {
  image: File;
};

export interface Session {
  message: string;
  user: User;
}

export interface SignInMutation {
  username: string;
  password: string;
}

export interface SignUpMutation {
  username: string;
  password: string;
}

export interface GenericError {
  message: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
}

export interface AuthenticationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
}
