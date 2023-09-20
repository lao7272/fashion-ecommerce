import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }

  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @Post(':cartId/product/:productId')
  update(@Param('cartId') cartId: string, @Param('productId') productId: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+cartId, +productId, updateCartDto);
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
