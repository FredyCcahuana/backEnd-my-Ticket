import { Router } from 'express'
const router = Router();

import upload from '../libs/multer'
import { getPhotos, createPhoto, deletePhoto, getPhoto, updatePhoto } from '../controllers/photo.controller'

// middleware
// router.use(upload.single('image'));

// routes
//para realizar la pruebas en las photos
router.route('/photos')
    //importacion de la photo 
    //obtiene todas las photos
    .get(getPhotos)
    //registra una photo y su descripción
    .post(upload.single('image'), createPhoto);


    //ruta para obtener una photo especipifa
router.route('/photos/:id')
    //obtener la descripcion de una sola photo
    .get(getPhoto)
    .delete(deletePhoto)
    .put(updatePhoto);

export default router;