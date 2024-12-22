export interface Money {
  amount: string;
  currencyCode: string;
}

export interface Image {
  url: string;
  altText: string | null;
}

export interface ProductVariant {
  id: string;
  price: Money;
  compareAtPrice: Money | null;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  handle: string;
  images: {
    edges: Array<{
      node: Image;
    }>;
  };
  variants: {
    edges: Array<{
      node: ProductVariant;
    }>;
  };
}

export interface ProductsResponse {
  products: {
    edges: Array<{
      node: Product;
    }>;
  };
}

export interface ProductResponse {
  product: Product;
}
