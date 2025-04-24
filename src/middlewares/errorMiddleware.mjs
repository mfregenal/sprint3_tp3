import { validationResult } from 'express-validator';

// Evalúa si las validaciones han pasado o fallado
export const manejarErroresDeValidación = (req, res, next) => {
    const errors = validationResult(req);
            
    if ( !errors.isEmpty() ){
        return res.status(400).send( errors.array() );
    }

    next();
}