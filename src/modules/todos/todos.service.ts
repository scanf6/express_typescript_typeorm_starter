import { Get, Route } from "tsoa";
import {getConnection} from 'typeorm';
import { TodoEntity } from './todos.entity';
import {TodoRepository} from './todos.repository';

@Route('/api/todos')
export class TodoService {
    constructor(
        private readonly todoRepository:TodoRepository = getConnection('todo_connection').getCustomRepository(TodoRepository)
    ) {}

    @Get('/')
    public async index():Promise<TodoEntity[]> {
        const todos = await this.todoRepository.find();
        return todos;
    }

    public async show(id:number):Promise<TodoEntity> {
        const todo = await this.todoRepository.findOne(id);
        return todo;
    }

    public async create(payload):Promise<TodoEntity> {
        const newTodo = await this.todoRepository.save(payload);
        return newTodo;
    }

    public async update(id, payload):Promise<TodoEntity> {
        await this.todoRepository.update(id, payload);
        return await this.todoRepository.findOne(id);
    }

    public async delete(id) {
        const deletedTodo = await this.todoRepository.delete(id);
        return deletedTodo.affected;
    }
}