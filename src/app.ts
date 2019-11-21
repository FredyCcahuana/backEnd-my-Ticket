import express, { Application} from 'express';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';

import indexRoutes from './routes/index'

// Initializations
const app: Application = express();

// Settings
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(morgan('dev'));
app.use(cors());
//se podra entender los datos que se reciben y se guardan
app.use(express.json());

// Routes
app.use('/api', indexRoutes);

// this folders for this application will be used to store public file images
//esta carpeta para realizar el guardado de las imagenes
//cuando entre a la direccion de /uploads se accede a las imagens
//path.resolve parte de la direccion anterior
app.use('/uploads', express.static(path.resolve('uploads')));

export default app;