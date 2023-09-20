import {
    IsArray,
    IsString
} from 'class-validator';
import { Product } from 'src/product/entities/product.entity';
export class CreateCartDto {
    @IsString() 
    userId: string;

    @IsArray()
    productArray: Product[];

}
