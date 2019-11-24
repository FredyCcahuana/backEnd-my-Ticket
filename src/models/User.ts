import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
//variables que se utilizaran dentro de backend
export interface IUser extends Document {
    nombre: string;
    apellido:string,
    email: string;
    password: string;
    encrypPassword(password: string): Promise<string>;
    validatePassword(password: string): Promise<boolean>;
};

const userSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        min: 4,
        lowercase: true
    },apellido: {
        type: String,
        required: true,
        min: 4,
        lowercase: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

userSchema.methods.encrypPassword = async (password: string): Promise<string> => {
    //gerarar un string para que el cifrado sea unico, algoritimo aplica 10 veces
    const salt = await bcrypt.genSalt(10);
    //encriptar la varible que le estamos ingresando
    return bcrypt.hash(password, salt);
};

//validar la contraseña
userSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
    //compara lo encriptado y la contraseña real puesta por el usuario
    return await bcrypt.compare(password, this.password);
};

export default model<IUser>('User', userSchema);