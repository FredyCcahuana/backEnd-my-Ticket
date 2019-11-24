import mongoose,{ connect } from 'mongoose'

export async function startConnection() {
    //para realizar la conecion a la base de datos
    const db = await connect('mongodb://localhost/my-ticket',{
        //para que no brinde error por consola
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex:true
    }).then(db => console.log('Database is connectedxd'))
    .catch(err => console.log(err));;
    
}
