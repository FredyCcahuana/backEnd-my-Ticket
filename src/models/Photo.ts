import { Schema, model, Document } from 'mongoose'
//modelar la base de datos que estaremos gardando

//esquema que tendra la tabla imagen y sus respectivos datos en mongoose
const schema = new Schema({
    title: String,
    description: String,
    imagePath: String
});

//esquema que tendra la tabla imagen y sus respectivos datos en typescript
export interface IPhoto extends Document {
    title: string;
    description: string;
    imagePath: string;
}

//modelo de datos que tendra dentro de la propia base de datos
export default model<IPhoto>('Photo', schema);