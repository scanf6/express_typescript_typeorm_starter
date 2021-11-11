import express, {Request, Response} from 'express';
import {createConnection} from 'typeorm';
import {TodoController} from './modules/todos/todos.controller';
import config from './ormconfig';

export class Server {
    private todoController:TodoController;

    constructor(
        private app:express.Application = express(),
    ) {
        this.configuration();
    }

    public configuration() {
        this.app.set('port', process.env.PORT || 5000)
        this.app.use(express.json());
    }

    public async initializeDatabase() {
        try {
            await createConnection(config);
        } catch(err) {
            throw err;
        }
    }

    public registeringControllers() {
        this.todoController = new TodoController();
    }

    public initializingRoutes() {
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
server.initializeDatabase().then(() => {
    server.registeringControllers();
    server.initializingRoutes();
    server.start();
})