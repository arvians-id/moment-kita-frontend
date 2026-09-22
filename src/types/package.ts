export interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: "IDR";
  features: string[];
  featured?: boolean;
}
