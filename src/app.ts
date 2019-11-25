import express, { Application} from 'express';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';

import indexRoutes from './routes/index'
import AuthRoutes from './routes/auth'

// Initializations
const app: Application = express();

// Settings
app.set('port', process.env.PORT || 5000);

// Middlewares
//procesa los datos antes que llegue a las rutas
app.use(morgan('dev'));
app.use(cors());
//se podra entender los datos que se reciben y se guardan
app.use(express.json());

// Routes
//iniciar session
app.use('/api/auth', AuthRoutes);

//crud envento
app.use('/api', indexRoutes);

// this folders for this application will be used to store public file images
//esta carpeta para realizar el guardado de las imagenes
//cuando entre a la direccion de /uploads se accede a las imagens
//path.resolve parte de la direccion anterior
app.use('/uploads/evento', express.static(path.resolve('uploads/evento')));
app.use('/uploads/ticket', express.static(path.resolve('uploads/ticket')));

export default app;