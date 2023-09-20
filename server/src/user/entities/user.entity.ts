import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 50})
    name: string;

    @Column({type: 'varchar', length: 50})
    lastname: string;

    @Column({type: 'varchar', length: 50})
    email: string;

    @Column({type: 'varchar', length: 255})
    password: string;

    @Column({type: 'bigint'})
    createdOn: number;

    @Column({type: 'bigint'})
    updatedOn: number;

}
