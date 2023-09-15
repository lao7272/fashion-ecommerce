import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Product } from './product/entities/product.entity';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { Cart } from './cart/entities/cart.entity';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: process.env.PG_PASSWORD,
      username: 'postgres',
      entities: [Product, Cart],
      database: 'e-commerce',
      synchronize: true,
      logging: true,
    }),
    ProductModule,
    CartModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
