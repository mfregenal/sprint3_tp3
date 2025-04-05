import { body } from 'express-validator';
// import superHero from '../models/superHero.js';

// export const validacionEsquema = (req, res, next) => {
//   try {
//     // Crear una instancia temporal del modelo con los datos recibidos
//     const nuevoSuperheroe = new superHero(req.body);

//     // Validar los datos usando validateSync
//     const existeError = nuevoSuperheroe.validateSync();

//     // Si hay errores de validación, devuelve un error
//     if ( existeError ) {
//       return res.status(400).json({ 
//         mensaje: 'Error de validación', 
//         errores: validationError.errors // Detalles de los errores
//       });
//     }

//     next(); // Si todo está correcto, continúa con la solicitud
//   } catch (error) {
//       res.status(500).json({ 
//           mensaje: 'Error al procesar la validación',
//           error: error.message
//       });
//   }
// };

export const reglasValidacionRegistro = () => [
  body('nombreSuperHeroe').trim().not().isEmpty().withMessage('Nombre de Superheroe es obligatorio')
    .isLength({ min: 3 }).withMessage('Nombre de Superheroe debe ser mayor a 3 caracteres')
    .isLength({ max: 60 }).withMessage('Nombre de Superheroe debe ser menor a 60 caracteres'),

  body('nombreReal').trim().not().isEmpty().withMessage('Nombre real del Superheroe es obligatorio')
    .isLength({ min: 3 }).withMessage('Nombre real del Superheroe debe ser mayor a 3 caracteres')
    .isLength({ max: 60 }).withMessage('Nombre real del Superheroe debe ser menor a 60 caracteres'),
  
  body('edad').trim().not().isEmpty().withMessage('Edad del Superheroe es obligatoria')
    .isInt({ min: 0 }).withMessage('Edad invalida: No puede contener caracteres, ser un decimal o ser menor a cero'),
  
  body('poderes').not().isEmpty().isArray({ min: 1 }).withMessage('El Superheroe debe contener al menos un poder')
    .custom( (array) => { return array.every( (poder) => typeof poder === 'string' ); } ).withMessage('Todos items de poderes deben ser array'),
  
  body('poderes.*').trim().isLength({ min: 3 }).withMessage('Los poderes del Superheroe no debe contener menos de 3 caracteres')
    .isLength({ max: 60 }).withMessage('Los poderes del Superheroe no pueden contener mas de 60 caracteres'),
]