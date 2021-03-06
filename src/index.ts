//para la ecriptacion
import dotenv from 'dotenv';
//lee las varibles de entorno
dotenv.config();
import app from './app';
import { startConnection } from './database'

async function main() {
    //iniciar la base de datos
    startConnection();
    await app.listen(app.get('port'));
    console.log('Server on port', app.get('port'));
}

main();