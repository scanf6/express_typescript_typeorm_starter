import {getConnection} from 'typeorm';
import { TodoEntity } from './todos.entity';
import {TodoRepository} from './todos.repository';

export class TodoService {
    constructor(
        private readonly todoRepository:TodoRepository = getConnection('todo_connection').getCustomRepository(TodoRepository)
    ) {}

    public index = async ():Promise<TodoEntity[]> => {
        const todos = await this.todoRepository.find();
        return todos;
    }

    public show = async (id:number):Promise<TodoEntity> => {
        const todo = await this.todoRepository.findOne(id);
        return todo;
    }

    public create = async (payload):Promise<TodoEntity> => {
        const newTodo = await this.todoRepository.save(payload);
        return newTodo;
    }

    public update = async (id, payload):Promise<TodoEntity> => {
        await this.todoRepository.update(id, payload);
        return await this.todoRepository.findOne(id);
    }

    public delete = async (id) => {
        const deletedTodo = await this.todoRepository.delete(id);
        return deletedTodo.affected;
    }
}