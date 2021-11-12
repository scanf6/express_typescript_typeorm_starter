import express, {Request, Response, NextFunction} from 'express';
import {createConnection} from 'typeorm';
import morgan from 'morgan';
import swaggerUi from "swagger-ui-express";
import {TodoController} from './modules/todos/todos.controller';
import config from './ormconfig';
import path from 'path';

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
        this.app.use(morgan('dev'));
        this.app.use(express.static(path.join(__dirname, '../public')));
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
        this.app.use(
            "/docs",
            swaggerUi.serve,
            swaggerUi.setup(undefined, {
            swaggerOptions: {
                url: "/swagger.json",
            },
            })
        );

        this.app.use('/api/todos/', this.todoController.router)

        this.app.use((err:Error, _req:Request, res:Response, _next:NextFunction) => {
            res.status(500).json({message: err.message});
        });
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