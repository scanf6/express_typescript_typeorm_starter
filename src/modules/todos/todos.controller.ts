import {Router, Request, Response} from 'express';
import {TodoService} from './todos.service';

export class TodoController {
    constructor(
        public readonly router:Router = Router(),
        private service:TodoService = new TodoService()
    ) {
        this.routes();
    }

    public index = (req:Request, res:Response) => {
        res.send(this.service.index());
    }

    public show = (req:Request, res:Response) => {
        res.send(this.service.show());
    }

    public create = (req:Request, res:Response) => {
        res.send(this.service.create());
    }

    public update = (req:Request, res:Response) => {
        res.send(this.service.update());
    }

    public delete = (req:Request, res:Response) => {
        res.send(this.service.delete());
    }

    public routes() {
        this.router.get('/', this.index);
        this.router.get('/:id', this.show);
        this.router.post('/', this.create);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.delete);
    }


}