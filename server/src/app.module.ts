import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Product } from './product/entities/product.entity';
import { ProductModule } from './product/product.module';
import { Cart } from './cart/entities/cart.entity';
import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { User } from './user/entities/user.entity';
import constants from './config/config';
import { UserModule } from './user/user.module';
const { PG_PASSWORD } = constants;
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: PG_PASSWORD,
      username: 'postgres',
      entities: [Product, Cart, User],
      database: 'e-commerce',
      synchronize: true,
      logging: true,
    }),
    ProductModule,
    CartModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
