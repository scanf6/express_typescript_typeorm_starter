import {EntityRepository, Repository} from 'typeorm';
import {TodoEntity} from './todos.entity';

@EntityRepository(TodoEntity)
export class TodoRepository extends Repository<TodoEntity> {

}