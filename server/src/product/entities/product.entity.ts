import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50 })
    name: string;

    @Column({ type: 'int' })
    stock: number;

    @Column({ type: 'int' })
    price: number;

    @Column({ type: 'int', default: 1 })
    quant: number;

    @Column({ type: 'varchar' })
    description: string;

    @Column({ type: 'json' })
    images: Array<string>

    @Column({ type: 'bigint' })
    createdOn: number;

    @Column({ type: 'bigint' })
    updatedOn: number;
}
