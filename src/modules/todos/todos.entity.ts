import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('todos')
export class TodoEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    content!: string;
}