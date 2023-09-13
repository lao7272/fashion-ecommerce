import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductServices } from '../providers/product.service';

describe('AppController', () => {
  let appController: ProductController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductServices],
    }).compile();

    appController = app.get<ProductController>(ProductController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getProduct()).toBe('');
    });
  });
});
