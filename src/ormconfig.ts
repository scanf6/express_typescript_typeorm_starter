import {ConnectionOptions} from 'typeorm';

const config:ConnectionOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "system32",
    database: "todo",
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    name: "todo_connection",
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    cli: {
        migrationsDir: 'src/migrations',
    },
    synchronize: false,
};

export = config;