import {getConnection} from 'typeorm';
import {TodoRepository} from './todos.repository';

export class TodoService {
    constructor(
        private readonly todoRepository:TodoRepository = getConnection('todo_connection').getCustomRepository(TodoRepository)
    ) {}

    public index = () => {
        return 'List All Todos Service';
    }

    public show = () => {
        return 'Show one Todo Service';
    }

    public create = () => {
        return 'Create a Todo Service';
    }

    public update = () => {
        return 'Update a Todo Service';
    }

    public delete = () => {
        return 'Delete a Todo Service';
    }
}