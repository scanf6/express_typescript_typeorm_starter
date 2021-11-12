import {Router, Request, Response, NextFunction} from 'express';
import {TodoService} from './todos.service';

export class TodoController {
    constructor(
        public readonly router:Router = Router(),
        private service:TodoService = new TodoService()
    ) {
        this.routes();
    }

    public index = async (req:Request, res:Response) => {
        const todos = await this.service.index();
        res.json(todos);
    }

    public show = async (req:Request, res:Response) => {
        const {id} = req.params;
        const todo = await this.service.show(Number(id))
        res.json(todo);
    }

    public create = async (req:Request, res:Response, next: NextFunction) => {
        const payload = req.body;

        try {
            const data = await this.service.create(payload);
            return res.json(data);
        } catch(err) {
            return next(new Error('Error when creating the Todo'));
        }
    }

    public update = async (req:Request, res:Response) => {
        const payload = req.body;
        const {id} = req.params;
        const updated = await this.service.update(id, payload);
        res.json(updated);
    }

    public delete = async (req:Request, res:Response) => {
        const {id} = req.params;
        const deleted = await this.service.delete(id);
        res.json(deleted);
    }

    public routes() {
        this.router.get('/', this.index);
        this.router.get('/:id', this.show);
        this.router.post('/', this.create);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.delete);
    }
}