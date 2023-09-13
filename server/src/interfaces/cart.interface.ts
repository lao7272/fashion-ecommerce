import { Product } from "./product.interface";
export default interface Cart {
    products: Product[];
    id: string;
    created: number;
    updated: number;
}