import { Router } from 'express';
const router = Router();

import uploadEvento from '../libs/multer-evento'
import { getEventos, createEvento, deleteEvento, getEvento, updateEvento } from '../controllers/evento.controller'

// middleware
// router.use(upload.single('image'));

// routes
//para realizar la pruebas en las photos
router.route('/eventos')
    //importacion de la photo 
    //obtiene todas las photos
    .get(getEventos)
    //registra una photo y su descripción
    .post(uploadEvento.single('image'), createEvento);


    //ruta para obtener una photo especipifa
router.route('/eventos/:id')
    //obtener la descripcion de una sola photo
    .get(getEvento)
    .delete(deleteEvento)
    .put(updateEvento);

export default router;