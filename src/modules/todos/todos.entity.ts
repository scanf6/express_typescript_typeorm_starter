import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('dolby')
export class TodoEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    content!: string;
}