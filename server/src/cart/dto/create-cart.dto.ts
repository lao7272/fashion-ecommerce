import {
    IsArray
} from 'class-validator';
import { Product } from 'src/product/entities/product.entity';
export class CreateCartDto {
    @IsArray()
    productArray: Product[];
}
