import express, { Application } from 'express';
import cors from 'cors';

// en las importacioes por defecto podemos definir alias
import userRoutes from '../routes/usuario';
import db from '../db/dbConfig';
import './Usuario'; // ejecuta el codigo del modulo pero no importa ningun valor


class Server {

    private app: Application;    
    private port: string;
    private apiPaths: { usuarios: string } = {
        usuarios: '/api/usuarios'
    }

    constructor () {
        this.dbConection();
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.middlewares();
        // definir mis rutas
        this.routes();
    }

    async dbConection() {
        try {
            await db.authenticate(); // -> testea la conexion            
            await db.sync(); //-> crea todas las tablas de la base de datos, siempre y cuando ejecutes el modulo donde se encuentran
            // await Usuario.sync(); //-> crar tabla en la base de datos
            console.log('Connections has been establish successfully');

        } catch ( error: any ) {
            throw new Error( error );
        }
    }

    middlewares() {
        // cors
        this.app.use( cors({
            origin: '*'
        }) );

        // server static files
        this.app.use( express.static( 'public' ) );

        // body parser
        this.app.use( express.json() );        
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Server on port', this.port);
        } );
    }

    routes(){
        this.app.use( this.apiPaths.usuarios, userRoutes );
    }

}

export default Server;