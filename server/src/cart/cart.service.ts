import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>
  ) {}
  create(createCartDto: CreateCartDto):Promise<Cart> {
    const cart = new Cart();
    const date = Date.now();
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

  update(id: number, updateCartDto: UpdateCartDto): Promise<Cart> {
    const cart = new Cart();
    cart.id = id;
    cart.userId = updateCartDto.userId;
    cart.updatedOn = Date.now();
    cart.productArray = updateCartDto.productArray;
    return this.cartRepository.save(cart);
  }

  remove(id: number): Promise<{ affected?: number }> {
    return this.cartRepository.delete({id});
  }
}
