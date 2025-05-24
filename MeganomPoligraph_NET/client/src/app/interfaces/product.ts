export interface Product {
  productId: number;
  imageUrl: string;
  isLocked: boolean;
  productCategories: string[];
  productDescriptions: {
    [key: string]: string;
  };
}
