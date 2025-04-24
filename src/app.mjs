import express from 'express';
import { connectDB } from './config/dbConfig.mjs';
import superHeroRoutes from './routes/superHeroRoutes.mjs';

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de motor de vista EJS
app.set('view engine', 'ejs');

// Definir la carpeta donde están las vistas
app.set('views', './views');

// Middleware para parsear JSON
app.use(express.json());

// Configuración para servir archivos estáticos desde la carpeta "public"
app.use(express.static('public'));

// Conexión a MongoDB
connectDB();

// Configuración de rutas
app.use('/api', superHeroRoutes);

// Manejo de errores para rutas no encontradas
app.use((req, res) => {
    res.status(404).send({ mensaje: "Ruta no encontrada" });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});