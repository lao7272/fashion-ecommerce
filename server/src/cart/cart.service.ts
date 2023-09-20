import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>
  ) {}
  create(createCartDto: CreateCartDto):Promise<Cart> {
    const cart: Cart = new Cart();
    const date: number  = Date.now();
    cart.userId = createCartDto.userId;
    cart.productArray = createCartDto.productArray;
    cart.createdOn = date;
    cart.updatedOn = date;
    return this.cartRepository.save(cart);
  }

  findAll():Promise<Cart[]> {
    return this.cartRepository.find();
  }

  findOne(id: number):Promise<Cart> {
    return this.cartRepository.findOneBy({id});
  }

  async update(cartId: number, productId: number, updateCartDto: UpdateCartDto): Promise<Cart> {
    const newCart: Cart = new Cart();
    const product: Product = await this.productRepository.findOneBy({id: productId});
    const cart: Cart = await this.cartRepository.findOneBy({id: cartId});
    const getProductId = cart.productArray.findIndex(p => p.id === productId);
    const productArray = cart.productArray;
    newCart.id = cartId;
    newCart.userId = updateCartDto.userId;
    newCart.updatedOn = Date.now();
    if(getProductId === -1) {
      newCart.productArray = [...productArray, product];
    } else {
      const findProduct = productArray[getProductId];
      findProduct.quant++;
      productArray[getProductId] = findProduct;
      newCart.productArray = productArray;
    }
    return this.cartRepository.save(newCart);
  }
  async removeProduct(cartId: number, productId: number): Promise<Cart> {
    const newCart: Cart = new Cart();
    const cart: Cart = await this.cartRepository.findOneBy({id: cartId});
    const productArray = [...cart.productArray];
    const newProductArray = productArray.filter(p => p.id !== productId);

    newCart.id = cartId;
    newCart.userId = cart.userId;
    newCart.updatedOn = Date.now();
    newCart.productArray = newProductArray;
    return this.cartRepository.save(newCart);
  }
  remove(id: number): Promise<{ affected?: number }> {
    return this.cartRepository.delete({id});
  }
}
