import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>
  ) {}
  create(createProductDto: CreateProductDto):Promise<Product> {
    const product: Product = new Product();
    const date = Date.now();
    product.description = createProductDto.description;
    product.name = createProductDto.name;
    product.images = createProductDto.images;
    product.price = createProductDto.price;
    product.stock =  createProductDto.stock;
    product.createdOn = date;
    product.updatedOn = date;
    return this.productRepository.save(product)
  }

  findAll():Promise<Product[]> {
    return this.productRepository.find();
  }

  findOne(id: number):Promise<Product> {
    return this.productRepository.findOneBy({id});
  }

  update(id: number, updateProductDto: UpdateProductDto):Promise<Product> {
    const product:Product = new Product();
    product.id = id;
    product.images  = updateProductDto.images;
    product.name = updateProductDto.name;
    product.description = updateProductDto.description;
    product.price = updateProductDto.price;
    product.stock = updateProductDto.stock;
    product.updatedOn = Date.now();
    return this.productRepository.save(product)
  }

  remove(id: number):Promise<{ affected?: number }> {
    return this.productRepository.delete({id})
  }
}
