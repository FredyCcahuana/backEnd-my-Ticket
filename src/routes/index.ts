import { Router } from 'express';
const router = Router();

import uploadEvento from '../libs/multer-evento'
import uploadTicket from '../libs/multer-ticket'
import { getEventos, createEvento, deleteEvento, getEvento, updateEvento } from '../controllers/evento.controller'
import { createTicket, getTickets, getTicket, deleteTicket, updateTicket } from '../controllers/ticket-controller';


// middleware
// router.use(upload.single('image'));

// routes
//para crud de evento
//para realizar la pruebas en las evento
router.route('/eventos')
    //importacion de la evento 
    //obtiene todas las evento
    .get(getEventos)
    //registra una photo y su descripción
    .post(uploadEvento.single('image'), createEvento);


    //ruta para obtener una photo especipifa
router.route('/eventos/:id')
    //obtener la descripcion de una sola photo
    .get(getEvento)
    .delete(deleteEvento)
    .put(updateEvento);

//para crud de ticket
//para realizar la pruebas en las ticket
router.route('/tickets')
    //importacion de la ticket 
    //obtiene todas las ticket
    .get(getTickets)
    //registra una ticket y su descripción
    .post(uploadTicket.single('imageticket'), createTicket);

//ruta para obtener una photo especipifa
router.route('/tickets/:id')
// obtener la descripcion de una sola photo
.get(getTicket)
.delete(deleteTicket)
.put(updateTicket);

export default router;