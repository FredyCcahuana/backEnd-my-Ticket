import { Schema, model, Document } from 'mongoose'
//modelar la base de datos que estaremos gardando

//esquema que tendra la tabla imagen y sus respectivos datos en mongoose
const schema = new Schema({
    title: String,
    description: String,
    adicional: String,
    categoria: String,
    fechaInicio: String,
    fechaFinal:String,
    imagePath: String
   
});

//esquema que tendra la tabla imagen y sus respectivos datos en typescript
export interface IEvento extends Document {
    title: string,
    description: string,
    adicional: string,
    categoria: string,
    fechaInicio: string,
    fechaFinal:string,
    imagePath: string
}

//modelo de datos que tendra dentro de la propia base de datos
//nombre de la tabla
export default model<IEvento>('evento', schema);