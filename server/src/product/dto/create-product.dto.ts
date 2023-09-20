import {
    IsInt,
    IsNotEmpty,
    IsString,
    IsArray
} from 'class-validator';
export class CreateProductDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsInt()
    @IsNotEmpty()
    stock: number;

    @IsNotEmpty()
    @IsInt()
    price: number;

    @IsNotEmpty()
    description: string;

    @IsArray({message: "Element must be an array"})
    images: string[];

}
