import { Request, Response } from 'express'

//para encontrar la carpeta donde esta la photo
import fs from 'fs-extra';
import path from 'path'

// Models
import Evento, { IEvento } from '../models/Evento';

//obtener photos get
//obtener todas las fotos almacenadas
export async function getEventos(req: Request, res: Response): Promise<Response> {
    const eventos = await Evento.find();
    return res.json(eventos);
};

//resgistrar photos post
export async function createEvento(req: Request, res: Response): Promise<Response> {
    const { title, description,adicional,categoria,fechaInicio,fechaFinal} = req.body;
    //nuevo documuento en mongoDB
    const newEvento = { title, description,adicional,categoria,fechaInicio,fechaFinal, imagePath: req.file.path};
    const evento = new Evento(newEvento);
    await evento.save();
    return res.json({
        message: 'Photo Saved Successfully',
        evento
    });
};
//obtiene la photo de una solo photo
export async function getEvento(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const evento = await Evento.findById(id);
    return res.json(evento);
}

export async function deleteEvento(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const evento = await Evento.findByIdAndRemove(id) as IEvento;
    if (evento) {
        await fs.unlink(path.resolve(evento.imagePath));
    }
    return res.json({ message: 'Photo Deleted' });
};

export async function updateEvento(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { title, description,adicional,categoria,fechaInicio,fechaFinal} = req.body;
    const updatedPhoto = await Evento.findByIdAndUpdate(id, {
        title,
        description,
        adicional,
        categoria,
        fechaInicio,
        fechaFinal
    });
    return res.json({
        message: 'Successfully updated',
        updatedPhoto
    });
}