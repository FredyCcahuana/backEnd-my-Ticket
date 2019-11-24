import { Request, Response } from 'express'

import User, { IUser } from '../models/User'
import { signupValidation, signinValidation } from '../libs/joi'
import jwt from 'jsonwebtoken';


export const signup = async (req: Request, res: Response) => {
     //Validation
    const { error } = signupValidation(req.body);
    if (error) return res.status(400).json(error.message);
    // Email Validation
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) return res.status(400).json('Email already exists');
     //Saving a new User
    try {
        const newUser: IUser = new User({
            nombre: req.body.nombre,
            apellido:req.body.apellido,
            email: req.body.email,
            password: req.body.password
        });//realizar la accion de cifrado de la accion
        newUser.password = await newUser.encrypPassword(newUser.password);
        const savedUser = await newUser.save();
        //creando un token
       const token: string = jwt.sign({ _id: savedUser._id }, process.env['TOKEN_SECRET'] || '', {
        //token vence en 1 dia    
        expiresIn: 60 * 60 * 24
        });
         res.header('auth-token', token).json({token,savedUser});
        //res.header('auth-token', token).json(savedUser);
    } catch (e) {
        res.status(400).json(e);
    }
};

export const signin = async (req: Request, res: Response) => {
    const { error } = signinValidation(req.body);
    if (error) return res.status(400).json(error.message);
    //buscar el correo que me esta pasando
    const user = await User.findOne({ email: req.body.email });
    //si el usuario no tiene acceso no puede ingresar
    if (!user) return res.status(400).json('Email or Password is wrong');
    //comprobar la contraseña
    //pasar la contraseña que me esta pasando
    const correctPassword = await user.validatePassword(req.body.password);
    if (!correctPassword) return res.status(400).json('Invalid Password');

    // Create a Token cuando los datos son correctos
    const token: string = jwt.sign({ _id: user._id }, process.env['TOKEN_SECRET'] || '');
    res.header('auth-token', token).json({user,token});
    
    console.log(req.body);
    res.send("signin");
};
////enviar datos del usuario
export const profile = async (req: Request, res: Response) => {
    //obtiene el usuario y lo guardamos en user
    const user = await User.findById(req.userId, { password: 0 });
    if (!user) return res.status(404).json('No User found');
    res.json(user);
    console.log(req.header('auth-token'));
};