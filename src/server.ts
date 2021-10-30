import express, {Request, Response} from 'express';
import {TodoController} from './modules/todos/todos.controller';

export class Server {
    constructor(
        private app:express.Application = express(),
        private todoController:TodoController = new TodoController()
    ) {
        this.configuration();
        this.routes();
    }

    public configuration() {
        this.app.set('port', process.env.PORT || 5000)
    }

    public routes() {
        this.app.use('/api/todos/', this.todoController.router)
        this.app.get('/', (req:Request, res:Response) => {
            res.send('Node Express Typescript TypeORM Starter');
        })
    }

    public start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Staring Server on port ${this.app.get('port')}...`)
        })
    }
}

export const server = new Server();
server.start();