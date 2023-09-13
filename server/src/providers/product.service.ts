import { HttpStatus, Injectable } from '@nestjs/common';
import {Product} from 'src/interfaces/product.interface';
import { Response } from 'express'

@Injectable()
export class ProductService {
  
  private products:Product[] = []
  
  getAllProducts(): Product[] {
    return this.products;
  }
  getProduct(id: string, res: Response) {
    const product = this.products.find(p => p.id === id);
    if(!product) return res.status(HttpStatus.CONFLICT).json({message: "Product not found"});
    res.status(HttpStatus.OK).json({product});
  }
  createProduct({id, name, stock, price, description, images}:Product, res: Response) {
    if(!id || !name || !stock || !price || !description || !images) return res.status(HttpStatus.AMBIGUOUS).json({message: "Missing data"});
    const date =  Date.now()
    const product: Product = { 
      id, name, stock, price, description, images,
      created: date,
      updated: date
    }
    this.products.push(product);
    return res.status(HttpStatus.OK).json({message: "Product created"});
  }
  updateProduct() {

  }
  deleteProduct(id: string) {

  }
}
