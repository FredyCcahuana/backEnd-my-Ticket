import { Request, Response } from 'express'

//para encontrar la carpeta donde esta la photo
import fs from 'fs-extra';
import path from 'path';

// Models
import Ticket,{ITicket} from '../models/Ticket';

//obtener photos get
//obtener todas las fotos almacenadas
export async function getTickets(req: Request, res: Response): Promise<Response> {
    const tickets = await Ticket.find();
    return res.json(tickets);
};

//resgistrar photos post
export async function createTicket(req: Request, res: Response): Promise<Response> {
    const { title, nombreEntrada,cantidad,precio} = req.body;
    //nuevo documuento en mongoDB
    const newTicket = { title, nombreEntrada,cantidad,precio,imageticketPath: req.file.path};
    const ticket = new Ticket(newTicket);
    await ticket.save();
    return res.json({
        message: 'Ticket Saved Successfully',
        ticket
        
    });
};
// obtiene la photo de una solo photo
export async function getTicket(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const ticket = await Ticket.findById(id);
    return res.json(ticket);
}

export async function deleteTicket(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const ticket = await Ticket.findByIdAndRemove(id) as ITicket;
    if (ticket) {
        await fs.unlink(path.resolve(ticket.imageticketPath));
    }
    return res.json({ message: 'Photo Deleted' });
};

export async function updateTicket(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { title, nombreEntrada,cantidad,precio} = req.body;
    const updatedTikcet = await Ticket.findByIdAndUpdate(id, {
        title,
        nombreEntrada,
        cantidad,
        precio
    },{new:true});
    return res.json({
        message: 'Successfully updated',
        updatedTikcet
    });
}