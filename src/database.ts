import { connect } from 'mongoose'

export async function startConnection() {
    //para realizar la conecion a la base de datos
    const db = await connect('mongodb://localhost/mean-gallery',{
        //para que no brinde error por consola
        useNewUrlParser: true,
        useFindAndModify: false
    });
    console.log('Database is connected');
}
