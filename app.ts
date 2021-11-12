import dotenv from 'dotenv';
import Server from './model/Server';

dotenv.config();

const server = new Server();
server.listen();
