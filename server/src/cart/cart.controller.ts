import { Controller, Get, Post, Body, Req, Param, Delete } from '@nestjs/common';
import { Request } from 'express'
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@Req() req: Request,@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(req, createCartDto);
  }


  @Get(':userId')
  findOne(@Param('userId') userId: string) {
    return this.cartService.findOne(+userId);
  }

  @Post(':cartId/product/:productId')
  update(@Param('cartId') cartId: string, @Param('productId') productId: string) {
    return this.cartService.update(+cartId, +productId);
  }
  @Delete(':cartId/product/:productId')
  removeProduct(@Param('cartId') cartId: string, @Param('productId') productId: string) {
    return this.cartService.removeProduct(+cartId, +productId );
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
