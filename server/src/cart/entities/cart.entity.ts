import { Product } from 'src/product/entities/product.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    userId: string;

    @Column({ type: 'json' })
    productArray: Product[];

    @Column({ type: 'bigint' })
    createdOn: number;

    @Column({ type: 'bigint' })
    updatedOn: number;
}
