import express from 'express';

import { obtenerSuperheroePorIdController, obtenerTodosLosSuperheroesController, buscarSuperheroesPorAtributoController, obtenerSuperheroesMayoresDe30Controller, agregarSuperheroeController, eliminarPorIdController, eliminarPorNombreController, mostrarFormularioController, editarSuperheroeController } from '../controllers/superheroesController.mjs';
import { reglasValidacionRegistro } from '../middlewares/validacionRegistro.mjs';
import { manejarErroresDeValidación } from '../middlewares/errorMiddleware.mjs'

const router = express.Router();

// TP3 - SPRINT3 //
router.get('/heroes', obtenerTodosLosSuperheroesController);
router.get('/heroes/formulario', mostrarFormularioController);
router.post('/heroes/agregar', reglasValidacionRegistro(), manejarErroresDeValidación, agregarSuperheroeController); // TP1/TP2 - SPRINT3 //
router.get('/heroes/formulario/:id', mostrarFormularioController);
router.get('/heroes/:id', obtenerSuperheroePorIdController);
router.put('/heroes/:id/editar', reglasValidacionRegistro(), manejarErroresDeValidación, editarSuperheroeController); // TP1/TP2 - SPRINT3 //
router.delete('/heroes/:id', eliminarPorIdController); // TP1/TP2 - SPRINT3 //


// OTROS ENDPOINT //
router.get('/heroes/mayores-30', obtenerSuperheroesMayoresDe30Controller);
router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);
// TP1-SPRINT3 //
router.delete('/heroes/atributo/:nombre', eliminarPorNombreController);


export default router;