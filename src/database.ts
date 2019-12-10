import mongoose,{ connect } from 'mongoose'

export async function startConnection() {
    //para realizar la conecion a la base de datos
    const db = await connect('mongodb://mongodb+srv://fredyccahuana:FCPfisi2020@cluster0-v5dvs.mongodb.net/test?retryWrites=true&w=majority',{
        //para que no brinde error por consola
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex:true
    }).then(db => console.log('Database is connectedxd'))
    .catch(err => console.log(err));;
    //npm run build && node dist/index.js
}
