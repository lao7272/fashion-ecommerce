export interface Product {
    id: string;
    name: string;
    stock: number;
    price: number;
    description: string;
    images: [string];
    created: number;
    updated: number;
}