import { 
  Controller, 
  Get, 
  Put, 
  Delete, 
  Post, 
  Param, 
  Body, 
  Res, 
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { Response } from 'express'
import { ProductService } from '../providers/product.service';
import { Product } from 'src/interfaces/product.interface';

@Controller("/api")
export class ProductController {
  constructor(private readonly ProductService: ProductService) {}

  @Get()
  getAllProducts(): Product[] {
    return this.ProductService.getAllProducts();
  }
  @Get("/:id")
  getProduct(@Param("id") id: string, @Res() res: Response) {
    this.ProductService.getProduct(id, res);
  }
  @Post()
  createProduct(@Body() product, @Res() res: Response) {
    this.ProductService.createProduct(product, res);
  }
  @Put()
  updateProduct(@Param("id") id: string, @Body() product) {
    this.ProductService.updateProduct();
  }
  @Delete("/:id")
  deleteProduct(@Param() id) {
    this.ProductService.deleteProduct(id)
  }

}
