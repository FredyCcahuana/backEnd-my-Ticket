import { Schema, model, Document } from 'mongoose'
//modelar la base de datos que estaremos gardando

//esquema que tendra la tabla imagen y sus respectivos datos en mongoose
const schema = new Schema({
    title: String,
    nombreEntrada: String,
    cantidad: String,
    precio: String,
    imageticketPath: String
   
});

//esquema que tendra la tabla imagen y sus respectivos datos en typescript
export interface ITicket extends Document {
    title: string,
    nombreEntrada: string,
    cantidad: string,
    precio: string,
    imageticketPath: string
}

//modelo de datos que tendra dentro de la propia base de datos
//nombre de la tabla
export default model<ITicket>('ticket', schema);