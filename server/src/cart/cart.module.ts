import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { ProductService } from 'src/product/product.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Product } from 'src/product/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, Product])],
  controllers: [CartController],
  providers: [
    CartService, 
    ProductService
  ],
})
export class CartModule {}
